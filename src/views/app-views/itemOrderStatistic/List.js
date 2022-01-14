import React, { useEffect } from 'react';
import { PageHeader, Card, Button, Row,Col, Modal, Table,Statistic } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';

import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from 'redux/actions/itemOrder';

import CategoryPanel from "./form"


export default function Specification(props) {
	const dispatch = useDispatch();

	const { startDate, endDate } = props;

	let [categoryPop, setcategoryPop] = React.useState(false);
	let [orderInfo, setorderInfo] = React.useState([]);
	let [mode, setmode] = React.useState("ADD");

	const openPop = (info) => {
		setcategoryPop(true)
		setorderInfo(info.itemInfo);
		setmode(info.mode);
	}

	let orderColumns = [
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
				itemOrderData.list.length >= 1 ? (
					<>
						<Button onClick={() => openPop({ itemInfo: record, mode: "EDIT" })}>查看</Button>
					</>
				) : null,
		}
	]

	const itemColumns = [
		{
			title: 'ID',
			dataIndex: 'itemId',
		},
		{
			title: '名字',
			dataIndex: 'itemTitle',
		},
		{
			title: '图片',
			dataIndex: 'itemImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={200} type="square" src={record.itemImage[0]} />
				</div>
			),
		},
	];

	//获取数据统计信息
	const itemOrderData = useSelector(state => state.itemOrderData.statisticData);
	//获取数据统计
	useEffect(() => {
		let data = { isGetStatistic: 1, startDate: startDate, endDate: endDate };
		dispatch(getStatistic(data));
	}, [dispatch,startDate,endDate])
	if (itemOrderData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
			/>
			<Row gutter={16}>
				<Col span={12}>
					<Card>
						<Statistic
							title="销售额"
							value={itemOrderData.income}
							precision={2}
							prefix="$"
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<Statistic
							title="订单数量"
							value={itemOrderData.orderNumber}
						/>
					</Card>
				</Col>
			</Row>
			<Card title="最近订单表">
				<Table
					columns={orderColumns}
					dataSource={itemOrderData.list}
					rowKey='id'
				/>
			</Card>
			<Card title="商品销量表">
				<Table
					columns={itemColumns}
					dataSource={itemOrderData.itemList}
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