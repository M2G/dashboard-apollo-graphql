import { z } from 'zod';

export const INPUT_NAME = {
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  EMAIL: 'email',
  ID: 'id',
  USERNAME: 'username',
  CREATED_AT: 'created_at',
  MODIFIED_AT: 'modified_at',
  PASSWORD: 'password',
  NEW_PASSWORD: 'new_password',
};

export const INITIAL_VALUES = {
  [INPUT_NAME.FIRST_NAME]: '',
  [INPUT_NAME.LAST_NAME]: '',
  [INPUT_NAME.EMAIL]: '',
  [INPUT_NAME.ID]: '',
  [INPUT_NAME.USERNAME]: '',
  [INPUT_NAME.CREATED_AT]: '',
  [INPUT_NAME.MODIFIED_AT]: '',
};

export const PLACEHOLDER_FIRST_NAME = 'First name';
export const PLACEHOLDER_LAST_NAME = 'Last name';
export const PLACEHOLDER_EMAIL = 'Email';

export const ERROR_TEXT_REQUIRED = {
  ERROR_TEXT_REQUIRED_FIRST_NAME: 'First name requis',
  ERROR_TEXT_REQUIRED_LAST_NAME: 'Last name requis',
  ERROR_TEXT_REQUIRED_EMAIL: 'Email requis',
};

export const LABEL_FIRST_NAME = 'First name';
export const LABEL_LAST_NAME = 'Last name';
export const LABEL_EMAIL = 'Email';

export const formSchema = z.object({
  [INPUT_NAME.EMAIL]: z
    .string()
    .email('Invalid email')
    .min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_EMAIL)
    .optional()
    .or(z.literal('')),
  [INPUT_NAME.FIRST_NAME]: z
    .string()
    .min(1, { message: 'Firstname is required' })
    .optional()
    .or(z.literal('')),
  [INPUT_NAME.LAST_NAME]: z
    .string()
    .min(1, { message: 'Lastname is required' })
    .optional()
    .or(z.literal('')),
});
