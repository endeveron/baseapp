import { FieldErrors } from 'react-hook-form';

import { FormInputs } from 'common/types/form';

import { FormErrorMessage as ChakraErrorMessage } from '@chakra-ui/react';

interface FormErrorMessageProps {
  fieldName: string;
  errors: FieldErrors<FormInputs>;
}

const FormErrorMessage = ({ fieldName, errors }: FormErrorMessageProps) => {
  const error = errors[fieldName];
  const errorMessage = error?.message;
  const patternError = error?.type === 'pattern';

  return (
    <div className="error-message-group">
      {errorMessage && <ChakraErrorMessage>{errorMessage}</ChakraErrorMessage>}
      {patternError && (
        <ChakraErrorMessage>Invalid input data</ChakraErrorMessage>
      )}
    </div>
  );
};

export { FormErrorMessage };
