import { MutableRefObject, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { ToastId, useToast as useChakraToast } from '@chakra-ui/react';
import { closeToast, selectToastContent, selectToastIsOpen } from 'store/ui';

import { Toast } from 'components';

// Toast visibility period in miliseconds
const DURATION = 5000;

export const useToast = () => {
  const dispatch = useAppDispatch();

  const content = useAppSelector(selectToastContent);
  const isOpen = useAppSelector(selectToastIsOpen);

  const toast = useChakraToast();
  const toastIdRef = useRef<ToastId>();
  const timerRef: MutableRefObject<ReturnType<typeof setTimeout> | undefined> =
    useRef(undefined);

  const handleCloseToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    dispatch(closeToast());
    clearReduxDataWithDelay(1000);
  };

  const clearReduxDataWithDelay = (delay: number) => {
    timerRef.current = setTimeout(() => {
      dispatch(closeToast());
    }, delay);
  };

  useEffect(() => {
    if (isOpen && content?.message) {
      // Configure toast
      toastIdRef.current = toast({
        position: 'top',
        duration: DURATION,
        isClosable: true,
        render: () => (
          <Toast
            message={content.message}
            onClose={handleCloseToast}
            status={content?.status}
          />
        ),
      });

      // Clear toast data in the redux store
      clearReduxDataWithDelay(DURATION);
    }
  }, [isOpen]);
};
