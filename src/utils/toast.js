import { toast } from 'react-toastify';

let activeToastId = null;

export const showToast = (message, type = 'default', position = 'top-right') => {
  const config = {
    position,
    autoClose: 6000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',//'colored',
    toastId: 'unique-global-toast', // fixed ID to prevent duplicates
  };

  switch (type) {
    case 'success':
      activeToastId = toast.success(message, config);
      break;
    case 'error':
      activeToastId = toast.error(message, config);
      break;
    case 'info':
      activeToastId = toast.info(message, config);
      break;
    case 'warn':
      activeToastId = toast.warn(message, config);
      break;
    default:
      activeToastId = toast(message, config);
  }
};

