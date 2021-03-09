import React, {Fragment, useState} from 'react'
import {Button, Form, Input} from "antd";
import FormModule from "../Form/FormModule";

function ToolbarModule(props) {
    // Fuzzy Search
    // const [info, setInfo] = useState("")
    // const [title, setTitle] = useState("")
    const [isShown, setIsShown] = useState(false)

    // Reset the search input
    const [form] = Form.useForm()
    const resetHandler = () => {form.resetFields();}



    // Search records by entering personal info or/and title
    const searchHandler = (values) => {
        console.log("searchHandler:" + JSON.stringify(values))
        props.setInfo(values.info === undefined ? '' : values.info)
        props.setTitle(values.title === undefined ? '' : values.title)
        props.setCurPage(1)
        props.setFlag(!props.flag)
    }
    const showModal = () => {
        setIsShown(true)
    }

    return (
        <Fragment>
            <Form form={form} layout='inline' style={{ margin: '0 auto', width:'60%' }} onFinish={searchHandler}>
                <Form.Item label='Personal Info' name='info'>
                    <Input type='text' placeholder='Id, name, phone' style={{ width: '155px' }} />
                </Form.Item>
                <Form.Item label='Title' name='title'>
                    <Input type='text' placeholder='title' style={{ width: '155px' }} />
                </Form.Item>
                <Button type='primary' style={{ marginRight: '3px' }} htmlType='submit'>
                    Find
                </Button>
                <Button onClick={resetHandler}>Reset</Button>
                <div style={{display:'inline-block'}}>
                    <Button
                        type='primary'
                        style={{marginLeft:'10px'}}
                        onClick={()=>showModal()}
                    >
                        Add Employee
                    </Button>

                </div>
            </Form>
            <FormModule
                isShown={isShown}
                setIsShown={setIsShown}
                isAdd={true}
                selected={{}}
            />
        </Fragment>
    )
}
export default ToolbarModule;
