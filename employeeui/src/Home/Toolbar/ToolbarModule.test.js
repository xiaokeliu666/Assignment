import React from 'react';
import Toolbar from './ToolbarModule';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {describe, it} from "@jest/globals";

configure({adapter: new Adapter()})

describe("rendering components", () => {
    it('should render Toolbar component without crashing', function () {
        shallow(<Toolbar/>);
    });
})
