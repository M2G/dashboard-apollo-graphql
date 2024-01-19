import type { z } from 'zod';
import type { SubmitHandler } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Field } from 'ui';

import {
  formSchema,
  INPUT_NAME,
  LABEL_EMAIL,
  LABEL_FIRST_NAME,
  LABEL_LAST_NAME,
} from './constants';

type FormSchemaType = z.infer<typeof formSchema>;

interface IForm {
  initialValues: Record<any, unknown>;
  onSubmit: SubmitHandler<FormSchemaType>;
}

function UserEditForm({ initialValues, onSubmit }: IForm) {
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
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="pt-[50px]">
      <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
        <Field
          className="_:mb-4"
          label={t('field.firstname')}
          name={INPUT_NAME.FIRST_NAME}
          type="text"
          {...{ errors, register }}
        />
        <Field
          className="_:mb-4"
          label={t('field.lastname')}
          name={INPUT_NAME.LAST_NAME}
          type="text"
          {...{ errors, register }}
        />
        <Field
          className="_:mb-4"
          label={t('field.email')}
          name={INPUT_NAME.EMAIL}
          type="email"
          {...{ errors, register }}
        />
        <Button
          className="_:bg-white _:font-normal _:text-black w-full"
          disabled={!isValid}
          type="submit"
          variant="primary">
          {t('form.save')}
        </Button>
      </form>
    </div>
  );
}

export default UserEditForm;
