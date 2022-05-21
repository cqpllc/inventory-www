import type { NextPage } from 'next';
import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { chunkedFetch } from '../utils';
import {Box, Button, List, ListItem} from '@chakra-ui/react';

const Inventory: NextPage = () => {
  const [tags, setTags] = useState<string[]>([]);
  useEffectOnce(() => {
    chunkedFetch<string[]>(`${process.env.NEXT_PUBLIC_API_BASE}/inventory`, (e) => setTags(e));
  })

  return (
    <Box>
      <List>
        {tags.map(tag => <ListItem key={tag}>{tag}</ListItem>)}
      </List>
    </Box>
  )
}

export default Inventory;
