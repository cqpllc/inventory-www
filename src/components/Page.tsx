import Head from 'next/head';
import {Box, Text, ChakraProps} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useWebSocket } from '../components/WebSocketContext';

interface PageProps extends ChakraProps {
  children: ReactNode
  title?: string
}

export function Page({ children, title, ...props }: PageProps) {
  const { tags } = useWebSocket();

  return (
    <Box p={4} {...props}>
      <Head>
        <title>{title ? `${title} // ` : ''}Inventory{tags?.length > 0 ? ` (${tags.length})` : ''}</title>
      </Head>
      {children}
    </Box>
  );
}
