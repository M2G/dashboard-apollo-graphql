import { z } from 'zod';

export const INPUT_NAME = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const INITIAL_VALUES = {
  [INPUT_NAME.EMAIL]: '',
  [INPUT_NAME.PASSWORD]: '',
};

export const ERROR_TEXT_REQUIRED = {
  ERROR_TEXT_REQUIRED_EMAIL: 'Email is required',
  ERROR_TEXT_REQUIRED_PASSWORD: 'Password is required',
};

export const LABEL_EMAIL = 'Email';
export const LABEL_PASSWORD = 'Password';

export const PLACEHOLDER_EMAIL = 'Email';
export const PLACEHOLDER_PASSWORD = 'Mot de passe';

export function formSchema(t) {
  return z.object({
    [INPUT_NAME.PASSWORD]: z
      .string({
        required_error: t('fieldError.passwordRequired'),
      })
      .min(6, {
        message: t('fieldError.passwordLength'),
      }),
    [INPUT_NAME.EMAIL]: z
      .string({
        required_error: t('fieldError.emailRequired'),
      })
      .email(t('fieldError.emailInvalid'))
      .min(1, { message: t('fieldError.emailRequired') }),
  });
}
