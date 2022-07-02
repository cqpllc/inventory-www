import { ReactNode, createContext, useState, useContext } from 'react';
import { ItemWhereInput } from '../.generated/graphql/schema';

export const SearchQueryContext = createContext<{
  query: Nullable<ItemWhereInput>
  setQuery: (query: Nullable<ItemWhereInput>) => void
}>({
  query: null,
  setQuery: () => {}
});

export interface SearchQueryProviderProps {
  children: ReactNode
}

export function SearchQueryProvider({ children }: SearchQueryProviderProps) {
  const [query, setQuery] = useState<Nullable<ItemWhereInput>>(null);

  return (
    <SearchQueryContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  )
}

export const useSearchQuery = () => useContext(SearchQueryContext);

