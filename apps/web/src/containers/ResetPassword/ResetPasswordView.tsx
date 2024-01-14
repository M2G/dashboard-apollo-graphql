import { Formik, Field, Form } from 'formik';

import {
  ERROR_TEXT_REQUIRED,
  INPUT_NAME,
  LABEL_NEW_PASSWORD,
  LABEL_VERIFY_PASSWORD,
  PLACEHOLDER_NEW_PASSWORD,
  PLACEHOLDER_VERIFY_PASSWORD,
} from './constants';

const {
  ERROR_TEXT_REQUIRED_NEW_PASSWORD,
  ERROR_TEXT_REQUIRED_VERIFY_PASSWORD,
  ERROR_TEXT_REQUIRED_NOT_EQUAL,
} = ERROR_TEXT_REQUIRED;

function ResetPasswordView({ initialValues, onSubmit }: any) {
  const setField = (setFieldValue: any, setFieldName: any, value: any): any =>
    setFieldValue(setFieldName, value);

  const onChange =
    (setFieldValue: any, setFieldName: any): any =>
    ({ target: { value = '' } }: any) =>
      setField(setFieldValue, setFieldName, value);

  const onValidate = (values: object): {} => {
    const errors = {};

    if (!values[INPUT_NAME.NEW_PASSWORD]) {
      errors[INPUT_NAME.NEW_PASSWORD] = ERROR_TEXT_REQUIRED_NEW_PASSWORD;
    }

    if (!values[INPUT_NAME.VERIFY_PASSWORD]) {
      errors[INPUT_NAME.VERIFY_PASSWORD] = ERROR_TEXT_REQUIRED_VERIFY_PASSWORD;
    }

    if (
      values[INPUT_NAME.NEW_PASSWORD]
      && values[INPUT_NAME.VERIFY_PASSWORD]
      && values[INPUT_NAME.NEW_PASSWORD] !== values[INPUT_NAME.VERIFY_PASSWORD]
    ) {
      errors[INPUT_NAME.VERIFY_PASSWORD] = ERROR_TEXT_REQUIRED_NOT_EQUAL;
    }

    return errors;
  };

  const handleSubmit = (values: object) => onSubmit(values);

  const renderForm = ({ setFieldValue, values, errors, touched }: any): any => (
    <div className="form-signin">
      <Form>
        <div className="form-floating">
          <Field
            id="floatingInput"
            name={INPUT_NAME.NEW_PASSWORD}
            className="form-control mb-2"
            type="text"
            onChange={onChange(setFieldValue, INPUT_NAME.NEW_PASSWORD)}
            placeholder={PLACEHOLDER_NEW_PASSWORD}
            value={values?.[INPUT_NAME.NEW_PASSWORD]}
            required
          />
          {touched[INPUT_NAME.NEW_PASSWORD] && errors && errors[INPUT_NAME.NEW_PASSWORD] ? (
            <span className="error-text">{errors[INPUT_NAME.NEW_PASSWORD]}</span>
          ) : null}
          <label htmlFor="floatingInput">{LABEL_NEW_PASSWORD}</label>
        </div>
        <div className="form-floating">
          <Field
            id="floatingInput"
            name={INPUT_NAME.VERIFY_PASSWORD}
            className="form-control mb-2"
            type="text"
            onChange={onChange(setFieldValue, INPUT_NAME.VERIFY_PASSWORD)}
            placeholder={PLACEHOLDER_VERIFY_PASSWORD}
            value={values?.[INPUT_NAME.VERIFY_PASSWORD]}
            required
          />
          {touched[INPUT_NAME.VERIFY_PASSWORD] && errors && errors[INPUT_NAME.VERIFY_PASSWORD] ? (
            <span className="error-text">{errors[INPUT_NAME.VERIFY_PASSWORD]}</span>
          ) : null}
          <label htmlFor="floatingInput">{LABEL_VERIFY_PASSWORD}</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Reset Password
        </button>
      </Form>
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

export default ResetPasswordView;
