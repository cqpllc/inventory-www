import {Box, Grid, Text, Icon, Spinner, ChakraProps} from '@chakra-ui/react';
import { IoPause } from 'react-icons/io5'
import { useRfid } from './RfidContext';

export function RfidStatus(props: ChakraProps) {
  const { tags, mode, connecting, connected } = useRfid();

  return (
    <Box {...props}>
      <Box display="inline-block" mt="0.2em" ml={2}>
        {((connected && mode) || connecting) ? <Spinner size="sm" /> : <Icon as={IoPause} /> }{' '}
      </Box>
    </Box>
  );
}
