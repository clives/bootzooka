import { eventChannel, externalListener } from "redux-saga";
import { put, takeLatest, all, take, call, race, fork, cancel } from 'redux-saga/effects';
import UserService from '../UserService/UserService';
import PropTypes from 'prop-types';

export default function* rootSaga() {

  //let userService = PropTypes.instanceOf(UserService).isRequired
  let userService = new UserService();

  function* getCurrentUser() {
    while (true) {
      const payload = yield take('GET_CURRENTUSER');
      userService.getCurrentUser("kk");
      try {
        const userData = yield call(userService.getCurrentUser.bind(userService), payload.apiKey);
        yield put({ type: "SET_CURRENTUSER", payload: userData });
      }catch(error) {
        console.log("erro");
      }
    }
  }

  yield all([getCurrentUser()]);
}
