import { Box, Heading, Text, Image, Spinner, ChakraProps, useColorMode } from '@chakra-ui/react';
import { ItemFragment } from './Item.query';

export interface ItemProps extends ChakraProps {
  item: ItemFragment
}

export function Item({ item, ...props }: ItemProps) {
  return (
    <Box p={4} borderWidth={1} rounded="sm" w="sm" {...props}>
    <Heading as="h2" fontSize="lg" fontWeight="bold">{item.name}</Heading>
    <Text fontSize="xs" color="gray.500">{item.id}</Text>
    <Text>{item.description}</Text>
    </Box>
  );
}
