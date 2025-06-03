// InputField.jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

const TextArea = ({ name, type = 'text', label, validationRules, placeholder, ...rest }) => {
  const { register, formState: { errors } } = useFormContext(); // Access register and errors from context

  return (
    <div className='main-input-holder'>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validationRules)} // Register the input with react-hook-form
        {...rest}
      />
      {errors[name] && <p className='form-error-msg'>{errors[name].message}</p>}
    </div>
  );
};

export default TextArea;