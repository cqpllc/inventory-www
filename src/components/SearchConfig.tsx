import { Box, Button, useColorMode, Input, Select, Text } from '@chakra-ui/react';
import { useSearchQuery } from './SearchQueryContext';
import { useSearchConfigOptionsQuery } from './SearchConfig.query';
import { Formik, Field } from "formik";
import { QueryMode } from '../.generated/graphql/schema';

export function SearchConfig() {
  const { colorMode } = useColorMode();
  const { query, setQuery } = useSearchQuery();
  const { data } = useSearchConfigOptionsQuery({ pollInterval: 60 });

  return (
      <Box
        backgroundColor={colorMode === 'dark' ? 'cyan.800' : 'cyan.300'}
        color={colorMode === 'dark' ? 'cyan.300' : 'cyan.800'}
        p={1}
        pl={4}
        pr={4}
      >
        <Formik
          initialValues={{
            term: (query?.OR?.[0]?.name?.contains || ''),
            category: query?.category?.is?.id?.equals || '',
          }}
          onSubmit={({ term, category }) => {
            if (!term && !category) return setQuery(null);
            setQuery({
              ...(term && {
                OR: [
                  { tags: { has: term } },
                  { name: { contains: term, mode: QueryMode.Insensitive } },
                ]
              }),
              ...(category && { category: { is: { id: { equals: category } } } })
            })
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Text
                fontFamily="monospace"
                fontSize="sm"
                display="inline-block"
                mr={2}
                position="relative"
                top="0.1em"
              >
                Search Term:
              </Text>
              <Field
                as={Input}
                display="inline-block"
                name="term"
                type="text"
                size="xs"
                maxW="sm"
                mr={2}
              />
              <Text
                fontFamily="monospace"
                fontSize="sm"
                display="inline-block"
                mr={2}
                position="relative"
                top="0.1em"
              >
                Category:
              </Text>
              <Field
                as={Select}
                display="inline-block"
                name="category"
                size="xs"
                maxW="sm"
                mr={4}
              >
                <option value=""></option>
                {data?.categories?.map(c => (
                  <option value={c.id}>{c.name}</option>
                ))}
              </Field>
              <Button
                size="xs"
                color={colorMode === 'dark' ? 'cyan.300' : 'cyan.800'}
                mt={1}
                type="submit"
              >
                Search
              </Button>
            </form>
          )}
        </Formik>
      </Box>
  )
}

