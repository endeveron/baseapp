import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import classNames from 'classnames';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { FormInputs } from 'common/types/form';

import './TextField.scss';
import { ReactElement } from 'react';

type TextFieldType = 'text' | 'textarea' | 'password';

type TextFieldProps = {
  errors: FieldErrors<FormInputs>;
  register: UseFormRegister<FormInputs>;

  name: string;
  className?: string;
  helperText?: string;
  inputLeftElement?: ReactElement;
  inputRightElement?: ReactElement;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: TextFieldType;
};

const TextField = ({
  errors,
  register,

  name,
  className,
  helperText,
  inputLeftElement,
  inputRightElement,
  label,
  placeholder,
  required,
  type,
}: TextFieldProps) => {
  const error = errors[name];
  const errorMessage = error?.message;
  const patternError = error?.type === 'pattern';

  return (
    <div className={classNames('text-field', className)}>
      <FormControl isInvalid={!!error || patternError} isRequired={required}>
        {label && <FormLabel fontSize="sm">{label}</FormLabel>}
        <InputGroup>
          {inputLeftElement}
          <Input
            id={name}
            type={type || 'text'}
            placeholder={placeholder}
            required={required}
            {...register(name)}
            size="lg"
          />
          {inputRightElement}
        </InputGroup>
        {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        {patternError && (
          <FormErrorMessage>Invalid input data</FormErrorMessage>
        )}
      </FormControl>
    </div>
  );
};

export { TextField };
