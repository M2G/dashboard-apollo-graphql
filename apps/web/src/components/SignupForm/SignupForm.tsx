import type { JSX } from 'react';

import type { z } from 'zod';

import ROUTER_PATH from '@/constants/RouterPath';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Alert, Button, Field } from 'ui';

import { INPUT_NAME, formSchema } from './constants';

type FormSchemaType = z.infer<typeof formSchema>;

interface IForm {
  initialValues: Record<any, unknown>;
  onSubmit: SubmitHandler<FormSchemaType>;
}

function SigninForm({ error, initialValues, onSubmit }: IForm): JSX.Element {
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
      id="form-signin">
      <form
        className="rounded-2xl bg-white p-[25px]"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <h1 className="text-3xl font-bold dark:text-black">
            {t('form.createAccount')}
          </h1>
          <span>{t('form.toContinue')}</span>
        </div>
        <Field
          className="_:mb-2"
          label={t('field.email')}
          name={INPUT_NAME.EMAIL}
          {...{ control, errors, register }}
          required
          type="email"
        />
        <Field
          className="_:mb-2"
          label={t('field.password')}
          name={INPUT_NAME.PASSWORD}
          {...{ control, errors, register }}
          required
          type="password"
        />
        <Button
          className="w-full"
          data-testid="submit"
          disabled={!isValid}
          type="submit"
          variant="primary">
          {t('form.signup')}
        </Button>
        {error && (
          <Alert className="w-full mt-2" type="danger">
            <div className="whitespace-nowrap max-w-[170px]">
              {t(`errorsRegister.${error}`)}
            </div>
          </Alert>
        )}
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
            className="box-border inline-flex cursor-pointer items-center text-sm font-normal leading-tight text-gray-950 no-underline hover:text-gray-600"
            to={ROUTER_PATH.FORGOT_PASSWORD}>
            {t('form.forgotPassword')}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;
