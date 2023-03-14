import * as React from 'react';
import { FormikConfig, FormikValues, useFormik } from 'formik';

function useFormikCustom<Values extends FormikValues = FormikValues>(props: FormikConfig<Values>) {
  const formik = useFormik({ validateOnBlur: false, validateOnChange: false, ...props });

  const handleChangeCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    formik.setFieldError(e.target.name, undefined);
  };

  const getFieldPropsCustom = (key: keyof typeof formik.initialValues) => ({
    ...formik.getFieldProps(key),
    error: Boolean(formik.errors[key]),
    helperText: formik.errors[key] ? formik.errors[key] : undefined,
    disabled: formik.isSubmitting,
    onChange: handleChangeCustom,
  });

  return { ...formik, getFieldPropsCustom };
}

export default useFormikCustom;
