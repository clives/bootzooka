import { eventChannel, externalListener } from "redux-saga";
import { put, takeLatest, all, take, call, race, fork, cancel } from 'redux-saga/effects';
import UserService from '../UserService/UserService';
import VersionService from '../VersionService/VersionService';

export default function* rootSaga() {

  let userService = new UserService();
  let versionService = new VersionService();



function* getVersion() {
    while (true) {
      const payload = yield take('GET_VERSION');
      try {
        const version = yield call(versionService.getVersion.bind(versionService));
        const { buildDate, buildSha } = version.data;
        yield put({ type: "SET_VERSION", payload: { 'buildDate': buildDate,'buildSha':buildSha } });
      }catch(error) {
        console.log("error");
      }
    }
  }

  function* getCurrentUser() {
    while (true) {
      const payload = yield take('GET_CURRENTUSER');
      try {
        const user = yield call(userService.getCurrentUser.bind(userService), payload.apiKey);
        yield put({ type: "SET_CURRENTUSER", payload: { 'user': user.data} });
      }catch(error) {
        console.log("error");
      }
    }
  }

  yield all([getCurrentUser(), getVersion()]);
}
