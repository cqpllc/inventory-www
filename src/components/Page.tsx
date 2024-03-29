import Head from 'next/head';
import { Box, ChakraProps, Flex, Heading, Link, Icon, useColorMode } from '@chakra-ui/react';
import { IoBarcode, IoBarcodeOutline, IoLogOut, IoSearch } from 'react-icons/io5';
import { ReactNode, useState } from 'react';
import { usePageBasicInfoQuery } from './Page.query';
import { useLogin } from './LoginContext';
import { RfidConfig } from './RfidConfig';
import { SearchConfig } from './SearchConfig';
import { useRfid } from './RfidContext';

interface PageProps extends ChakraProps {
  children: ReactNode
  title?: string
}

enum ToolbarOption {
  Rfid,
  Search
}

export function Page({ children, title, ...props }: PageProps) {
  const { logout } = useLogin();
  const { colorMode } = useColorMode();
  const { data } = usePageBasicInfoQuery();
  const { connected } = useRfid();
  const [toolbar, setToolbar] = useState<Nullable<ToolbarOption>>(null);


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
              fontFamily="monospace"
              mr={6}
              borderBottomColor={colorMode === 'dark' ? 'cyan.200' : 'cyan.900'}
              _hover={{ borderBottomColor: colorMode === 'dark' ? 'cyan.800' : 'cyan.400', borderBottomWidth: 1 }}
              onClick={() => setToolbar(toolbar === ToolbarOption.Search ? null : ToolbarOption.Search)}
              borderBottomWidth={toolbar === ToolbarOption.Search ? 1 : undefined}
            >
              <Icon as={IoSearch} fontSize="lg" position="relative" top="0.2em" mr={1} />
              Search
            </Link>
            <Link
              fontStyle="italic"
              fontSize="sm"
              fontFamily="monospace"
              mr={6}
              borderBottomColor={colorMode === 'dark' ? 'cyan.200' : 'cyan.900'}
              _hover={{ borderBottomColor: colorMode === 'dark' ? 'cyan.800' : 'cyan.400', borderBottomWidth: 1 }}
              onClick={() => {
                if (connected) return;
                setToolbar(toolbar === ToolbarOption.Rfid ? null : ToolbarOption.Rfid);
              }}
              borderBottomWidth={connected || toolbar === ToolbarOption.Rfid ? 1 : undefined}
            >
              <Icon as={IoBarcodeOutline} fontSize="lg" position="relative" top="0.2em" mr={1} />
              RFID
            </Link>
            <Link
              fontStyle="italic"
              fontSize="sm"
              fontFamily="monospace"
              borderBottomColor={colorMode === 'dark' ? 'cyan.200' : 'cyan.900'}
              _hover={{ borderBottomColor: colorMode === 'dark' ? 'cyan.800' : 'cyan.400', borderBottomWidth: 1 }}
              onClick={logout}
            >
              <Icon as={IoLogOut} fontSize="lg" position="relative" top="0.2em" mr={1} />
              Logout
            </Link>
          </Box>
        </Flex>
      </Box>
      {(toolbar === ToolbarOption.Rfid || connected) && <RfidConfig />}
      {(toolbar === ToolbarOption.Search && !connected) && <SearchConfig />}
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
