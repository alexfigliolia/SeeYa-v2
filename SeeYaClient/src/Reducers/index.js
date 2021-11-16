import { combineReducers } from "redux";
import logSlowReducers from 'redux-log-slow-reducers';
import Base from './Base';
import Screen from './Screen';
import Authentication from './Authentication';

let Reducers = combineReducers({
  Base,
  Screen,
  Authentication
});

if (process.env.NODE_ENV !== 'production') {
  Reducers = logSlowReducers(Reducers);
}

export default Reducers;