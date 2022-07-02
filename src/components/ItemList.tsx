import { Box, ChakraProps, Flex, Spinner, Text } from '@chakra-ui/react';
import { Item } from './Item';
import { ItemFragment } from './Item.query';

export interface ItemListProps extends ChakraProps {
  items?: Nullable<ItemFragment[]>
  loading?: boolean
}

export function ItemList({ loading, items, ...props }: ItemListProps) {
  return (
    <Box {...props}>
      {loading ? <Box textAlign="center"><Spinner /></Box> : (
        (!items || items.length === 0) ? (
          <Text textAlign="center" fontWeight="bold" color="gray.500">
            No items found.
          </Text>
        ) : (
          <Flex gap={4}>
            {items?.map(item => <Item item={item} key={item.id} />)}
          </Flex>
        )
      )}
    </Box>
  )
}
