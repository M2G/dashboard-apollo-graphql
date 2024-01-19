import { z } from 'zod';

export const INPUT_NAME = {
  OLD_PASSWORD: 'old_password',
  PASSWORD: 'password',
  PASSWORD2: 'password_again',
};

export const INITIAL_VALUES = {
  [INPUT_NAME.OLD_PASSWORD]: '',
  [INPUT_NAME.PASSWORD]: '',
  [INPUT_NAME.PASSWORD2]: '',
};

export const ERROR_TEXT_REQUIRED = {
  ERROR_TEXT_REQUIRED_MATCH: 'Mot de passe 1 doit être égal au Mot de passe 2',
  ERROR_TEXT_REQUIRED_OLD_PASSWORD: 'Mot de passe requis',
  ERROR_TEXT_REQUIRED_PASSWORD: 'Mot de passe requis',
  ERROR_TEXT_REQUIRED_PASSWORD2: 'Mot de passe 2 requis',
};

export const LABEL_OLD_PASSWORD = 'Old Password';
export const LABEL_PASSWORD = 'Password';
export const LABEL_PASSWORD2 = 'Password';

export const PLACEHOLDER_OLD_PASSWORD = 'Old Mot de passe';
export const PLACEHOLDER_PASSWORD = 'Mot de passe';
export const PLACEHOLDER_PASSWORD2 = 'Mot de passe 2';

export const formSchema = z.object({
  [INPUT_NAME.OLD_PASSWORD]: z
    .string()
    .min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_OLD_PASSWORD),
  [INPUT_NAME.PASSWORD]: z
    .string()
    .min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_PASSWORD)
    .refine((data) => data[INPUT_NAME.PASSWORD] === data[INPUT_NAME.PASSWORD2], {
      message: ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_MATCH,
      path: [INPUT_NAME.PASSWORD],
    }),
  [INPUT_NAME.PASSWORD2]: z.string().min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_PASSWORD2),
  // .min(8, 'Password must have more than 8 characters'),
});
