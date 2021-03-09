import React, {useState, useEffect, Fragment} from 'react'
import { findByInfoApi, listApi } from "../../services/employee";
import { Table, Button, message, Space, Modal } from "antd";
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { delApi } from "../../services/employee";
import FormModule from '../Form/FormModule'

function TableModule(props) {
    // Data Display
    // const [curPage, setCurPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [data, setData] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)

    const [selected, setSelected] = useState({})
    const [isShown, setIsShown] = useState(false)

    // Delete a Employee
    const showConfirm = (record) => {
    	Modal.confirm({
    		title: 'Confirm',
    		icon: <ExclamationCircleOutlined />,
    		content: 'Are you sure to delete this employee ?',
    		okText: 'Delete',
    		cancelText: 'Cancel',
    		onOk() {
    			removeEmployeeHandler(record.id)
    		},
    	})
    }
    const removeEmployeeHandler = (id) => {
    	delApi(id)
    		.then((response) => {
    			message.success(id+" deleted")
    			fetchData()
    		})
    }
    const showModal = () => {
        setIsShown(true)
    }
    // For table building
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            // key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            // key: 'surname',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            // key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            // key: 'address',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            // key: 'title',
        },
        {
            title: 'Action',
            // key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <Button
                        type='text'
                        icon={<EditFilled/>}
                        onClick={
                            () => {
                                setSelected(record)
                                showModal()
                            }
                        }
                    >
                        Update
                    </Button>
                    <Button
                        type='text'
                        icon={<DeleteFilled/>}
                        onClick={() => showConfirm(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]
    // Dependency of useEffect()
    const [flag, setFlag] = useState(false);
    console.log(props.info)
    // Fetch data from the server
    const fetchData = () => {
        if (props.info !== '' || props.title !== '') {
            console.log("findByInfo")
            console.log(props.info)
            console.log(props.title)
            // Fetch the result of search
            let condition = {info: props.info, title: props.title}
            console.log(JSON.stringify(condition))
            findByInfoApi(props.curPage, pageSize, condition)
                .then((response) => {
                    setData(response['data']['content'])
                    setTotalAmount((response['data']['totalElements']))
                })
        } else {
            console.log("listApi")
            // Fetch all the employees
            listApi(props.curPage, pageSize)
                .then((response) => {
                    setData(response['data']['content'])
                    setTotalAmount(response['data']['totalElements'])
                })
                .catch((err) => {
                    message.error("Please Login")
                    setTimeout((() => props.history.push("/")), 2000)
                })
        }
    }
    useEffect(fetchData,[props,props.curPage])
    // Turn page
    const changePage = (value) => {
        props.setCurPage(value)
        setFlag(!flag)
    }

    return (
        <Fragment>
            <Table
                style={{width: '80%', margin: '0 auto'}}
                rowKey='id'
                columns={columns}
                dataSource={data}
                pagination={{
                    total: totalAmount,
                    pageSize: 5,
                    onChange: changePage
                }}
            />
            <FormModule
                isShown={isShown}
                setIsShown={setIsShown}
                isAdd={false}
                selected={selected}
                setFlag={setFlag}
            />
        </Fragment>

    )
}

export default TableModule;
