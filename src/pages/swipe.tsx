import type { NextPage } from 'next';
import { useState } from 'react';
import fetch from 'cross-fetch';
import {Box, Button, List, ListItem} from '@chakra-ui/react';

async function fetchSwipe(): Promise<string[]> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/swipe`);
  return await result.json();
}

const Swipe: NextPage = () => {
  const [isReading, setIsReading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  return (
    <Box>
      <Button
        onClick={async () => {
          setIsReading(true);
          setTags(await fetchSwipe());
          setIsReading(false);
        }}
        isLoading={isReading}
      >
        Wait for Swipe
      </Button>
      <List>
        {tags.map(tag => <ListItem key={tag}>{tag}</ListItem>)}
      </List>
    </Box>
  )
}

export default Swipe;
