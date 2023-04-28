import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { isFormControlInvalid } from 'common/utils/form';
import { yupValidation } from 'common/utils/validators';
import { Button, FormErrorMessage } from 'components';
import { AuthFormProps, LoginFormData } from 'features/auth';

import './AuthForm.scss';

const LoginForm = ({
  isLoading,
  onSubmitted,
}: AuthFormProps<LoginFormData>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupValidation.loginResolver,
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    onSubmitted(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="auth-form"
      autoComplete="off"
      noValidate
    >
      <div className="auth-form__fields-wrapper">
        {/* Email */}
        <FormControl
          className="auth-form__field"
          isInvalid={isFormControlInvalid('email', errors)}
          isRequired
        >
          <FormLabel fontSize="sm">Email</FormLabel>
          <Input {...register('email')} size="lg" />
          <FormErrorMessage fieldName="email" errors={errors} />
        </FormControl>

        {/* Password */}
        <FormControl
          className="auth-form__field"
          isInvalid={isFormControlInvalid('password', errors)}
          isRequired
        >
          <FormLabel fontSize="sm">Password</FormLabel>
          <InputGroup>
            <Input {...register('password')} size="lg" />
          </InputGroup>
          {/* {!isFormControlInvalid('password', errors) && (
            <FormHelperText>{PASSWORD_REQUIREMENTS_MESSAGE}</FormHelperText>
          )} */}
          <FormErrorMessage fieldName="password" errors={errors} />
        </FormControl>
      </div>

      <div className="auth-form__actions-wrapper">
        {/* Submit */}
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          type="submit"
          className="auth-form__button"
        >
          Log In
        </Button>
      </div>
    </form>
  );
};

export { LoginForm };
