import { Field, Formik, Form } from 'formik';
import {
  PLACEHOLDER_FIRST_NAME,
  PLACEHOLDER_LAST_NAME,
  PLACEHOLDER_EMAIL,
  INPUT_NAME,
  LABEL_FIRST_NAME,
  LABEL_LAST_NAME,
  LABEL_EMAIL,
} from './constants';

function UserEdit({ onSubmit, initialValues }: any): any {
  const setField = (setFieldValue: any, setFieldName: any, value: any): any =>
    setFieldValue(setFieldName, value);

  const onChange = (setFieldValue: any, setFieldName: any): any =>
    ({ target: { value = '' } }: any) =>
      setField(setFieldValue, setFieldName, value);

  const handleSubmit = (values: object) => onSubmit(values);

  const renderForm = ({ setFieldValue, values }: any): any => (
    <Form className="mt-5">
      <div className="form-floating mb-3">
        <Field
          id="userFirstname"
          name={INPUT_NAME.FIRST_NAME}
          className="form-control mb-2"
          type="text"
          onChange={onChange(setFieldValue, INPUT_NAME.FIRST_NAME)}
          placeholder={PLACEHOLDER_FIRST_NAME}
          value={values[INPUT_NAME.FIRST_NAME]}
        />
        <label htmlFor="userFirstname">{LABEL_FIRST_NAME}</label>
      </div>
      <div className="form-floating mb-3">
        <Field
          id="userLastname"
          className="form-control mb-2"
          name={INPUT_NAME.LAST_NAME}
          type="text"
          onChange={onChange(setFieldValue, INPUT_NAME.LAST_NAME)}
          placeholder={PLACEHOLDER_LAST_NAME}
          value={values[INPUT_NAME.LAST_NAME]}
        />
        <label htmlFor="userLastname">{LABEL_LAST_NAME}</label>
      </div>
      <div className="form-floating mb-3">
        <Field
          id="userEmail"
          className="form-control mb-2"
          name={INPUT_NAME.EMAIL}
          type="email"
          onChange={onChange(setFieldValue, INPUT_NAME.EMAIL)}
          placeholder={PLACEHOLDER_EMAIL}
          value={values[INPUT_NAME.EMAIL]}
        />
        <label htmlFor="userEmail">{LABEL_EMAIL}</label>
      </div>
      <button className="btn btn-light" type="submit">
        Save
      </button>
    </Form>
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

export default UserEdit;
