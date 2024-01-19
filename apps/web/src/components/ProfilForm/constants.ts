import { z } from 'zod';

export const INPUT_NAME = {
  EMAIL: 'email',
  PASSWORD: 'password',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
};

export const INITIAL_VALUES = {
  [INPUT_NAME.EMAIL]: '',
  [INPUT_NAME.PASSWORD]: '',
  [INPUT_NAME.FIRST_NAME]: '',
  [INPUT_NAME.LAST_NAME]: '',
};

export const ERROR_TEXT_REQUIRED = {
  ERROR_TEXT_REQUIRED_PASSWORD: 'Password required',
  ERROR_TEXT_REQUIRED_EMAIL: 'Email required',
  ERROR_TEXT_REQUIRED_FIRST_NAME: 'First name required',
  ERROR_TEXT_REQUIRED_LAST_NAME: 'Name required',
};

export const LABEL_EMAIL = 'Email';
export const LABEL_PASSWORD = 'Password';
export const LABEL_FIRST_NAME = 'First name';
export const LABEL_LAST_NAME = 'Last name';

export const PLACEHOLDER_EMAIL = 'Email';
export const PLACEHOLDER_PASSWORD = 'Password';
export const PLACEHOLDER_FIRST_NAME = 'First name';
export const PLACEHOLDER_LAST_NAME = 'Last name';

export const formSchema = z.object({
  [INPUT_NAME.FIRST_NAME]: z.string().min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_FIRST_NAME),
  [INPUT_NAME.LAST_NAME]: z.string().min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_LAST_NAME),
  [INPUT_NAME.EMAIL]: z.string().min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_EMAIL),
});
