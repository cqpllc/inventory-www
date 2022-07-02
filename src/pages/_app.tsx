import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { LoginProvider } from '../components/LoginContext';
import { RfidProvider } from '../components/RfidContext';
import { SearchQueryProvider } from '../components/SearchQueryContext';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LoginProvider>
        <SearchQueryProvider>
          <RfidProvider>
            <Component {...pageProps} />
          </RfidProvider>
        </SearchQueryProvider>
      </LoginProvider>
    </ChakraProvider>
  )
}

export default MyApp
