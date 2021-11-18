const initialState = {
  images: [],
  imageUploadProgress: 0
}

const User = (state = initialState, action) => {
  switch (action.type) {
    case 'IMAGE_UPLOAD_PROGRESS':
      return Object.assign({}, state, { imageUploadProgress: action.progress });
    case 'RESET_IMAGE_UPLOAD_PROGRESS':
      return Object.assign({}, state, { imageUploadProgress: action.progress });
    default:
      return state;
  }
}

export default User;