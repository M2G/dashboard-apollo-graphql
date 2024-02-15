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

export const LABEL_EMAIL = 'Email';
export const LABEL_PASSWORD = 'Password';
export const LABEL_FIRST_NAME = 'First name';
export const LABEL_LAST_NAME = 'Last name';

export const PLACEHOLDER_EMAIL = 'Email';
export const PLACEHOLDER_PASSWORD = 'Password';
export const PLACEHOLDER_FIRST_NAME = 'First name';
export const PLACEHOLDER_LAST_NAME = 'Last name';

export function formSchema(t) {
  return z.object({
    [INPUT_NAME.FIRST_NAME]: z.string().min(1, t('fieldError.passwordLength')),
    [INPUT_NAME.LAST_NAME]: z.string().min(1, t('fieldError.passwordLength')),
    [INPUT_NAME.EMAIL]: z
      .string()
      .email(t('fieldError.emailInvalid'))
      .min(1, { message: t('fieldError.emailRequired') }),
  });
}
