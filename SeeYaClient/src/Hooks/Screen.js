import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Debounce from 'lodash.debounce';
import { resizeWindow } from 'Actions/Screen';

export const useScreen = (timeout = 500) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const debounceResize = Debounce(() => {
      dispatch(resizeWindow());
    }, timeout)
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    }
  }, [dispatch, timeout]);
}
