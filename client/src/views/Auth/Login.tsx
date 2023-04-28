import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import { useError } from 'common/hooks/useError';
import { LocationState } from 'common/types';
import {
  AuthResData,
  LoginFormData,
  LoginForm,
  selectAuthToken,
  useAuth,
  useLoginMutation,
} from 'features/auth';

import './Auth.scss';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useAuth();
  const { handleApiError } = useError();
  const [sendRequest, { isLoading }] = useLoginMutation();
  const token = useAppSelector(selectAuthToken);

  const state = location.state as LocationState;
  const to = state?.to?.pathname || '/';

  const handleSubmit = async (authReqData: LoginFormData) => {
    try {
      const data: AuthResData = await sendRequest(authReqData).unwrap();
      login(data, to);
    } catch (err: any) {
      handleApiError(err);
    }
  };

  useEffect(() => {
    if (token) navigate('/', { replace: true });
  }, [token, navigate]);

  return (
    <div className="auth ">
      <div className="auth__title">Log In</div>
      <div className="auth__subtitle">Nice to meet you</div>
      <LoginForm isLoading={isLoading} onSubmitted={handleSubmit} />
      <Link className="auth__link" to="/signup" state={state}>
        Don't have an account ?
      </Link>
    </div>
  );
};

export { Login };
