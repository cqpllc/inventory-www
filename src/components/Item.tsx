import { Box, Heading, Text, Image, ChakraProps } from '@chakra-ui/react';
import { ItemFragment } from './Item.query';

export interface ItemProps extends ChakraProps {
  item: ItemFragment
}

export function Item({ item, ...props }: ItemProps) {
  return (
    <Box {...props}>

    </Box>
  );
}
