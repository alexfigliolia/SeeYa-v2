import { combineReducers } from "redux";
import logSlowReducers from 'redux-log-slow-reducers';
import Base from './Base';
import Screen from './Screen';
import Authentication from './Authentication';
import User from './User';

let Reducers = combineReducers({
  Base,
  Screen,
  Authentication,
  User
});

if (process.env.NODE_ENV !== 'production') {
  Reducers = logSlowReducers(Reducers);
}

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return Reducers(undefined, action)
  }
  return Reducers(state, action)
}

export default rootReducer;