import React, { useId } from "react";

const InputFeildComponent = (
  { label, title, type, className, ...rest },
  ref
) => {
  const id = useId();
  return (
    <div className="mb-4">
      {label && (
        <label
          title={title}
          className={`block text-sm font-medium ${className}`}
          htmlFor={id}
        >
          <span>{label}</span>
        </label>
      )}
      <input
        ref={ref}
        title={title}
        type={type || "text"}
        id={id}
        className={`mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-white ${className}`}
        {...rest}
      />
    </div>
  );
};

export const InputFeild = React.forwardRef(InputFeildComponent);
