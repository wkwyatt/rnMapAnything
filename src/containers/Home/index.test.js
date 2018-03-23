import 'react-native';
// import renderer from 'react-test-renderer';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise';
import Home from '../Home';

configure({ adapter: new Adapter() });
const middlewares = [promiseMiddleware];
const mockStore = configureMockStore(middlewares)({
});

// jest.mock('react-native-webview-bridge-updated', () => {
//     return {
//         NavigationType: () => {},
//     };
// });

test('renders correctly', () => {
    const wrapper = shallow(
        <Home
            store={mockStore}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
});
