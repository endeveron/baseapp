import { useEffect, useRef, useState } from 'react';

import './Toast.scss';
import { Box } from '@chakra-ui/react';

type ToastStatus = 'success' | 'error' | 'info' | 'warning';

type ToastProps = {
  message: string;
  status?: ToastStatus;
  onClose?: () => void;
};

const Toast = ({ message, onClose, status = 'error' }: ToastProps) => {
  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    // Ignore click outside the toast
    if (reason === 'clickaway') return;
    onClose && onClose();
  };

  return (
    <Box className={`toast toast--${status}`} onClick={handleClose}>
      {message}
    </Box>
  );
};

export { Toast };
