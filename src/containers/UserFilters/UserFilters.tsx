import { Field, Formik, Form } from 'formik';
import { PLACEHOLDER_SEARCH, INPUT_NAME } from './constants';

function UserFilters({ onSubmit, initialValues }: any) {
  const setField = (setFieldValue: any, setFieldName: any, value: any): any =>
    setFieldValue(setFieldName, value);

  const onChange = (setFieldValue: any, setFieldName: any): any =>
    ({ target: { value = '' } }: any) =>
      setField(setFieldValue, setFieldName, value);

  const handleSubmit = (values: object) => onSubmit(values);

  const renderForm = ({ setFieldValue, values }: any): any => (
    <Form className="d-flex">
      <Field
        id="floatingInput"
        name={INPUT_NAME.SEARCH}
        className="form-control me-2"
        type="search"
        aria-label="Search"
        onChange={onChange(setFieldValue, INPUT_NAME.SEARCH)}
        placeholder={PLACEHOLDER_SEARCH}
        value={values[INPUT_NAME.SEARCH]}
      />
      <button className="btn btn-light" type="submit">
        Search
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

export default UserFilters;
