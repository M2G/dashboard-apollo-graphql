import { Link } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { Formik, Field, Form } from 'formik';

import ROUTER_PATH from 'constants/RouterPath';
import {
  ERROR_TEXT_REQUIRED,
  INPUT_NAME,
  LABEL_OLD_PASSWORD,
  LABEL_PASSWORD,
  LABEL_PASSWORD2,
  PLACEHOLDER_OLD_PASSWORD,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PASSWORD2,
} from './constants';

const {
  ERROR_TEXT_REQUIRED_OLD_PASSWORD,
  ERROR_TEXT_REQUIRED_PASSWORD,
  ERROR_TEXT_REQUIRED_PASSWORD2,
  ERROR_TEXT_REQUIRED_MATCH,
} = ERROR_TEXT_REQUIRED;

interface IForm {
  initialValues: Record<any, unknown>;
  onSubmit: (value: any) => Record<any, any>;
}

function ChangePassordForm({ initialValues, onSubmit }: IForm) {
  const setField = (setFieldValue: any, setFieldName: any, value: any): any =>
    setFieldValue(setFieldName, value);

  const onChange = (setFieldValue: any, setFieldName: any): any =>
    ({ target: { value = '' } }: any) =>
      setField(setFieldValue, setFieldName, value);

  const onValidate = (values: object): {} => {
    const errors = {};

    if (!values[INPUT_NAME.OLD_PASSWORD]) {
      errors[INPUT_NAME.OLD_PASSWORD] = ERROR_TEXT_REQUIRED_OLD_PASSWORD;
    }

    if (!values[INPUT_NAME.PASSWORD]) {
      errors[INPUT_NAME.PASSWORD] = ERROR_TEXT_REQUIRED_PASSWORD;
    }

    if (!values[INPUT_NAME.PASSWORD2]) {
      errors[INPUT_NAME.PASSWORD2] = ERROR_TEXT_REQUIRED_PASSWORD2;
    }

    if (
      values[INPUT_NAME.PASSWORD]
      && values[INPUT_NAME.PASSWORD2]
      && values[INPUT_NAME.PASSWORD] !== values[INPUT_NAME.PASSWORD2]
    ) {
      errors[INPUT_NAME.PASSWORD2] = ERROR_TEXT_REQUIRED_MATCH;
    }

    return errors;
  };

  const handleSubmit: ((
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => any) &
    ((values: any) => any) = (values: any) => onSubmit(values);

  const renderForm = ({
 setFieldValue, values, errors, touched,
}: any): any => (
    <div className="form-signin">
      <Form>
        <h1 className="h3 mb-3 fw-normal">Change password</h1>
        <div className="form-floating">
          <Field
            id="floatingOldPassword"
            className="form-control mb-2"
            name={INPUT_NAME.OLD_PASSWORD}
            type="password"
            onChange={onChange(setFieldValue, INPUT_NAME.OLD_PASSWORD)}
            placeholder={PLACEHOLDER_OLD_PASSWORD}
            value={values?.[INPUT_NAME.OLD_PASSWORD]}
            required
          />
          {touched[INPUT_NAME.OLD_PASSWORD]
          && errors
          && errors[INPUT_NAME.OLD_PASSWORD] ? (
            <span className="error-text">
              {errors[INPUT_NAME.OLD_PASSWORD]}
            </span>
          ) : null}
          <label htmlFor="floatingOldPassword">{LABEL_OLD_PASSWORD}</label>
        </div>
        <div className="form-floating">
          <Field
            id="floatingPassword"
            className="form-control mb-2"
            name={INPUT_NAME.PASSWORD}
            type="password"
            onChange={onChange(setFieldValue, INPUT_NAME.PASSWORD)}
            placeholder={PLACEHOLDER_PASSWORD}
            value={values?.[INPUT_NAME.PASSWORD]}
            required
          />
          {touched[INPUT_NAME.PASSWORD]
          && errors
          && errors[INPUT_NAME.PASSWORD] ? (
            <span className="error-text">{errors[INPUT_NAME.PASSWORD]}</span>
          ) : null}
          <label htmlFor="floatingPassword">{LABEL_PASSWORD}</label>
        </div>
        <div className="form-floating">
          <Field
            id="floatingPasswordAgain"
            name={INPUT_NAME.PASSWORD2}
            className="form-control mb-2"
            type="password"
            onChange={onChange(setFieldValue, INPUT_NAME.PASSWORD2)}
            placeholder={PLACEHOLDER_PASSWORD2}
            value={values?.[INPUT_NAME.PASSWORD2]}
            required
          />
          {touched[INPUT_NAME.PASSWORD2]
          && errors
          && errors[INPUT_NAME.PASSWORD2] ? (
            <span className="error-text mb-1">
              {errors[INPUT_NAME.PASSWORD2]}
            </span>
          ) : null}
          <label htmlFor="floatingPasswordAgain">{LABEL_PASSWORD2}</label>
        </div>
        <button className="fs-6 w-100 btn btn-lg btn-primary" type="submit">
          Change password
        </button>
      </Form>
      <Link to={ROUTER_PATH.PROFIL} className="mt-4 text-muted">
        Profil
      </Link>
    </div>
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={onValidate}
    >
      {renderForm}
    </Formik>
  );
}

export default ChangePassordForm;
