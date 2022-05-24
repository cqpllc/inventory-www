import { WssMode } from './WssMode';

export type CommandEvent =
  { event: 'setMode', data: { mode: WssMode | null, args?: any } }
  | { event: 'getMode' };
