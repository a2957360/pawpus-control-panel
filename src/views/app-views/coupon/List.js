import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Card, Button, Popconfirm, Modal, Select } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { addCoupon, getCoupon } from 'redux/actions/coupon';

import DisplayTable from "./form/table"
import CouponPanel from "./form"


export default function Specification(props) {
	const { Option } = Select;
	let history = useHistory();
	const dispatch = useDispatch();

	const { couponType, couponLevel } = props;

	//popup
	let [couponPop, setcouponPop] = React.useState(false);
	let [couponInfo, setcouponInfo] = React.useState(0);
	let [mode, setmode] = React.useState("ADD");


	//打开pop
	const openPop = (info) => {
		setcouponPop(true)
		setcouponInfo(info.couponInfo);
		setmode(info.mode);
	}

	const handleApi = (info) => {
		let data = info;
		dispatch(addCoupon(data));
	}
	let columns = [
		{
			title: 'Id',
			dataIndex: 'couponId',
		},
		{
			title: '可用于',
			dataIndex: 'couponTypeText',
		},
		{
			title: '类型',
			dataIndex: 'discountTypeText',
			editable: true,
		},
		{
			title: 'Code',
			dataIndex: 'couponCode',
		},
		{
			title: '满',
			dataIndex: 'couponrequirePrice',
			editable: true,
		},
		{
			title: '减',
			dataIndex: 'couponValue',
			editable: true,
		},
		{
			title: '可用次数',
			dataIndex: 'avaiableTimes',
			editable: true,
		},
		{
			title: '过期日期',
			dataIndex: 'expireDate',
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record) =>
				couponData.length >= 1 ? (
					<>
						<Button onClick={() => openPop({ couponInfo: record, mode: "EDIT" })}>修改</Button>
						<Popconfirm title="确认删除?" onConfirm={() => handleApi({ couponId: [record.couponId], isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm>
					</>
				) : null,
		}];

	//获取分类信息
	const couponData = useSelector(state => state.couponData.data);
	//获取分类
	useEffect(() => {
		if (couponData == null) {
			let data = { isGet: 1};
			dispatch(getCoupon(data));
		}
	}, [dispatch, couponData])

	if (couponData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="分类管理"
			/>
			<Card>
				<Button
					onClick={() => openPop({ couponId: 0, mode: "ADD" })}
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					添加新优惠券
		  		</Button>
				<DisplayTable columns={columns} 
				dataSource={couponData} 
				handleApi={handleApi} />
			</Card>
			<Modal width="80%" visible={couponPop} footer={null} onCancel={() => setcouponPop(false)}>
				<CouponPanel
					couponInfo={couponInfo} 
					mode={mode}
					closePop={()=>setcouponPop(false)}
					>
				</CouponPanel>
			</Modal>
		</>
	)
}