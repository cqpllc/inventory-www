import { ReactNode, createContext, useCallback, useEffect, useState, useContext } from 'react';
import cuid from 'cuid';
import useWebSocketNative from 'react-use-websocket';
import { JsonObject } from 'react-use-websocket/dist/lib/types';
import { DispatcherCallback, useDispatcher } from '../utils/useDispatcher';
import { Event, CommandEvent, WssMode } from '../@types';

type CallFn = (event: CommandEvent, onReply?: DispatcherCallback) => any;

export const WebSocketContext = createContext<{
  call: CallFn,
  tags: string[],
  mode: WssMode | null,
}>({
  call: () => {},
  tags: [],
  mode: null,
});

export interface WebSocketProviderProps {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [mode, setMode] = useState<WssMode | null>(null);
  const { getWebSocket, sendJsonMessage } = useWebSocketNative(process.env.NEXT_PUBLIC_API_WS!, {
    shouldReconnect: () => true,
    share: false,
  });
  const ws = getWebSocket();

  const { addReplyListener, dispatchReply, isReply } = useDispatcher();

  const onMessage = useCallback((event: any) => {
    const message = JSON.parse(event.data as string) as Event;
    if (isReply(message)) return dispatchReply(message);
    else if (message.event === 'tags') setTags(message.data.tags as string[]);
    else if (message.event === 'modeChange') setMode(message.data.mode);
  }, [isReply, dispatchReply]);

  useEffect(() => {
    ws?.addEventListener('message', onMessage)
    return () => ws?.removeEventListener('message', onMessage);
  }, [ws, onMessage]);

  const call = useCallback((event: CommandEvent, onReply?: DispatcherCallback) => {
    const id = cuid();
    (event as CommandEvent & { id: string }).id = id;
    if (onReply) addReplyListener(id, onReply);
    sendJsonMessage(event as unknown as JsonObject);
  }, [ws, addReplyListener]);

  useEffect(() => {
    call({ event: 'getMode' }, (success, data) => setMode(data.mode));
  }, [ws]);

  return (
    <WebSocketContext.Provider value={{
      call,
      tags,
      mode,
    }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => useContext(WebSocketContext);
