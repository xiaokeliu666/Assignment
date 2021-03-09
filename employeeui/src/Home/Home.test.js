import React from 'react';
import Home from './Home';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {describe, it} from "@jest/globals";

configure({adapter: new Adapter()})

describe("rendering components", () => {
    it('should render Home component without crashing', function () {
        shallow(<Home/>);
    });
    it('should render header of Home component without crashing ', function () {
        const wrapper = shallow(<Home/>)
        const header = (<h1 style={{marginTop: "20px",textAlign:"center" ,fontSize:"2vw"}}>Employee Management</h1>);
        expect(wrapper.contains(header)).toEqual(true);
    });
})
