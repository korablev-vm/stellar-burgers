import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useAppSelector } from '@app-store';
import { getOrders } from '@slices';

export const Feed: FC = () => {
  const orders: TOrder[] = useAppSelector(getOrders);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
