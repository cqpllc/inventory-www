import type { NextPage } from 'next';
import {Box, Grid, List, ListItem} from '@chakra-ui/react';
import { useRfid } from '../components/RfidContext';
import { Page } from '../components/Page';

const Inventory: NextPage = () => {
  const { tags } = useRfid();

  return (
    <Page>
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr'}} gap={8}>
        <List>
          {tags.map(tag => <ListItem key={tag}>{tag}</ListItem>)}
        </List>
      </Grid>
    </Page>
  )
}

export default Inventory;
