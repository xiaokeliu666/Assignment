import React from 'react';
import Login from './Login';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {describe, it} from "@jest/globals";

configure({adapter: new Adapter()})

describe("rendering components", () => {
    it('should render Login component without crashing', function () {
        shallow(<Login/>);
    });
})
