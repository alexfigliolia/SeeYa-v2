const initialState = {
  images: [],
  uploadingNewImage: false,
  imageUploadSuccess: false,
  imageUploadError: false,
  imageUploadProgress: 0
}

const User = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_IMAGE_UPLOAD_PROGRESS':
      return Object.assign({}, state, { imageUploadProgress: action.progress });
    case 'INCREMENT_USER_IMAGE_UPLOAD_PROGRESS':
      return Object.assign({}, state, { imageUploadProgress: state.imageUploadProgress + 0.5 });
    case 'RESET_USER_IMAGE_UPLOAD_PROGRESS':
      return Object.assign({}, state, {
        imageUploadProgress: 0,
        imageUploadSuccess: false,
        imageUploadError: false
      });
    case 'UPLOADING_NEW_USER_IMAGE':
      return Object.assign({}, state, { uploadingNewImage: !state.uploadingNewImage });
    case 'USER_IMAGE_UPLOAD_SUCCESS':
      return Object.assign({}, state, { imageUploadSuccess: true });
    case 'USER_IMAGE_UPLOAD_ERROR':
      return Object.assign({}, state, { imageUploadError: true });
    default:
      return state;
  }
}

export default User;