import React, { useEffect } from 'react';
import { PageHeader, Card, Button, Row,Col, Modal, Table,Statistic } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';

import { useDispatch, useSelector } from "react-redux";
import { getServiceOrderStatistic } from 'redux/actions/serviceOrder';

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
			title: '图片',
			dataIndex: 'serviceImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={200} type="square" src={record.serviceImage[0]} />
				</div>
			),
		},
		{
			title: '服务名字',
			dataIndex: 'serviceName',
		}, {
			title: '服务提供者名字',
			dataIndex: 'userName',
			editable: true,
		}, {
			title: '服务分类',
			dataIndex: ['categoryName','zh'],
			editable: true,
		}, {
			title: '总价',
			dataIndex: 'totalPrice',
			editable: true,
		},
		//  {
		// 	title: '配送费',
		// 	dataIndex: 'deliverPrice',
		// 	editable: true,
		// }, {
		// 	title: '折扣',
		// 	dataIndex: 'coupon',
		// 	editable: true,
		// }, {
		// 	title: '总价',
		// 	dataIndex: 'total',
		// 	editable: true,
		// }, {
		// 	title: '状态',
		// 	dataIndex: 'orderState',
		// 	editable: true,
		// },
		// {
		// 	title: 'operation',
		// 	dataIndex: 'operation',
		// 	render: (text, record) =>
		// 		serviceOrderData.serviceList.length >= 1 ? (
		// 			<>
		// 				<Button onClick={() => openPop({ itemInfo: record, mode: "EDIT" })}>查看</Button>
		// 			</>
		// 		) : null,
		// }
	]

	//获取数据统计信息
	const serviceOrderData = useSelector(state => state.serviceOrderData.statisticData);
	//获取数据统计
	useEffect(() => {
		let data = { isGetStatistic: 1, startDate: startDate, endDate: endDate };
		dispatch(getServiceOrderStatistic(data));
	}, [dispatch,startDate,endDate])
	if (serviceOrderData == null) {
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
							value={serviceOrderData.totalPrice}
							precision={2}
							prefix="$"
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<Statistic
							title="订单数量"
							value={serviceOrderData.orderNumber}
						/>
					</Card>
				</Col>
			</Row>
			<Card title="服务销量表">
				<Table
					columns={orderColumns}
					dataSource={serviceOrderData.serviceList}
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