import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const Form = ({ children, onSubmit, defaultValues, formProps}) => {
  const methods = useForm({ defaultValues });

  const internalOnSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(internalOnSubmit)} {...formProps}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
