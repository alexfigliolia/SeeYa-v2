import ImageUpload from 'Services/ImageUpload';

export const imageUploadSuccess = () => dispatch => {
  ImageUpload.clearFakeProgressInterval();
  dispatch({
    type: 'USER_IMAGE_UPLOAD_PROGRESS',
    progress: 100
  });
  setTimeout(() => {
    dispatch({ type: 'USER_IMAGE_UPLOAD_SUCCESS' });
    dispatch(hideUploaderAndReset());
  }, 1500);
}

export const imageUploadError = () => dispatch => {
  ImageUpload.clearFakeProgressInterval();
  dispatch({ type: 'USER_IMAGE_UPLOAD_ERROR' });
  dispatch(hideUploaderAndReset());
}

export const hideUploaderAndReset = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'UPLOADING_NEW_USER_IMAGE' });
    setTimeout(() => {
      dispatch({ type: 'RESET_USER_IMAGE_UPLOAD_PROGRESS' });
    }, 600);
  }, 3500);
}