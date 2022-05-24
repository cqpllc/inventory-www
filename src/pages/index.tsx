import type { NextPage } from 'next';
import { useState } from 'react';
import {Box, Grid, List, ListItem} from '@chakra-ui/react';
import { useWebSocket, WebSocketContext } from '../components/WebSocketContext';
import { WssMode } from '../@types';
import { ModeControl } from '../components/ModeControl';
import { Stats } from '../components/Stats';
import { Page } from '../components/Page';

const Inventory: NextPage = () => {
  const { tags } = useWebSocket();

  return (
    <Page>
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr'}} gap={8}>
        <List>
          {tags.map(tag => <ListItem key={tag}>{tag}</ListItem>)}
        </List>
        <Box>
          <ModeControl mb={8} />
          <Stats />
        </Box>
      </Grid>
    </Page>
  )
}

export default Inventory;
