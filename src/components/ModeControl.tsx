import { useState } from 'react';
import {Box, Grid, Button, List, ListItem, ChakraProps} from '@chakra-ui/react';
import { useWebSocket } from '../components/WebSocketContext';
import { WssMode } from '../@types';

export function ModeControl(props: ChakraProps) {
  const [loading, setLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<string | null>(null);
  const { call, mode } = useWebSocket();

  return (
    <Grid templateColumns={`repeat(${Object.entries(WssMode).length + 1}, 1fr)`} gap={8} {...props}>
      {[null, ...Object.values(WssMode)].map(m => (
        <Button
          onClick={() => {
            setLoading(true);
            setLoadingMode(m);
            call({ event: 'setMode', data: { mode: m as unknown as (WssMode | null) } }, () => setLoading(false));
          }}
          h={24}
          isLoading={loading && loadingMode === m}
          isDisabled={loading}
          colorScheme={mode === m ? 'cyan' : 'gray'}
        >
          {m === null ? 'None' : m.toString()[0].toUpperCase() + m.toString().slice(1)}
        </Button>
      ))}
    </Grid>
  )
}
