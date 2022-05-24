import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { WebSocketProvider } from '../components/WebSocketContext';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </ChakraProvider>
  )
}

export default MyApp
