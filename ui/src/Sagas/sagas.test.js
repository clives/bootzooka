import {runSaga, stdChannel} from 'redux-saga';
import VersionService from '../VersionService/VersionService';
import UserService from '../UserService/UserService';
import {getVersion, getCurrentUser} from './Sagas'
import {getVersion as getVersionAction, getCurrentUser as getCurrentUserAction} from '../Actions'
import { expectSaga } from 'redux-saga-test-plan';

VersionService.getVersion = jest.fn();
UserService.getCurrentUser = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

it('getCurrentUser should had be called',async () => {
  UserService.getCurrentUser.mockImplementation(() => "");
  const dispatched = []
  const channel = stdChannel()
  const options = {
      dispatch: action => dispatched.push(action),
      getState: () => {},
      channel
    };

  const promise = expectSaga(getCurrentUser)
    .dispatch(getCurrentUserAction()).run()

  await promise
  expect(UserService.getCurrentUser).toHaveBeenCalled();
});


it('getVersion should return dump version', async () => {
  const ourVersion = { data: {buildDate:'12 mars 2019', buildSha: '3334-444' }}
  VersionService.getVersion.mockImplementation(() => ourVersion);

  const dispatched = []
  const channel = stdChannel()

  const options = {
      dispatch: action => dispatched.push(action),
      getState: () => {},
      channel
    };
    const task = runSaga(options, getVersion);


channel.put(getVersionAction());

await task.toPromise();
  expect(dispatched[0].payload).toStrictEqual(ourVersion.data);
  expect(VersionService.getVersion).toHaveBeenCalled();
});
