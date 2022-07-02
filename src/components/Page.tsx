import Head from 'next/head';
import {Box, ChakraProps, Flex, Heading, Link, useColorMode} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { usePageBasicInfoQuery } from './Page.query';
import { useLogin } from './LoginContext';
import { RfidConfig } from './RfidConfig';
import { useToggle } from 'react-use';
import { useRfid } from './RfidContext';

interface PageProps extends ChakraProps {
  children: ReactNode
  title?: string
}

export function Page({ children, title, ...props }: PageProps) {
  const { logout } = useLogin();
  const { colorMode } = useColorMode();
  const { data } = usePageBasicInfoQuery();
  const { connected } = useRfid();
  const [ wsConfigOpen, toggleConfig ] = useToggle(false);


  return (
    <Box {...props}>
      <Head>
        <title>{title ? `${title} // ` : ''}Inventory</title>
      </Head>
      <Box
        backgroundColor={colorMode === 'dark' ? 'cyan.900' : 'cyan.200'}
        color={colorMode === 'dark' ? 'cyan.200' : 'cyan.900'}
        p={1}
        pl={4}
        pr={4}
      >
        <Flex justifyContent="space-between" w="100%">
          <Heading
            mt={1}
            mb={0}
            as="h1"
            fontSize="sm"
            fontFamily="monospace"
          >
            {data?.organization.name || ''} Inventory
          </Heading>
          <Box alignSelf="flex-end">
            <Link
              fontStyle="italic"
              fontSize="sm"
              onClick={() => !connected && toggleConfig()}
              fontFamily="monospace"
              mr={4}
            >
              {connected ? 'RFID Connected' : 'Connect RFID'}
            </Link>
            <Link
              fontStyle="italic"
              fontSize="sm"
              onClick={logout}
              fontFamily="monospace"
            >
              Logout
            </Link>
          </Box>
        </Flex>
      </Box>
      {(wsConfigOpen || connected) && <RfidConfig />}
      <Box p={4}>{children}</Box>
      <Box
        m={8}
        color="gray.500"
        fontFamily="monospace"
        fontSize="xs"
        textAlign="center"
      >
        &copy; Concept Quantophysics
      </Box>
    </Box>
  );
}
