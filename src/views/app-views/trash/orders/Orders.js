/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import { PageHeader, Card, Table, Select, Input, Button, Badge, Popconfirm,Tag } from 'antd';
import OrderListData from "assets/data/order-list.data.json"
import { FileExcelOutlined, SearchOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment';
import utils from 'utils'

import { useDispatch, useSelector } from "react-redux";
import { getOrder,addOrder } from 'redux/actions/Order';


const { Option } = Select

const Orders = () => {
	const dispatch = useDispatch();

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleShowStatus = value => {
		if (value !== 'All') {
			const key = 'orderStateName'
			const data = utils.filterArray(orderData, key, value)
			setList(data)
		} else {
			setList(orderData)
		}
	}

	const FinishRow = row => {
		if (selectedRows.length > 1) {
			let data={isFinish:1,orderId:[]}
			selectedRows.forEach(elm => {
				data['orderId'].push(elm.orderId)
				// dispatch(addItem(data));
				setSelectedRows([])
			})
			dispatch(addOrder(data));
		} else {
			let data={isFinish:1,orderId:[row.orderId]};
			dispatch(addOrder(data));
		}
	}

	const expandedRowRender = (record) => {
		console.log("11111",record);
		const columns = [
		  { title: 'itemName', dataIndex: 'itemName', key: 'itemName' },
		  { title: 'itemPrice', dataIndex: 'itemPrice', key: 'itemPrice' },
		  { title: 'itemQuantity', dataIndex: 'itemQuantity', key: 'itemQuantity' },
		  {
			title: '选项',
			key: 'itemSelection',
			dataIndex: 'itemSelection',
			render: itemSelection => (
				<span>
					{
					itemSelection != null &&
					itemSelection.map(selection => {
						// let color = tag.length > 5 ? 'geekblue' : 'green';
						let color = 'geekblue';
						return (
							<Tag color={color} key={selection}>
								{/* {tag.toUpperCase()} */}
								{selection['optionName']} * {selection['quantity']}
							</Tag>
						);
					})}
				</span>
			),
		},
		];
		return <Table columns={columns} rowKey='itemId' dataSource={record.itemList} pagination={false} />;
	};

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'orderId'
		},
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
			title: '桌号',
			dataIndex: 'spotName',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'spotName')
		},
		// {
		// 	title: '菜品',
		// 	dataIndex: 'itemName',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'itemName')
		// },
		// {
		// 	title: 'Product',
		// 	dataIndex: 'itemName',
		// 	render: (_, record) => (
		// 		<div className="d-flex">
		// 			<AvatarStatus size={30} src={record.image} name={record.name} />
		// 		</div>
		// 	),
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		// },
		{
			title: '菜品价格',
			dataIndex: 'itemPrice',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<NumberFormat
						displayType={'text'}
						value={record.itemPrice}
						prefix={'$'}
						thousandSeparator={true}
					/>
				</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'itemPrice')
		},
		{
			title: '税',
			dataIndex: 'orderTax',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<NumberFormat
						displayType={'text'}
						value={record.orderTax}
						prefix={'$'}
						thousandSeparator={true}
					/>
				</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'orderTax')
		},
		{
			title: '总价格',
			dataIndex: 'totalPrice',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<NumberFormat
						displayType={'text'}
						value={record.totalPrice}
						prefix={'$'}
						thousandSeparator={true}
					/>
				</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'totalPrice')
		},
		{
			title: '支付方式',
			dataIndex: 'paymentType',
			render: (_, record) => (
				<><Badge /><span>{record.paymentType}</span></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentType')
		},
		{
			title: '订单状态',
			dataIndex: 'orderStateName',
			render: (_, record) => (
				<><Badge /><span>{record.orderStateName}</span></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'orderStateName')
		},
		{
			title: '订单类型',
			dataIndex: 'orderType',
			render: (_, record) => (
				<><Badge /><span>{record.orderType}</span></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'orderType')
		},
		{
			title: '订单备注',
			dataIndex: 'orderComment',
			render: (_, record) => (
				<><Badge /><span>{record.orderComment}</span></>
			),
		},
		{
			title: '下单时间',
			dataIndex: 'createTime',
			render: (_, record) => (
				<><Badge /><span>{record.createTime}</span></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'createTime')
		},
		{
			title: 'actions',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<Popconfirm title="确认完成?" onConfirm={() => FinishRow(elm)}  okText="是" cancelText="否">
						<Button type="primary">
							<span className="ml-2">{selectedRows.length > 0 ? `设为已完成 (${selectedRows.length})` : '设为已完成'}</span>
						</Button>
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
		const searchArray = orderData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	//获取订单信息
	const storeId = localStorage.getItem("storeId");
	const orderData = useSelector(state => state.orderData.data);
	//获取订单
	useEffect(() => {
		if (orderData == null) {
			let data = { isGet: 1, storeId:storeId };
			dispatch(getOrder(data));
		}else if(orderData != null){
			setList(orderData);
		}
	}, [dispatch, orderData])
	const [list, setList] = useState(orderData)

	if (orderData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="订单列表"
			/>
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
						</div>
						<div className="mb-3">
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
						</div>
					</Flex>
					<div>
						{/* <Button type="primary" icon={<FileExcelOutlined />} block>Export All</Button> */}
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={list}
						rowKey='orderId'
						expandable = {{expandedRowRender}}
						rowSelection={{
							selectedRowKeys: selectedRowKeys,
							type: 'checkbox',
							preserveSelectedRowKeys: false,
							...rowSelection,
						}}
						
					/>
				</div>
			</Card>
		</>
	)
}

export default Orders;
