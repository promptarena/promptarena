import React from 'react';
import PropTypes from 'prop-types';

const ModernInput = ({
  id,
  name,
  type = 'text',
  label,
  placeholder = '',
  inputClass = '',
  labelClass = '',
  containerClass = '',
  ringColor = 'ring-gray-500',
  focusRingColor = 'focus:ring-sky-600',
  ...props
}) => {
  return (
    <div className={`relative ${containerClass}`}>
      <input
        id={id}
        name={name}
        type={type}
        className={`peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent px-2 ring-2 ${ringColor} ${focusRingColor} focus:outline-none focus:border-rose-600 ${inputClass}`}
        placeholder={placeholder || label}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text left-0 -top-3 text-sm bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm transition-all ${labelClass}`}
      >
        {label}
      </label>
    </div>
  );
};

ModernInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  containerClass: PropTypes.string,
  ringColor: PropTypes.string,
  focusRingColor: PropTypes.string,
};

export default ModernInput;
