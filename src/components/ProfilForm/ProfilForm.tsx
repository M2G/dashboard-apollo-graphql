import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import ROUTER_PATH from 'constants/RouterPath';
import {
  ERROR_TEXT_REQUIRED,
  LABEL_PASSWORD,
  INPUT_NAME,
  LABEL_EMAIL,
  LABEL_FIRST_NAME,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_FIRST_NAME, PLACEHOLDER_LAST_NAME, LABEL_LAST_NAME,
} from './constants';

const { ERROR_TEXT_REQUIRED_EMAIL, ERROR_TEXT_REQUIRED_PASSWORD } = ERROR_TEXT_REQUIRED;

function ProfilForm({ initialValues, onSubmit }: any) {
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

    if (!values[INPUT_NAME.PASSWORD]) {
      errors[INPUT_NAME.PASSWORD] = ERROR_TEXT_REQUIRED_PASSWORD;
    }

    return errors;
  };

  const handleSubmit = (values: object) => onSubmit(values);

  const renderForm = ({
 setFieldValue, values, errors, touched,
}: any): any =>
      <div className="form-signin">
        <Form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <Field
              id="floatingInput"
              name={INPUT_NAME.FIRST_NAME}
              className="form-control mb-2"
              type="text"
              onChange={onChange(setFieldValue, INPUT_NAME.FIRST_NAME)}
              placeholder={PLACEHOLDER_FIRST_NAME}
              value={values?.[INPUT_NAME.FIRST_NAME]}
              required
            />
            {touched[INPUT_NAME.FIRST_NAME] && errors && errors[INPUT_NAME.FIRST_NAME] ? (
              <span className="error-text">{errors[INPUT_NAME.FIRST_NAME]}</span>
            ) : null}
            <label htmlFor="floatingInput">{LABEL_FIRST_NAME}</label>
          </div>
          <div className="form-floating">
            <Field
              id="floatingInput"
              name={INPUT_NAME.LAST_NAME}
              className="form-control mb-2"
              type="text"
              onChange={onChange(setFieldValue, INPUT_NAME.LAST_NAME)}
              placeholder={PLACEHOLDER_LAST_NAME}
              value={values?.[INPUT_NAME.LAST_NAME]}
              required
            />
            {touched[INPUT_NAME.LAST_NAME] && errors && errors[INPUT_NAME.LAST_NAME] ? (
              <span className="error-text">{errors[INPUT_NAME.LAST_NAME]}</span>
            ) : null}
            <label htmlFor="floatingInput">{LABEL_LAST_NAME}</label>
          </div>
          <div className="form-floating">
            <Field
              id="floatingPassword"
              className="form-control mb-2"
              name={INPUT_NAME.EMAIL}
              type="email"
              onChange={onChange(setFieldValue, INPUT_NAME.EMAIL)}
              placeholder={PLACEHOLDER_EMAIL}
              value={values?.[INPUT_NAME.EMAIL]}
              required
            />
            {touched[INPUT_NAME.EMAIL]
            && errors
            && errors[INPUT_NAME.EMAIL] ? (
              <span className="error-text">{errors[INPUT_NAME.EMAIL]}</span>
            ) : null}
            <label htmlFor="floatingPassword">{LABEL_EMAIL}</label>
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
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </Form>
        <Link to={ROUTER_PATH.SIGNUP} className="mt-4 text-muted">Signup</Link>
        <Link to={ROUTER_PATH.FORGOT_PASSWORD} className="mt-1 text-muted">Forgot Password</Link>
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

export default ProfilForm;