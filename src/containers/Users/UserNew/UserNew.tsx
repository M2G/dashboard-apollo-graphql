import { Field, Formik, Form } from 'formik';
import {
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_EMAIL,
  INPUT_NAME,
  ERROR_TEXT_REQUIRED,
  LABEL_PASSWORD,
  LABEL_EMAIL,
} from './constants';

const {
  ERROR_TEXT_REQUIRED_EMAIL,
  ERROR_TEXT_REQUIRED_PASSWORD,
} = ERROR_TEXT_REQUIRED;

function UserNew({ onSubmit, initialValues }: any): any {
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

  const handleSubmit = (values: object) => onSubmit({ ...values, redirect: false });

  const renderForm = ({
                        setFieldValue, values, errors, touched,
                      }: any): any =>
    <Form className="mt-5">
      <div className="form-floating mb-3">
        <Field
          id="floatingEmail"
          className="form-control mb-2"
          name={INPUT_NAME.EMAIL}
          type="text"
          onChange={onChange(setFieldValue, INPUT_NAME.EMAIL)}
          placeholder={PLACEHOLDER_EMAIL}
          value={values[INPUT_NAME.EMAIL]}
          required
        />
        {touched[INPUT_NAME.EMAIL]
        && errors
        && errors[INPUT_NAME.EMAIL] ? (
          <span className="error-text">{errors[INPUT_NAME.EMAIL]}</span>
        ) : null}
        <label htmlFor="floatingEmail">{LABEL_EMAIL}</label>
      </div>
      <div className="form-floating mb-3">
        <Field
          id="floatingPassword"
          name={INPUT_NAME.PASSWORD}
          className="form-control mb-2"
          type="text"
          onChange={onChange(setFieldValue, INPUT_NAME.PASSWORD)}
          placeholder={PLACEHOLDER_PASSWORD}
          value={values[INPUT_NAME.PASSWORD]}
          required
        />
        {touched[INPUT_NAME.PASSWORD] && errors && errors[INPUT_NAME.PASSWORD] ? (
          <span className="error-text">{errors[INPUT_NAME.PASSWORD]}</span>
        ) : null}
        <label htmlFor="floatingFirstname">{LABEL_PASSWORD}</label>
      </div>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </Form>;

  return <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={onValidate}
    >
      {renderForm}
    </Formik>;
}

export default UserNew;
