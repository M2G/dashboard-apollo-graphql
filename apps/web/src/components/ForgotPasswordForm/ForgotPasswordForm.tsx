import type { SubmitHandler } from 'react-hook-form';
import type { z } from 'zod';

import ROUTER_PATH from '@/constants/RouterPath';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, Field } from 'ui';

import { useMemo } from 'react';
import { formSchema, INPUT_NAME, LABEL_EMAIL } from './constants';

type FormSchemaType = z.infer<typeof formSchema>;

interface IForm {
  initialValues: Record<any, unknown>;
  onSubmit: SubmitHandler<FormSchemaType>;
}

function ForgotPasswordForm({ initialValues, onSubmit }: IForm) {
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
      id="form-forgot-password">
      <form className="rounded-2xl bg-white p-[25px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <h1 className="text-3xl font-bold dark:text-black">Forgot password</h1>
          <span>to continue</span>
        </div>
        <Field
          className="_:mb-2"
          label={LABEL_EMAIL}
          name={INPUT_NAME.EMAIL}
          type="email"
          {...{ errors, register }}
          required
        />
        <Button className="w-full" disabled={!isValid} type="submit" variant="primary">
          Submit
        </Button>
        <div className="c-action gab-1 mt-3 flex flex-nowrap justify-start">
          <span className="m-0 box-border text-sm font-normal leading-tight">
            {t('form.haveAnAccount')}
          </span>
          <Link
            className="mx-1 box-border inline-flex cursor-pointer items-center text-sm font-normal leading-tight text-gray-950 no-underline hover:text-gray-600"
            to={ROUTER_PATH.SIGNIN}>
            {t('form.signin')}
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

export default ForgotPasswordForm;
