import { eventChannel, externalListener } from "redux-saga";
import { put, takeLatest, all, take, call, race, fork, cancel, takeEvery} from 'redux-saga/effects';
import UserService from '../UserService/UserService';
import VersionService from '../VersionService/VersionService';
import * as ActionTypes from '../ActionTypes/ActionTypes';
import {notifySuccess, notifyError, userLoggedout} from '../Actions/Actions';


  export function* getVersion() {
      while(true){
        const payload = yield take(ActionTypes.GET_VERSION);
        try {
          const version = yield call(VersionService.getVersion.bind(VersionService));
          const { buildDate, buildSha } = version.data;
          yield put({ type: ActionTypes.SET_VERSION, payload: { 'buildDate': buildDate,'buildSha':buildSha } });
        }catch(error) {
          console.log(error);
          yield put({ type: ActionTypes.NOTIFY_ERROR, payload: { 'error': "GET_VERSION" + error} });
        }
      }
  }


export function* getCurrentUser() {
      while(true){
        const payload = yield take(ActionTypes.GET_CURRENTUSER);
        console.log("CALL GET_CURRENTUSER");
        try {
          const user = yield call(UserService.getCurrentUser.bind(UserService), payload.apiKey);
          yield put({ type: "SET_CURRENTUSER", payload: { 'user': user.data} });
        }catch(error) {
          console.log("error");
        }
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
          yield put({ type: ActionTypes.REDIRECT_MAINPAGE});          
        }catch(error) {
          let errorMsg;
          if( error.response.data.error ){
             errorMsg=error.response.data.error;
          }else{
             errorMsg=error.response.data;
          }
          yield put({ type: ActionTypes.NOTIFY_ERROR, payload: { 'error': "REGISTER_USER:"+ errorMsg} });
          console.log("error:"+error);
        }
    }
  }

  export function* userLogin() {
      while(true) {
        const {payload} = yield take(ActionTypes.USER_LOGIN);
        try {
          const arg = { loginOrEmail: payload.loginOrEmail, password: payload.password }
          const {data} = yield call(UserService.login.bind(UserService), arg)
          yield put({ type: ActionTypes.USER_LOGGEDIN, payload: { 'apiKey': data.apiKey} });
        }catch(error) {
        let errorMsg;
                  if( error.response.data.error ){
                     errorMsg=error.response.data.error;
                  }else{
                     errorMsg=error.response.data;
                  }
                  yield put({ type: ActionTypes.NOTIFY_ERROR, payload: { 'error': "USER_LOGIN:"+errorMsg} });
                  console.log("error:"+error);
        }
      }
  }

  export function* userLogout() {
      while(true) {
        const {} = yield take(ActionTypes.USER_LOGOUT);

        // missing backend code

        yield put(userLoggedout());
      }
  }
export default function* rootSaga() {
  yield all([getCurrentUser(), getVersion(), registerUser(), userLogin(), userLogout()]);
}
