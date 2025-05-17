import { useAppDispatch, useAppSelector } from '@app-store';
import { getUserOrders, userOrdersThunk, isload } from '@slices';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(getUserOrders);
  const isDataSucces: boolean = useAppSelector(isload);

  useEffect(() => {
    dispatch(userOrdersThunk());
  }, []);

  if (isDataSucces) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
