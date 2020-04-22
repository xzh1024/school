import { createStore } from 'redux';
import reducer from '../reducers/user';

export default function Store(initState) {
  return createStore(reducer, initState);
}