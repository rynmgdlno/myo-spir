import React from "react";
import PropTypes from "prop-types";

export const Input = ({
  name,
  type,
  placeholder,
  className,
  value,
  error,
  children,
  label,
  searchActive,
  onChange,
  ...props
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
        style={error && { border: "solid 1px red" }}
        {...props}
      />
      {error &&
        <p>
          {error}
        </p>}
    </div>
  );
};

export const Select = ({ className }) => {
  return <select className={className}>props.children</select>;
};

export const TextArea = ({
  className,
  name,
  onChange,
  value,
  placeholder,
  label,
  error,
  ...props
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        className={className}
        name={name}
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        style={error && { border: "solid 1px red" }}
        {...props}
      />
      {error &&
        <p>
          {error}
        </p>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  className: ""
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  // placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "password", "email", "tel"]),
  className: PropTypes.string,
  value: PropTypes.any
  // onChange: PropTypes.func.isRequired
};
