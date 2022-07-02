import { useState } from 'react';
import {Box, Grid, Button, List, ListItem, ChakraProps} from '@chakra-ui/react';
import { useRfid } from './RfidContext';
import { WssMode } from '../@types';

export function RfidModeControl(props: ChakraProps) {
  const [loading, setLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<string | null>(null);
  const { call, mode, connected } = useRfid();

  return (
    <Grid templateColumns={`repeat(${Object.entries(WssMode).length + 1}, 1fr)`} gap={2} {...props}>
      {[null, ...Object.values(WssMode)].map(m => (
        <Button
          key={m || 'pause'}
          onClick={() => {
            setLoading(true);
            setLoadingMode(m);
            call({ event: 'setMode', data: { mode: m as unknown as (WssMode | null) } }, () => setLoading(false));
          }}
          size="xs"
          isLoading={loading && loadingMode === m}
          isDisabled={loading || !connected}
          colorScheme={mode === m ? 'cyan' : 'gray'}
        >
          {m === null ? 'Pause' : m.toString()[0].toUpperCase() + m.toString().slice(1)}
        </Button>
      ))}
    </Grid>
  )
}
