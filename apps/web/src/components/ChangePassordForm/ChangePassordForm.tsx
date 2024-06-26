import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Alert, Button, Field } from 'ui';
import type { z } from 'zod';

import ROUTER_PATH from '@/constants/RouterPath';

import { INPUT_NAME, formSchema } from './constants';

type FormSchemaType = z.infer<typeof formSchema>;

interface IForm {
  initialValues: { [x: string]: string | undefined };
  onSubmit: SubmitHandler<FormSchemaType>;
  error?: string;
  success?: boolean;
}

function ChangePassordForm({
  error,
  initialValues,
  onSubmit,
  success,
}: IForm): JSX.Element {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<FormSchemaType>({
    defaultValues: useMemo(
      () => ({
        ...initialValues,
      }),
      [initialValues],
    ),
    mode: 'onBlur',
    resolver: zodResolver(formSchema(t)),
  });

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      id="form-forgot-password">
      <form
        className="rounded-2xl bg-white p-[25px]"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <h1 className="text-3xl font-bold dark:text-black">
            {t('form.changePassword')}
          </h1>
          <span>{t('form.toContinue')}</span>
        </div>
        <Field
          className="_:mb-2"
          label={t('field.oldPassword')}
          name={INPUT_NAME.OLD_PASSWORD}
          type="password"
          {...{ control, errors, register }}
          required
        />
        <Field
          className="_:mb-2"
          label={t('field.password')}
          name={INPUT_NAME.PASSWORD}
          type="password"
          {...{ control, errors, register }}
          required
        />
        <Field
          className="_:mb-2"
          label={t('field.confirmPassword')}
          name={INPUT_NAME.CONFIRM_PASSWORD}
          type="password"
          {...{ control, errors, register }}
          required
        />
        <Button
          data-testid="submit"
          className="w-full"
          disabled={!isValid}
          type="submit"
          variant="primary">
          {t('form.changePassword')}
        </Button>
        {success && (
          <Alert className="w-full mt-2" type="info">
            <div className="whitespace-nowrap max-w-[170px]">
              {t(
                `successChangePassword.CHANGE_PASSWORD`,
                'Your password has been changed successfully',
              )}
            </div>
          </Alert>
        )}
        {error && (
          <Alert className="w-full mt-2" type="danger">
            <div className="whitespace-nowrap max-w-[170px]">
              {t(
                `errorsChangePassword.CHANGE_PASSWORD_MATCH_ERROR`,
                'Passwords does not match',
              )}
            </div>
          </Alert>
        )}
        <div className="c-action gab-1 mt-3 flex flex-nowrap justify-start">
          <span className="m-0 box-border text-sm font-normal leading-tight">
            {t('form.wantToSeeYour')}
          </span>
          <Link
            className="mx-1 box-border inline-flex cursor-pointer items-center text-sm font-normal leading-tight text-gray-950 no-underline hover:text-gray-600"
            to={ROUTER_PATH.PROFIL}>
            {t('form.profile')}
          </Link>
          <Link
            className="box-border inline-flex cursor-pointer items-center text-sm font-normal leading-tight text-gray-950 no-underline hover:text-gray-600"
            to={ROUTER_PATH.HOME}>
            {t('form.home')}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ChangePassordForm;
