import React from 'react';
import { shallow, mount} from 'enzyme';
import Footer from './Footer';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import {getVersion} from '../Actions'

const initialState = {};
const mockStore = configureStore();

describe('structure', () => {
  it('should send the correct action', () => {
    const store = mockStore(initialState)
    const wrapper = shallow(<Footer store={store} />).dive();
    const actions = store.getActions()
    const expectedPayload = { type: 'GET_VERSION' }
    expect(actions).toEqual([getVersion()])
  });
});
