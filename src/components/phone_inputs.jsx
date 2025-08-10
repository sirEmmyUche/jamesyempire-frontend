import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import styles for PhoneInput
import { Controller, useFormContext } from "react-hook-form";
import { isValidPhoneNumber } from "libphonenumber-js";

const PhoneInputField = ({
  name,
  label,
  validationRules,
  placeholder,
  country = "us",
  allowRules = true,
  ...rest
}) => {
  const { control, formState: { errors } } = useFormContext();

  const rules = {
    ...validationRules,
    validate: {
      ...validationRules?.validate,
      isValidPhone: (value) =>
        !value || isValidPhoneNumber(value) || "Invalid phone number format",
    },
  };

  return (
    <div className="main-input-holder">
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={allowRules? rules: {}}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            country={country}
            value={value || ""}
            containerClass={'phone-input-container'}
            inputClass={'phone-input-class'}
            buttonClass={'buttonClass'}
             enableSearch={true}
            disableSearchIcon={true}
            onChange={(phone) => {
              const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
              onChange(formattedPhone);
            }}
            placeholder={placeholder}
            inputProps={{
              name,
              id: name,
              ...rest,
            }}
          />
        )}
      />
      {errors[name] && <p className="form-error-msg">{errors[name].message}</p>}
    </div>
  );
};
export default PhoneInputField;
