import {runSaga, stdChannel} from 'redux-saga';
import VersionService from '../VersionService/VersionService';
import {getVersion} from '.'
import {getVersion as getVersionAction} from '../Actions'


VersionService.getVersion = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});


it('should return dump version', async () => {
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
