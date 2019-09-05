import { eventChannel, externalListener } from "redux-saga";
import { put, takeLatest, all, take, call, race, fork, cancel } from 'redux-saga/effects';
import UserService from '../UserService/UserService';
import VersionService from '../VersionService/VersionService';
import * as ActionTypes from '../ActionTypes/ActionTypes';

  export function* getVersion() {
      const payload = yield take(ActionTypes.GET_VERSION);
      try {
        const version = yield call(VersionService.getVersion.bind(VersionService));
        const { buildDate, buildSha } = version.data;
        yield put({ type: "SET_VERSION", payload: { 'buildDate': buildDate,'buildSha':buildSha } });
      }catch(error) {
        console.log(error);
      }
  }

  export function* getCurrentUser() {
      const payload = yield take(ActionTypes.GET_CURRENTUSER);
      try {
        const user = yield call(UserService.getCurrentUser.bind(UserService), payload.apiKey);
        yield put({ type: "SET_CURRENTUSER", payload: { 'user': user.data} });
      }catch(error) {
        console.log("error");
      }
  }

  export function* registerUser() {
    while(true) {
        const {payload} = yield take(ActionTypes.REGISTER_USER);
        try {
          const arg = { 'login': payload.login, 'email': payload.email, 'password': payload.password}
          const user = yield call(UserService.registerUser.bind(UserService),
            { 'login': payload.login, 'email': payload.email, 'password': payload.password});
          yield put({ type: ActionTypes.SET_CURRENTUSER, payload: { 'user': user.data} });
          yield put({ type: ActionTypes.NOTIFY_SUCCESS, payload: { 'success': 'Successfully registered' } });
        }catch(error) {
          let errorMsg;
          if( error.response.data.error ){
             errorMsg=error.response.data.error;
          }else{
             errorMsg=error.response.data;
          }
          yield put({ type: ActionTypes.NOTIFY_ERROR, payload: { 'error': errorMsg} });
          console.log("error");
        }
    }
  }

export default function* rootSaga() {
  yield all([getCurrentUser(), getVersion(), registerUser()]);
}
