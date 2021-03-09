import React, { Fragment, useEffect } from 'react'
import { Modal, Button, Input, Form, message } from 'antd'
import { withRouter } from 'react-router-dom';
import './FormModule.css'
import { addApi,updateApi } from "../../services/employee";

const FormModule = (props) => {
	const [form] = Form.useForm()
	const resetHandler = () => {form.resetFields();}
	useEffect(()=>console.log("FormModule中接到的selected:"+JSON.stringify(props.selected)),[])
	form.setFieldsValue({...props.selected})
	const onFinish = (values) => {
		props.setIsShown(false)
		// props.setIsAdd(true)
		// props.setSelected({})
		resetHandler()
		console.log("onFinish:"+JSON.stringify(values))
		console.log("onFinish:"+props.isAdd)
		if(props.isAdd) {
			addApi(values)
				.then((response) => {
					console.log("response!!!!"+JSON.stringify(response))
					if(response.status) {
						message.success("Success!")
						// props.setFlag(!props.flag)
						props.history.push('/index')
					}
					else message.error(response.msg)
				})
		} else {
			updateApi(props.selected.id,values)
				.then(()=>{
					message.success("Success!")
					props.history.push("/index")
				})
		}
	}
	const onCancel = () => {
		props.setIsShown(false)
		console.log("onCancel:"+JSON.stringify(props.selected))
		resetHandler()
	}
	return (
		<Fragment>
			<Modal
				title={props.isAdd ? 'Add Employee' : 'Edit Employee'}
				visible={props.isShown}
				onCancel={onCancel}
				footer={null}>
				<Form
					onFinish={onFinish}
					labelCol={{
						span: 4,
					}}
					wrapperCol={{
						span: 20,
					}}
					form={form}
				>
					<Form.Item label='Id' name='id' rules={[{ required: true, message: 'ID required!' }]}>
						<Input value={props.selected.id} disabled={!props.isAdd}/>
					</Form.Item>
					<Form.Item label='Name' name='name'>
						<Input value={props.selected.name}/>
					</Form.Item>
					<Form.Item label='Surname' name='surname'>
						<Input value={props.selected.surname}/>
					</Form.Item>
					<Form.Item label='Phone' name='phone'>
						<Input value={props.selected.phone}/>
					</Form.Item>
					<Form.Item label='Address' name='address'>
						<Input value={props.selected.address}/>
					</Form.Item>
					<Form.Item label='Title' name='title'>
						<Input value={props.selected.title}/>
					</Form.Item>
					<Form.Item wrapperCol={{ span: 12, offset: 6 }}>
						<Button style={{ marginLeft: '30px' }} type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</Fragment>
	)
	// }
}

export default withRouter(FormModule)
