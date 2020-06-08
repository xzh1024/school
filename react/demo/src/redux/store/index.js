import { createStore } from 'redux';
import reducer from '../reducers';

export default function Store(initState) {
  return createStore(reducer, initState);
}