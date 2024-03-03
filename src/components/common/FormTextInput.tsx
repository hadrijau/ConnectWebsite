import React, {ReactNode} from "react";
import { FieldProps } from "formik";

interface FormTextInputProps extends FieldProps {
  label?: string;
  name: string;
  id: string;
  className: string;
  type: string;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  field,
  label,
  name,
  id,
  type,
  className,
  form: { touched, errors },
  ...props
}) => {
  const isError = touched[name] && errors[name];

  return (
    <div className={`${className} rounded-xl ${isError ? "input-error" : ""}`}>
      <input
        id={id}
        type={type}
        {...field}
        {...props}
        className={`w-full bg-inherit border-none outline-none ${isError ? "input-field-error" : ""}`}
      />
      {isError && <div className="c-input__error">{errors[name] as ReactNode}</div>}
    </div>
  );
};

export default FormTextInput;
