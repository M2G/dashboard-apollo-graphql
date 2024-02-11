import { z } from 'zod';

export const INPUT_NAME = {
  OLD_PASSWORD: 'oldPassword',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
};

export const INITIAL_VALUES = {
  [INPUT_NAME.OLD_PASSWORD]: '',
  [INPUT_NAME.PASSWORD]: '',
  [INPUT_NAME.CONFIRM_PASSWORD]: '',
};

export const ERROR_TEXT_REQUIRED = {
  ERROR_TEXT_MATCH: 'Passwords does not match',
  ERROR_TEXT_REQUIRED_OLD_PASSWORD: 'Mot de passe requis',
  ERROR_TEXT_REQUIRED_PASSWORD: 'Mot de passe requis',
  ERROR_TEXT_REQUIRED_PASSWORD2: 'Mot de passe confirme requis',
  ERROR_TEXT_REQUIRED_PASSWORD_LENGTH:
    'Mot de passe doit etre au moins 6 caracteres',
  // Password must be at least 6 characters
};

export const LABEL_OLD_PASSWORD = 'Old Password';
export const LABEL_PASSWORD = 'Password';
export const LABEL_CONFIRM_PASSWORD = 'Password';

export const PLACEHOLDER_OLD_PASSWORD = 'Old Mot de passe';
export const PLACEHOLDER_PASSWORD = 'Mot de passe';
export const PLACEHOLDER_PASSWORD2 = 'Mot de passe confirme';

export const formSchema = z.object({
  [INPUT_NAME.OLD_PASSWORD]: z
    .string()
    .min(6, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_OLD_PASSWORD),
  [INPUT_NAME.PASSWORD]: z
    .string()
    .min(6, {
      message: ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_PASSWORD_LENGTH,
    })
    .refine(
      (data) => data[INPUT_NAME.PASSWORD] === data[INPUT_NAME.CONFIRM_PASSWORD],
      {
        message: ERROR_TEXT_REQUIRED.ERROR_TEXT_MATCH,
        path: [INPUT_NAME.PASSWORD],
      },
    ),
  [INPUT_NAME.CONFIRM_PASSWORD]: z
    .string()
    .min(6, {
      message: ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_PASSWORD_LENGTH,
    }),
});
