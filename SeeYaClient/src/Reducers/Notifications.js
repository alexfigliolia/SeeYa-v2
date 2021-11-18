const initialState = {
  error: '',
  success: ''
}

const Notifications = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY_ERROR':
      return Object.assign({}, state, { error: action.message });
    case 'NOTIFY_SUCCESS':
      return Object.assign({}, state, { success: action.message });
    default:
      return state;
  }
}

export default Notifications;