import { ReactNode, createContext, useMemo, useEffect, useState, useContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { DateTime } from 'luxon';
import { withScalars } from 'apollo-link-scalars';
import { useToast, Flex, Spinner } from '@chakra-ui/react';
import introspectionResult from "../.generated/graphql/schema.json";
import { buildClientSchema, GraphQLScalarType, Kind } from "graphql";
import {
  LoginQuery,
  LoginDocument,
  LoginOrganizationsQuery,
  LoginOrganizationsDocument,
} from './LoginMutation.query';
import { LoginPage } from './LoginPage';
import config from '../config';
import { simpleGqlFetch, storeToken, retrieveToken } from '../utils';

const schema = buildClientSchema(introspectionResult as any);
const typesMap = {
  DateTime: new GraphQLScalarType({
    name: "Date",
    serialize: (parsed) => parsed && (parsed as DateTime).toISO(),
    parseValue: (raw) => raw && DateTime.fromISO(raw as string),
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) return DateTime.fromISO(ast.value);
      else if (ast.kind === Kind.INT) return DateTime.fromSeconds(ast.value as unknown as number);
      return null;
    },
  }),
}

export const LoginContext = createContext<{
  token: string | null
  logout: () => void
}>({
  token: null,
  logout: () => {}
});

export interface LoginProviderProps {
  children: ReactNode
}

export function LoginProvider({ children }: LoginProviderProps) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginResult, setLoginResult] = useState<Nullable<LoginQuery>>(null);
  const toast = useToast();
  const { token, expires } = (loginResult?.login || {});

  // Check if the login is saved once the client has loaded
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPageLoaded(true);
      if (retrieveToken()) setLoginResult({ login: retrieveToken()! });
    }
  }, [typeof window]);

  // Save to localStorage
  useEffect(() => { if (loginResult?.login) { storeToken(loginResult.login) } }, [loginResult]);

  // Delete token when it expires
  useEffect(() => {
    if (!expires) return;
    const timeout = setTimeout(
      () => setLoginResult(null),
      DateTime.fromISO(expires as unknown as string).diffNow('seconds').seconds, // This isn't going through apollo so
                                                                                 // scalar type is wrong.
    );
    return () => clearTimeout(timeout);
  }, [expires]);

  // Memo the apollo client
  const client = useMemo(() => {
    const link = ApolloLink.from([
      withScalars({ schema, typesMap }),
      setContext((_, { headers }) => ({
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : null,
        },
      })),
      createHttpLink({ uri: config.app.graphql }),
    ]);

    return new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
    });
  }, [token]);

  if (!isPageLoaded) {
    return (
      <Flex
        align="center"
        justify="center"
        h="100vh"
      >
        <Spinner />
      </Flex>
    );
  }

  if (!token) return (
    <LoginPage
      isLoading={isLoading}
      onSubmit={async ({ email, password }) => {
        setIsLoading(true);
        const { errors, data } = await simpleGqlFetch<LoginQuery>(LoginDocument, { email, password });
        if (errors && errors.length > 0) {
          toast({ title: 'Login Error', description: errors[0].message, status: 'error' });
        } else {
          setLoginResult(data);
        }
        setIsLoading(false);
      }}
    />
  );

  return (
    <LoginContext.Provider
      value={{
        token: token || null,
        logout: () => {
          storeToken(null);
          setLoginResult(null);
        }
      }}
    >
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext);

