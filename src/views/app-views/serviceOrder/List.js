import React, { useState,useEffect } from 'react';
import { PageHeader, Card, Button,Input, Popconfirm, Modal, Table } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getServiceOrder } from 'redux/actions/serviceOrder';
import Flex from 'components/shared-components/Flex'

import CategoryPanel from "./form"
import utils from 'utils'


export default function 	Specification(props) {
	const dispatch = useDispatch();

	const { userId,serverId,orderState } = props;

	//popup
	let [categoryPop, setcategoryPop] = React.useState(false);
	let [orderInfo, setorderInfo] = React.useState([]);
	let [mode, setmode] = React.useState("ADD");

	//打开pop
	const openPop = (info) => {
		setcategoryPop(true)
		setorderInfo(info.itemInfo);
		setmode(info.mode);
	}

	const handleApi = (info) => {
		let data = info;
		// dispatch(addItemOption(data));
	}

	const handleUp = (data) => {
		console.log(data);
		data['isChangeOrder'] = '1';
		data['movement'] = 'up';
		// dispatch(addItemOption(data));
	}
	const handleDown = (data) => {
		data['isChangeOrder'] = '1';
		data['movement'] = 'down';
		// dispatch(addItemOption(data));
	}
	let columns = [
		{
			title: '订单No',
			dataIndex: 'serviceOrderNo',
			editable: true,
		},{
			title: '客户',
			dataIndex: 'userName',
			editable: true,
		},{
			title: '服务者',
			dataIndex: 'serverName',
			editable: true,
		},{
			title: '服务分类',
			dataIndex: ['categoryName','zh'],
			editable: true,
		},{
			title: '寄样数量',
			dataIndex: 'servicePetNumber',
			editable: true,
		},{
			title: '开始日期',
			dataIndex: 'orderStartDate',
			editable: true,
		},{
			title: '结束日期',
			dataIndex: 'orderEndDate',
			editable: true,
		},{
			title: '总价',
			dataIndex: 'serviceOrderTotalPrice',
			editable: true,
		},{
			title: '状态',
			dataIndex: 'orderState',
			editable: true,
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record) =>
			serviceOrderData.length >= 1 ? (
					<>
						<Button onClick={() => openPop({ itemInfo: record, mode: "EDIT" })}>查看</Button>
						{/* <Popconfirm title="确认上移?" onConfirm={() => handleUp(record)} okText="是" cancelText="否">
							<Button>上移</Button>
						</Popconfirm>
						<Popconfirm title="确认下移?" onConfirm={() => handleDown(record)} okText="是" cancelText="否">
							<Button>下移</Button>
						</Popconfirm>
						<Popconfirm title="确认删除?" onConfirm={() => handleApi({ categoryId: [record.categoryId], isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm> */}
					</>
				) : null,
		}
	]

	const onSearch = e => {
		const value = e.currentTarget.value
		// const searchArray = e.currentTarget.value ? list : homePageData
		const searchArray = serviceOrderData
		console.log(searchArray);
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	//获取订单信息
	const serviceOrderData = useSelector(state => state.serviceOrderData.data);
	//获取订单
	useEffect(() => {
		if (serviceOrderData == null) {
			let data = { isGet: 1, userId:userId,serverId:serverId,orderState:orderState};
			dispatch(getServiceOrder(data));
		}else if(serviceOrderData != null){
			setList(serviceOrderData);
		}
	}, [serviceOrderData])

	useEffect(() => {
			let data = { isGet: 1, userId:userId,serverId:serverId,orderState:orderState};
			dispatch(getServiceOrder(data));
	}, [dispatch])

	const [list, setList] = useState(serviceOrderData)

	if (serviceOrderData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="订单"
			/>
			<Card>
				<Flex alignhomePages="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
						</div>
						<div className="mb-3">
						</div>
					</Flex>
				</Flex>
				<Table
					columns={columns}
					dataSource={list}
					rowKey='id'
					/>
			</Card>
			<Modal width="80%" visible={categoryPop} footer={null} onCancel={() => setcategoryPop(false)}>
				<CategoryPanel
					orderInfo={orderInfo}
					mode={mode}
					// itemId={itemId}
					closePop={()=>setcategoryPop(false)}
					>
				</CategoryPanel>
			</Modal>
		</>
	)
}