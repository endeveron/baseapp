import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'store';
import { selectAuthToken } from 'features/auth';

const NotFound = () => {
  const token = useAppSelector(selectAuthToken);

  return <Navigate to={`/${token ? '/' : 'login'}`} replace={true} />;
};

export { NotFound };
