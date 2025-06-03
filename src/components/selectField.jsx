import React from 'react';
import { useFormContext } from 'react-hook-form';

const SelectField = ({ name, label, options, validationRules, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="main-select-holder">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        defaultValue=""
        aria-invalid={errors[name] ? "true" : "false"}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...register(name, validationRules)}
        {...rest}
      >
        <option value="" disabled>
          -- Select an option--
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p id={`${name}-error`} className="form-error-msg">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default SelectField;
