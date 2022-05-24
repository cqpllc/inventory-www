import { useCallback } from 'react';
import { useMap } from 'react-use';
import { Event } from '../@types/Event';

export type DispatcherCallback = (success: boolean, data: any) => any;

export function useDispatcher() {
  const [requests, { set, remove }] = useMap<Record<string, DispatcherCallback>>({});

  const isReply = useCallback((message: Event): message is Event & { id: string } => {
    try {
      const { id, event } = message;
      return Boolean(event === 'reply' && id);
    } catch (ex) {
      return false
    }
  }, []);

  const dispatchReply = useCallback((message: Event) => {
    if (isReply(message) && message.id in requests) {
      const { id, success, data } = message;
      requests[id](success, data);
      remove(id);
    }
  }, [requests, remove]);

  const addReplyListener = useCallback((id: string, onReply: DispatcherCallback) => {
    set(id, onReply);
  }, [requests, set]);

  return { dispatchReply, addReplyListener, isReply };
}
