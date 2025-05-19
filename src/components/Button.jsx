import React from 'react';

const Button = ({
  text,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
  iconLeft = null,
  iconRight = null,
  isLoading = false,
  loadingText = '',
}) => {
  const handleClick = (event) => {
    if (onClick && !isLoading) {
      if (type === 'submit') {
        event.preventDefault();
      }
      onClick(event);
    }
  };

  const buttonClass = `--btn--default ${className} ${disabled || isLoading ? '--btn--disabled' : ''}`.trim();

  return (
    <button
      type={type}
      onClick={handleClick}
      className={buttonClass}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <span className="spinner" /> {loadingText}
        </>
      ) : (
        <>
          {iconLeft && <span className="btn-icon left">{iconLeft}</span>}
          {text || children}
          {iconRight && <span className="btn-icon right">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
