import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import SingleItemCard from './SingleItemCard';
import UserItemCard from './UserItemCard';
import { SellButton } from './SellButton';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { getUserItemQuery, getUserItemQueryVariables } from './__generated__/getUserItemQuery';

export const userItemQuery = gql`
  query getUserItemQuery($id: ID!) {
    GetUser(input: { id: $id }) {
      inventory {
        id
        saberPart
        partName
        partDescription
        price
        inShop
        url
      }
    }
  }
`;

export type UserItemListProps = { userId: string };

export const UserItemList: FC<UserItemListProps> = ({ userId }) => {
  const { data } = useQuery<getUserItemQuery, getUserItemQueryVariables>(userItemQuery, { variables: { id: userId } });

  if (data?.GetUser === null) {
    return <div> something wong </div>;
  }

  return (
    <Grid container direction="column" spacing={1}>
      {data?.GetUser.inventory.map((item) => {
        return (
          <Grid item key={item?.id}>
            <UserItemCard item={item}>
              <SellButton itemId={item?.id} />
            </UserItemCard>
          </Grid>
        );
      })}
    </Grid>
  );
};
