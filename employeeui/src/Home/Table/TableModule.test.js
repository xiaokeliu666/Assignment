import React from 'react';
import TableModule from './TableModule';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {describe, it} from "@jest/globals";
import 'jest-enzyme';

configure({adapter: new Adapter()})

const data = [
    {
        id: "IT001",
        name: "Scott",
        surname: "Liu",
        phone: "8732880212",
        address: "255 Wilbrod Street",
        title: "Developer",
    },
    {
        id: "IT002",
        name: "Sam",
        surname: "Smith",
        phone: "8732880212",
        address: "255 Wilbrod Street",
        title: "Developer",
    }
]


describe("rendering components", () => {
    it('should render Table component without crashing', function () {
        shallow(<TableModule/>);
    });
    it('should render 0 data when dataSource is empty', function () {
        const wrapper = mount(<TableModule/>)
    });

})
