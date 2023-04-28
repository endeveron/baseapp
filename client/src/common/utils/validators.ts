import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const PASSWORD_REQUIREMENTS_MESSAGE =
  'At least 6 haracters, one uppercase, one digit';

const baseAuth = {
  email: yup
    .string()
    .email()
    .required('Email is required')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email'
    ),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
      PASSWORD_REQUIREMENTS_MESSAGE
    ),
};

const loginSchema = yup.object().shape(baseAuth);

const signupSchema = yup.object().shape({
  ...baseAuth,
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Too short')
    .max(20, 'Too long')
    .matches(/^[a-z ,.'-]+$/i, '2-20 symbols, only latin letters'),
});

export const yupValidation = {
  loginResolver: yupResolver(loginSchema),
  signupResolver: yupResolver(signupSchema),
};
