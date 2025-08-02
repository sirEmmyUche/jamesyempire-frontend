import React,{useEffect} from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const Form = ({ children, onSubmit, defaultValues, formProps,autoResetOnDefaultChange = false }) => {
  const methods = useForm({ defaultValues : {}});

   const { reset,} = methods;

  // Reset form when defaultValues prop changes
  useEffect(() => {
    if(!autoResetOnDefaultChange)return
    const loadAndReset = async () => {
      const values = typeof defaultValues === 'function' ? await defaultValues() : defaultValues;
      reset(values); // ✅ reset form with new default values
    };
    loadAndReset();
  }, [defaultValues, reset,autoResetOnDefaultChange ]);

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
