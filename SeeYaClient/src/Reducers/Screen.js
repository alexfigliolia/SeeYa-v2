const initialState = {
  height: window.innerHeight,
  width: window.innerWidth,
  menuOpen: false
}

const Screen = (state = initialState, action) => {
  switch (action.type) {
    case 'RESIZE_WINDOW':
      return Object.assign({}, state, {
        height: window.innerHeight,
        width: window.innerWidth
      });
    case 'TOGGLE_MENU':
      return Object.assign({}, state, { menuOpen: !state.menuOpen });
    case 'CLOSE_MENU':
      return Object.assign({}, state, { menuOpen: false });
    default:
      return state;
  }
}

export default Screen;