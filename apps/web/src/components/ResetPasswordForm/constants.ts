import { z } from 'zod';

export const INPUT_NAME = {
  NEW_PASSWORD: 'new_password',
  VERIFY_PASSWORD: 'verify_password',
};

export const INITIAL_VALUES = {
  [INPUT_NAME.NEW_PASSWORD]: '',
  [INPUT_NAME.VERIFY_PASSWORD]: '',
};

export const ERROR_TEXT_REQUIRED = {
  ERROR_TEXT_REQUIRED_NEW_PASSWORD: 'New password requis',
  ERROR_TEXT_REQUIRED_VERIFY_PASSWORD: 'Verify password requis',
  ERROR_TEXT_REQUIRED_NOT_EQUAL: 'password are not equal',
};

export const LABEL_NEW_PASSWORD = 'New password';
export const LABEL_VERIFY_PASSWORD = 'Verify password';

export const PLACEHOLDER_NEW_PASSWORD = 'New password';
export const PLACEHOLDER_VERIFY_PASSWORD = 'Verify password';

export const formSchema = z.object({
  [INPUT_NAME.NEW_PASSWORD]: z
    .string()
    .min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_VERIFY_PASSWORD),
  [INPUT_NAME.VERIFY_PASSWORD]: z
    .string()
    .min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_VERIFY_PASSWORD)
    .refine((data) => data[INPUT_NAME.NEW_PASSWORD] === data[INPUT_NAME.VERIFY_PASSWORD], {
      path: [INPUT_NAME.VERIFY_PASSWORD],
      message: "Password don't match",
    }),
  // .min(8, 'Password must have more than 8 characters'),
});
