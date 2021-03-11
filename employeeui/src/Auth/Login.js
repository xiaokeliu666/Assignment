import React from 'react';
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginApi } from "../services/auth";
import './Login.css';
import md5 from 'salted-md5'
function Login(props) {
    const onFinish = (values) => {
        values.password = md5(values.password,"admin")
        loginApi(values)
            .then(response => {
                if (response['status']) {
                    localStorage.setItem("token",response['token'])
                    message.success("Welcome!")
                    // setTimeout(props.history.push("/index"),1000)
                    props.history.push("/index");
                } else {
                    console.log(JSON.stringify(values))
                    message.info(response['msg'])
                }
            })
            .catch(err => {
                console.error(err)
            })
    };
    return (
        <div className="App">
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
