import { Formik, Field, Form } from 'formik';

import {
  ERROR_TEXT_REQUIRED,
  INPUT_NAME,
  LABEL_EMAIL,
  PLACEHOLDER_EMAIL,
} from './constants';

const { ERROR_TEXT_REQUIRED_EMAIL } = ERROR_TEXT_REQUIRED;

function ForgotPassword({ initialValues, onSubmit }: any) {
  const setField = (setFieldValue: any, setFieldName: any, value: any): any =>
    setFieldValue(setFieldName, value);

  const onChange = (setFieldValue: any, setFieldName: any): any =>
    ({ target: { value = '' } }: any) =>
      setField(setFieldValue, setFieldName, value);

  const onValidate = (values: object): {} => {
    const errors = {};

    if (!values[INPUT_NAME.EMAIL]) {
      errors[INPUT_NAME.EMAIL] = ERROR_TEXT_REQUIRED_EMAIL;
    }

    return errors;
  };

  const handleSubmit = (values: object) => onSubmit(values);

  const renderForm = ({
 setFieldValue, values, errors, touched,
}: any): any =>
      <div className="form-signin">
        <Form>
          <h1 className="h3 mb-3 fw-normal">Forgot password</h1>
          <div className="form-floating">
            <Field
              id="floatingInput"
              name={INPUT_NAME.EMAIL}
              className="form-control"
              type="email"
              onChange={onChange(setFieldValue, INPUT_NAME.EMAIL)}
              placeholder={PLACEHOLDER_EMAIL}
              value={values?.[INPUT_NAME.EMAIL]}
              required
            />
            {touched[INPUT_NAME.EMAIL] && errors && errors[INPUT_NAME.EMAIL] ? (
              <span className="error-text text-danger">{errors[INPUT_NAME.EMAIL]}</span>
            ) : null}
            <label htmlFor="floatingInput">{LABEL_EMAIL}</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">
            Submit
          </button>
        </Form>
      </div>;

  return <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={onValidate}
    >
      {renderForm}
    </Formik>;
}

export default ForgotPassword;
