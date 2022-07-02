import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { LoginProvider } from '../components/LoginContext';
import { RfidProvider } from '../components/RfidContext';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LoginProvider>
        <RfidProvider>
          <Component {...pageProps} />
        </RfidProvider>
      </LoginProvider>
    </ChakraProvider>
  )
}

export default MyApp
