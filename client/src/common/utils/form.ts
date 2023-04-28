import { FieldErrors } from 'react-hook-form';

import { FormInputs } from 'common/types/form';

export const isFormControlInvalid = (
  fieldName: string,
  errors: FieldErrors<FormInputs>
): boolean => {
  const error = errors[fieldName];
  const patternError = error?.type === 'pattern';

  return !!error || patternError;
};
