import { Box, ChakraProps, Flex, Spinner, Text } from '@chakra-ui/react';
import { useSearchQuery as useSearchQueryContext } from './SearchQueryContext';
import { useSearchQuery } from './Search.query';
import { Item } from './Item';
import { ItemList } from './ItemList';

export interface SearchProps extends ChakraProps {}

export function Search(props: SearchProps) {
  const { query } = useSearchQueryContext();
  const { data, loading } = useSearchQuery({
    variables: { where: query || {} },
    skip: !query,
  });

  return (
    <Box {...props}>
      <ItemList items={query ? data?.items : null} loading={loading} />
    </Box>
  );
}
