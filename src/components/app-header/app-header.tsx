import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectorUserData } from '@slices';

export const AppHeader: FC = () => {
  const userName = useSelector(selectorUserData)?.name || '';

  return (
    <>
      <AppHeaderUI userName={userName} />
    </>
  );
};
