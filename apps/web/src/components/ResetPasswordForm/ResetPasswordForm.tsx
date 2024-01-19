import type { SubmitHandler } from 'react-hook-form';
import type { z } from 'zod';

import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Field } from 'ui';
import { formSchema, INPUT_NAME, LABEL_NEW_PASSWORD, LABEL_VERIFY_PASSWORD } from './constants';
import { Link } from 'react-router-dom';
import ROUTER_PATH from '@/constants/RouterPath';
import { useMemo } from 'react';

type FormSchemaType = z.infer<typeof formSchema>;

interface IForm {
  initialValues: Record<any, unknown>;
  onSubmit: SubmitHandler<FormSchemaType>;
}

function ResetPasswordForm({ initialValues, onSubmit }: IForm) {
  const { t } = useTranslation();
  const {
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
    resolver: zodResolver(formSchema),
  });

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      id="form-reset-password">
      <form className="rounded-2xl bg-white p-[25px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <h1 className="text-3xl font-bold dark:text-black">{t('form.resetPassword')}</h1>
          <span>{t('form.toContinue')}</span>
        </div>
        <Field
          className="_:mb-2"
          label={t('field.newPassword')}
          name={INPUT_NAME.NEW_PASSWORD}
          type="email"
          {...{ errors, register }}
          required
        />
        <Field
          className="_:mb-2"
          label={t('field.verifyPassword')}
          name={INPUT_NAME.VERIFY_PASSWORD}
          type="email"
          {...{ errors, register }}
          required
        />
        <Button className="w-full" disabled={!isValid} type="submit" variant="primary">
          {t('form.submit')}
        </Button>
        <div className="c-action gab-1 mt-3 flex flex-nowrap justify-start">
          <span className="m-0 box-border text-sm font-normal leading-tight">
            {t('form.haveAnAccount')}
          </span>
          <Link
            className="mx-1 box-border inline-flex cursor-pointer items-center text-sm font-normal leading-tight text-gray-950 no-underline hover:text-gray-600"
            to={ROUTER_PATH.HOME}>
            {t('form.home')}
          </Link>
          <Link
            className="ml-0 box-border inline-flex cursor-pointer items-center text-sm font-normal leading-tight text-gray-950 no-underline hover:text-gray-600"
            to={ROUTER_PATH.SIGNUP}>
            {t('form.signup')}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
