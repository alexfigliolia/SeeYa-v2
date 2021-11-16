const initialState = {
  height: window.innerHeight,
  width: window.innerWidth
}

const Screen = (state = initialState, action) => {
  switch (action.type) {
    case 'RESIZE_WINDOW':
      return Object.assign({}, state, {
        height: window.innerHeight,
        width: window.innerWidth
      });
    default:
      return state;
  }
}

export default Screen;