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

export function formSchema(
  t,
): z.ZodObject<Record<string, z.ZodType<any, any, any>>> {
  return z
    .object({
      [INPUT_NAME.OLD_PASSWORD]: z
        .string()
        .min(6, t('fieldError.passwordLength')),
      [INPUT_NAME.PASSWORD]: z.string().min(6, {
        message: t('fieldError.passwordLength'),
      }),
      [INPUT_NAME.CONFIRM_PASSWORD]: z.string().min(6, {
        message: t('fieldError.passwordLength'),
      }),
    })
    .refine(
      (data) => data[INPUT_NAME.PASSWORD] === data[INPUT_NAME.CONFIRM_PASSWORD],
      {
        message: t('fieldError.passwordMatch'),
        path: [INPUT_NAME.CONFIRM_PASSWORD],
      },
    );
}
