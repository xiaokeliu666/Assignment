import React from 'react';
import Form from './FormModule';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {describe, it} from "@jest/globals";

configure({adapter: new Adapter()})

describe("rendering components", () => {
    it('should render Form component without crashing', function () {
        shallow(<Form/>);
    });
})
