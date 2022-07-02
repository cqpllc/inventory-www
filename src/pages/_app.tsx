import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { LoginProvider } from '../components/LoginContext';
import { WebSocketProvider } from '../components/WebSocketContext';
import theme from '../theme';
import config from '../config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LoginProvider>
        <WebSocketProvider>
          <Component {...pageProps} />
        </WebSocketProvider>
      </LoginProvider>
    </ChakraProvider>
  )
}

export default MyApp
