// src/utils/toastUtils.js
import { toast } from 'react-toastify';

export const showToast = (type, message, autoClose = 1600) => {
  switch (type) {
    case 'success':
        toast.success(message, { autoClose });
      break;
    case 'warning':
      toast.warning(message , { autoClose });
      break;
    case 'error':
      toast.error(message , { autoClose });
      break;
    default:
      toast.info(message , { autoClose });
      break;
  }
};