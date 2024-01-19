import type { JSX } from 'react';

import ROUTER_PATH from '@/constants/RouterPath';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Field } from 'ui';

import { z } from 'zod';

import {
  formSchema,
  INPUT_NAME,
  LABEL_EMAIL,
  LABEL_FIRST_NAME,
  LABEL_LAST_NAME,
} from './constants';

interface IForm {
  initialValues: Record<any, unknown>;
  onSubmit: (value: any) => Record<any, any>;
}

type FormSchemaType = z.infer<typeof formSchema>;

function ProfilForm({ initialValues, onSubmit }: IForm): JSX.Element {
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

  console.log('isValid', isValid);

  return (
    <div
      className="flex h-[calc(100vh-140px)] flex-col items-center justify-center"
      id="form-profil">
      <form
        className="rounded-2xl bg-white p-[25px]"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <h1 className="text-3xl font-bold dark:text-black">
            {t('form.userProfile')}
          </h1>
        </div>
        <Field
          className="_:mb-2"
          label={LABEL_FIRST_NAME}
          name={INPUT_NAME.FIRST_NAME}
          type="text"
          {...{ errors, register }}
          required
        />
        <Field
          className="_:mb-2"
          label={LABEL_LAST_NAME}
          name={INPUT_NAME.LAST_NAME}
          type="text"
          {...{ errors, register }}
          required
        />
        <Field
          className="_:mb-2"
          label={LABEL_EMAIL}
          name={INPUT_NAME.EMAIL}
          type="email"
          {...{ errors, register }}
          required
        />
        <Button
          className="w-full"
          disabled={!isValid}
          type="submit"
          variant="primary">
          {t('form.save')}
        </Button>
        <div className="c-action gab-1 mt-3 flex flex-nowrap justify-start">
          <span className="m-0 box-border text-sm font-normal leading-tight">
            {t('form.haveAnAccount')}
          </span>
          <Link
            className="mx-1 box-border inline-flex cursor-pointer items-center text-sm font-normal leading-tight text-gray-950 no-underline hover:text-gray-600"
            to={ROUTER_PATH.CHANGE_PASSWORD}>
            {t('form.changePassword')}
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

export default ProfilForm;
