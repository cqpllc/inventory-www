import {Box, Grid, Text, Icon, Spinner, ChakraProps} from '@chakra-ui/react';
import { IoPauseCircle } from 'react-icons/io5'
import { useWebSocket } from '../components/WebSocketContext';

export function Stats(props: ChakraProps) {
  const { tags, mode } = useWebSocket();

  return (
    <Grid textAlign="center" templateColumns="repeat(2, 1fr)" gap={8} {...props}>
      <Box>
        <Text fontSize="2xl">{tags.length}</Text>
        <Text>Discovered</Text>
      </Box>
      <Box>
        <Box maxH="md" fontSize="2xl">
          {mode ? <Spinner size="md" /> : <Icon as={IoPauseCircle} />}
        </Box>
        <Text>{mode ? 'Searching' : 'Paused'}</Text>
      </Box>
    </Grid>
  );
}
