import React, { useEffect } from 'react';
import { PageHeader, Card, Button, Popconfirm, Modal, Table } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';


import { useDispatch, useSelector } from "react-redux";
import { addReview,getReview } from 'redux/actions/review';

import CategoryPanel from "./form"


export default function 	Specification(props) {
	const dispatch = useDispatch();

	const { userId,targetType } = props;

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
		dispatch(addReview(data));
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
			title: '商家',
			dataIndex: 'storeName',
			editable: true,
		},{
			title: '商家图片',
			dataIndex: 'storeImage',
			render: (_, record) => (
				<div className="d-flex">
					{
						<AvatarStatus size={100} type="square" src={record.storeImage} />
					}
				</div>
			),
		},{
			title: '评论者',
			dataIndex: 'userName',
			editable: true,
		},{
			title: '评论内容',
			dataIndex: 'reviewContent',
			editable: true,
		},{
			title: '评星',
			dataIndex: 'reviewStar',
			editable: true,
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record) =>
				reviewData.length >= 1 ? (
					<>
						<Popconfirm title="确认删除?" onConfirm={() => handleApi({ reviewId: [record.reviewId], isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm>
					</>
				) : null,
		}]

	//获取规格信息
	const reviewData = useSelector(state => state.reviewData.data);
	//获取规格
	useEffect(() => {
		let data = { isGet: 1, targetId:userId, targetType:targetType};
		dispatch(getReview(data));
	}, [dispatch])

	useEffect(() => {
		if(reviewData == null){
			let data = { isGet: 1, targetId:userId, targetType:targetType};
			dispatch(getReview(data));
		}
	}, [reviewData])

	if (reviewData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="评论"
			/>
			<Card>
				<Table
					columns={columns}
					dataSource={reviewData}
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