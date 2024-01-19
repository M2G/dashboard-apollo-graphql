import { z } from 'zod';

export const INPUT_NAME = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const INITIAL_VALUES = {
  [INPUT_NAME.EMAIL]: '',
  [INPUT_NAME.PASSWORD]: '',
};

export const PLACEHOLDER_EMAIL = 'Email';
export const PLACEHOLDER_PASSWORD = 'Password';

export const ERROR_TEXT_REQUIRED = {
  ERROR_TEXT_REQUIRED_EMAIL: 'Email requis',
  ERROR_TEXT_REQUIRED_PASSWORD: 'Password requis',
};

export const LABEL_PASSWORD = 'Password';
export const LABEL_EMAIL = 'Email';

export const formSchema = z.object({
  [INPUT_NAME.EMAIL]: z
    .string()
    .email('Invalid email')
    .min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_EMAIL)
    .optional()
    .or(z.literal('')),
  [INPUT_NAME.PASSWORD]: z.string().min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_PASSWORD),
});
