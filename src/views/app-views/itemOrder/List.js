import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { SearchOutlined} from '@ant-design/icons';
import { PageHeader, Card, Button, Input, Popconfirm, Modal, Table } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { getItemOrder, changeItemOrder } from 'redux/actions/itemOrder';
import Flex from 'components/shared-components/Flex'

import DisplayTable from "./form/table"
import CategoryPanel from "./form"
import utils from 'utils'

export default function Specification(props) {
	const dispatch = useDispatch();

	const { userId, serverId, orderState } = props;

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
		dispatch(changeItemOrder(data));
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
			dataIndex: 'orderNo',
			editable: true,
		}, {
			title: '客户',
			dataIndex: 'userName',
			editable: true,
		}, {
			title: '商品价格',
			dataIndex: 'subTotal',
			editable: true,
		}, {
			title: '税价',
			dataIndex: 'tax',
			editable: true,
		}, {
			title: '配送费',
			dataIndex: 'deliverPrice',
			editable: true,
		}, {
			title: '折扣',
			dataIndex: 'coupon',
			editable: true,
		}, {
			title: '总价',
			dataIndex: 'total',
			editable: true,
		}, {
			title: '状态',
			dataIndex: 'orderState',
			editable: true,
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record) =>
				itemOrderData.length >= 1 ? (
					<>
						<Button onClick={() => openPop({ itemInfo: record, mode: "EDIT" })}>查看</Button>
						{/* <Popconfirm title="确认删除?" onConfirm={() => handleApi({ categoryId: [record.categoryId], isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm> */}
					</>
				) : null,
		}]

	const onSearch = e => {
		const value = e.currentTarget.value
		// const searchArray = e.currentTarget.value ? list : homePageData
		const searchArray = itemOrderData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	//获取规格信息
	const itemOrderData = useSelector(state => state.itemOrderData.data);
	//获取规格
	useEffect(() => {
		if (itemOrderData == null) {
			let data = { isGet: 1, userId: userId, serverId: serverId, orderState: orderState };
			dispatch(getItemOrder(data));
		} else if (itemOrderData != null) {
			setList(itemOrderData);
		}
	}, [dispatch, itemOrderData])

	useEffect(() => {
		let data = { isGet: 1, userId: userId, serverId: serverId, orderState: orderState };
		dispatch(getItemOrder(data));
	}, [dispatch])

	const [list, setList] = useState(itemOrderData)

	if (itemOrderData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="订单"
			/>
			<Card>
				{/* <Button
					onClick={() => openPop({ itemOptionId: 0, mode: "ADD" })}
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					添加新规格
		  		</Button> */}
				{/* <DisplayTable 
				columns={columns} 
				dataSource={itemOptionData} 
				handleApi={handleApi} /> */}
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
					closePop={() => setcategoryPop(false)}
				>
				</CategoryPanel>
			</Modal>
		</>
	)
}