import type { NextPage } from 'next';
import {Box, Grid, List, ListItem} from '@chakra-ui/react';
import { useRfid } from '../components/RfidContext';
import { Page } from '../components/Page';
import { Search } from '../components/Search';

const Inventory: NextPage = () => {
  const { connected } = useRfid();

  return (
    <Page>
      {connected ? <></> : <Search />}
    </Page>
  )
}

export default Inventory;
