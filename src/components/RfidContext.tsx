import { ReactNode, createContext, useCallback, useEffect, useState, useContext } from 'react';
import cuid from 'cuid';
import useWebSocketNative from 'react-use-websocket';
import { JsonObject } from 'react-use-websocket/dist/lib/types';
import { DispatcherCallback, useDispatcher } from '../utils/useDispatcher';
import { Event, CommandEvent, WssMode } from '../@types';

type CallFn = (event: CommandEvent, onReply?: DispatcherCallback) => any;

export const RfidContext = createContext<{
  call: CallFn,
  tags: string[],
  mode: WssMode | null,
  connecting: boolean,
  connected: boolean,
  setUrl: (url: Nullable<string>) => void,
}>({
  call: () => {},
  tags: [],
  mode: null,
  connecting: false,
  connected: false,
  setUrl: () => {},
});

export interface RfidProviderProps {
  children: ReactNode
}

export function RfidProvider({ children }: RfidProviderProps) {
  const [socketUrl, setSocketUrl] = useState<Nullable<string>>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [mode, setMode] = useState<WssMode | null>(null);
  const { getWebSocket, sendJsonMessage } = useWebSocketNative(socketUrl, {
    shouldReconnect: () => Boolean(socketUrl),
    share: false,
  }, Boolean(socketUrl));
  const ws = getWebSocket();

  useEffect(() => { if (!socketUrl && ws) ws.close(); }, [ws, socketUrl]);

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
    <RfidContext.Provider value={{
      call,
      tags,
      mode,
      connected: Boolean(socketUrl) && Boolean(ws?.OPEN),
      connecting: Boolean(socketUrl) && Boolean(ws?.CONNECTING),
      setUrl: setSocketUrl,
    }}>
      {children}
    </RfidContext.Provider>
  )
}

export const useRfid = () => useContext(RfidContext);
