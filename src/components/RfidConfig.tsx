import { Box, Flex, Button, useColorMode, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRfid } from './RfidContext';
import { RfidModeControl } from './RfidModeControl';
import { RfidStatus } from './RfidStatus';

const RFID_LOCALSTORAGE_KEY = 'inventoryRfidWsUrl';

export function RfidConfig() {
  const storedUrl = typeof localStorage !== 'undefined' ?
    localStorage.getItem(RFID_LOCALSTORAGE_KEY) || ''
    : '';
  const [ urlValue, setUrlValue ] = useState(storedUrl);
  const { colorMode } = useColorMode();
  const { connecting, connected, setUrl } = useRfid();

  return (
      <Box
        backgroundColor={colorMode === 'dark' ? 'cyan.800' : 'cyan.300'}
        color={colorMode === 'dark' ? 'cyan.300' : 'cyan.800'}
        p={1}
        pl={4}
        pr={4}
      >
        <Flex justifyContent="space-between">
          <Box whiteSpace="nowrap">
            <Text
              fontFamily="monospace"
              fontSize="sm"
              display="inline-block"
              mr={2}
              position="relative"
              top="0.1em"
            >
              RFID Server:
            </Text>
            <Input
              type="text"
              size="xs"
              maxW="sm"
              defaultValue={storedUrl}
              disabled={connected}
              onChange={e => setUrlValue(e.target.value)}
              mr={2}
            />
            <Button
              onClick={() => {
                setUrl(connected ? null : urlValue);
                if (!connected) localStorage.setItem(RFID_LOCALSTORAGE_KEY, urlValue);
              }}
              size="xs"
              isLoading={connecting}
              color={colorMode === 'dark' ? 'cyan.300' : 'cyan.800'}
              mt={1}
            >
              {connected ? 'Disconnect' : 'Connect'}
            </Button>
          </Box>
          <Box>
            <Box display="inline-block" position="relative" top={1} mr={2}><RfidStatus /></Box>
            <Box display="inline-block"><RfidModeControl /></Box>
          </Box>
        </Flex>
      </Box>
  )
}

