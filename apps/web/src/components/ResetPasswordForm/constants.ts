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

export function formSchema(t) {
  return z
    .object({
      [INPUT_NAME.NEW_PASSWORD]: z
        .string({
          required_error: t('fieldError.newPasswordRequired'),
        })
        .min(8, {
          message: t('fieldError.passwordLength'),
        }),
      [INPUT_NAME.VERIFY_PASSWORD]: z
        .string({
          required_error: t('fieldError.verifyPasswordRequired'),
        })
        .min(8, {
          message: t('fieldError.passwordLength'),
        }),
    })
    .refine(
      (data) => {
        return (
          data[INPUT_NAME.NEW_PASSWORD] === data[INPUT_NAME.VERIFY_PASSWORD]
        );
      },
      {
        path: [INPUT_NAME.VERIFY_PASSWORD],
        message: t('fieldError.passwordMatch', 'Passwords does not match'),
      },
    );
}
