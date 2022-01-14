/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import { PageHeader, Card, Table, Select, Input, Button, Badge, Popconfirm } from 'antd';
import { FileExcelOutlined, SearchOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment';
import utils from 'utils'

import { useDispatch, useSelector } from "react-redux";
import { addUser, getUser} from 'redux/actions/User';


const { Option } = Select

const Orders = () => {
	const dispatch = useDispatch();

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])


	const FinishRow = row => {
		const userBlock = row.userBlock == 0?1:0;
		let data={isChangeState:1,userId:row.userId,userBlock:userBlock};
		dispatch(addUser(data));
	}

	const deleteRow = row => {
		let data={isDelete:1,userId:[row.userId]};
		dispatch(addUser(data));
	}

	const expandedRowRender = (record) => {
		const columns = [
		  { title: 'itemName', dataIndex: 'itemName', key: 'itemName' },
		  { title: 'itemPrice', dataIndex: 'itemPrice', key: 'itemPrice' },
		  { title: 'itemPrice', dataIndex: 'itemPrice', key: 'name' },
		];
		// record.map(item=>(

		// ))
		// const data = [];
		// for (let i = 0; i < 3; ++i) {
		//   data.push({
		// 	key: i,
		// 	date: '2014-12-24 23:12:00',
		// 	name: 'This is production name',
		// 	upgradeNum: 'Upgraded: 56',
		//   });
		// }
		return <Table columns={columns} dataSource={record.itemList} pagination={false} />;
	};

	const tableColumns = [
		{
			title: '用户',
			dataIndex: 'userName',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userName')
		},
		{
			title: '用户电话',
			dataIndex: 'userPhone',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userPhone')
		},
		{
			title: '用户邮箱',
			dataIndex: 'userEmail',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userEmail')
		},		
		{
			title: '服务总消费',
			dataIndex: 'serviceTotal',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'serviceTotal')
		},		
		{
			title: '产品总消费',
			dataIndex: 'itemTotal',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'itemTotal')
		},
		{
			title: '角色',
			dataIndex: 'userStateText',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userStateText')
		},
		{
			title: '状态',
			dataIndex: 'userBlockText',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userBlockText')
		},
		{
			title: 'actions',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-left">
						<Popconfirm title="确认完成?" onConfirm={() => FinishRow(elm)}  okText="是" cancelText="否">
							<Button type="primary">
								{elm.userBlock == 0 &&
								<span className="">黑名单</span>
									||
								<span className="">解封</span>
								}
							</Button>
						</Popconfirm>
						<Popconfirm title="确认删除?" onConfirm={() => deleteRow(elm)} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm>
				</div>
			)
		}
	];

	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		// const searchArray = e.currentTarget.value ? list : OrderListData
		const searchArray = userData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	//获取订单信息
	const storeId = localStorage.getItem("storeId");
	const userData = useSelector(state => state.userData.data);
	//获取订单
	useEffect(() => {
		if (userData == null) {
			let data = { isGet: 1, storeId };
			dispatch(getUser(data));
		}else if(userData != null){
			setList(userData);
		}
	}, [dispatch, userData])
	const [list, setList] = useState(userData)

	if (userData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="客户列表"
			/>
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
						</div>
						{/* <div className="mb-3">
							<Select
								defaultValue="All"
								className="w-100"
								style={{ minWidth: 180 }}
								onChange={handleShowStatus}
								placeholder="Status"
							>
								<Option value="All">所有</Option>
								<Option value="未处理">未处理</Option>
								<Option value="已处理">已处理</Option>
							</Select>
						</div> */}
					</Flex>
					{/* <div>
						<Button type="primary" icon={<FileExcelOutlined />} block>Export All</Button>
					</div> */}
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={list}
						rowKey='userId'
						// rowSelection={{
						// 	selectedRowKeys: selectedRowKeys,
						// 	type: 'checkbox',
						// 	preserveSelectedRowKeys: false,
						// 	...rowSelection,
						// }}
						
					/>
				</div>
			</Card>
		</>
	)
}

export default Orders;
