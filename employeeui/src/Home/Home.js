import React, {Fragment, useEffect, useState} from 'react'
import { Space, Modal, Button, Form, Input, message} from 'antd'
import { ExclamationCircleOutlined, EditFilled, DeleteFilled } from '@ant-design/icons'
import FormModule from './Form/FormModule'
import Table from './Table/TableModule'
import {delApi, findByInfoApi, listApi} from '../services/employee'
import TableModule from "./Table/TableModule";
import ToolbarModule from "./Toolbar/ToolbarModule";

function Home(props) {
	// Data Display
	const [curPage, setCurPage] = useState(1)
	const [pageSize, setPageSize] = useState(5)
	const [data, setData] = useState([])
	const [totalAmount, setTotalAmount] = useState(0)

	// Modal Display
	const [visible, setVisible] = useState(false)
	const [isAdd, setIsAdd] = useState(true)
	const [selected, setSelected] = useState({})

	// Fuzzy Search
	const [info, setInfo] = useState("")
	const [title, setTitle] = useState("")

	// Dependency of useEffect()
	const [flag, setFlag] = useState(false);
	// Log out, clear token
	const logout = () => {
		localStorage.removeItem('token')
		props.history.push('/')
	}

	let AuthButton = null;
	if (localStorage.getItem("token"))
		AuthButton = (
			<Button type='link' style={{float:"right"}} onClick={logout}>
				Logout
			</Button>
		)
	return (
		<Fragment>
			{AuthButton}
			<h1 style={{marginTop: "20px",textAlign:"center" ,fontSize:"2vw"}}>Employee Management</h1>
			<ToolbarModule
				setInfo={setInfo}
				setTitle={setTitle}
				setFlag={setFlag}
				setCurPage={setCurPage}
				flag={flag}
				history={props.history}
			/>
			<TableModule
				info={info}
				title={title}
				curPage={curPage}
				setCurPage={setCurPage}
				history={props.history}
			/>
			<FormModule
				visible={visible}
				selected={selected}
				isAdd={isAdd}
				flag={flag}
				setIsAdd={setIsAdd}
				setSelected={setSelected}
				setVisible={setVisible}
				setFlag={setFlag}
			/>
		</Fragment>
	)

}
export default Home
