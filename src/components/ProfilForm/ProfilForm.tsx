import { Link } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { Formik, Field, Form } from 'formik';

import ROUTER_PATH from 'constants/RouterPath';
import {
  INPUT_NAME,
  LABEL_EMAIL,
  LABEL_FIRST_NAME,
  LABEL_LAST_NAME,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_FIRST_NAME,
  PLACEHOLDER_LAST_NAME,
} from './constants';

interface IForm {
  initialValues: Record<any, unknown>;
  onSubmit: (value: any) => Record<any, any>;
}

function ProfilForm({ initialValues, onSubmit }: IForm): JSX.Element {
  const setField = (setFieldValue: any, setFieldName: any, value: any): any =>
    setFieldValue(setFieldName, value);

  const onChange = (setFieldValue: any, setFieldName: any): any =>
    ({ target: { value = '' } }: any) =>
      setField(setFieldValue, setFieldName, value);

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
        <div className="mb-4">
          <h1 className="h3 mb-1">User Profil</h1>
        </div>
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
          {touched[INPUT_NAME.FIRST_NAME]
          && errors
          && errors[INPUT_NAME.FIRST_NAME] ? (
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
          {touched[INPUT_NAME.LAST_NAME]
          && errors
          && errors[INPUT_NAME.LAST_NAME] ? (
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
          {touched[INPUT_NAME.EMAIL] && errors && errors[INPUT_NAME.EMAIL] ? (
            <span className="error-text">{errors[INPUT_NAME.EMAIL]}</span>
          ) : null}
          <label htmlFor="floatingPassword">{LABEL_EMAIL}</label>
        </div>
        <button className="w-100 btn btn-lg" type="submit">
          Save
        </button>
        <div className="c-action">
          <span>Have an account ?</span>
          <Link to={ROUTER_PATH.CHANGE_PASSWORD} className="text-muted">
            Change Password
          </Link>
          <Link to={ROUTER_PATH.HOME} className="text-muted">
            Home
          </Link>
        </div>
      </Form>
    </div>
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default ProfilForm;
