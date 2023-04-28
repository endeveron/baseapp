import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import { useError } from 'common/hooks/useError';
import { LocationState } from 'common/types';
import {
  AuthResData,
  SignupFormData,
  SignupForm,
  selectAuthToken,
  useAuth,
  useSignupMutation,
} from 'features/auth';

import './Auth.scss';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useAuth();
  const { handleApiError } = useError();
  const [sendRequest, { isLoading }] = useSignupMutation();
  const token = useAppSelector(selectAuthToken);

  const state = location.state as LocationState;
  const to = state?.to?.pathname || '/';

  const handleSubmit = async (authReqData: SignupFormData) => {
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
      <div className="auth__title">Sign Up</div>
      <div className="auth__subtitle">Create an account</div>
      <SignupForm isLoading={isLoading} onSubmitted={handleSubmit} />
      <Link className="auth__link" to="/login" state={state}>
        Already registered ?
      </Link>
    </div>
  );
};

export { Signup };
