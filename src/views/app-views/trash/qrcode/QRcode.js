import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Card, Popconfirm} from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { addSpot, getSpot } from 'redux/actions/spot';

import DisplayTable from "./form/table"


export default function Specification() {
	const dispatch = useDispatch();

	const storeId = localStorage.getItem("storeId");

	const handleApi = (info) =>{
		let data = info;
		dispatch(addSpot(data));
	}
	let columns = [
		{
			title: '名称',
			dataIndex: 'spotName',
			width: '30%',
			editable: true,
		},
		{
			title: 'Qrcode',
			dataIndex: 'spotQrcode',
			render: (text, record) =>
			spotData.length >= 1 ? (
				<img className="qrcode_img" src={record.spotQrcode}></img>
				) : null,
		},
		{
			title: 'Url',
			dataIndex: 'spotUrl',
			width: '30%',
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record) =>
			spotData.length >= 1 ? (
					<Popconfirm title="Sure to delete?" onConfirm={() => handleApi({spotId:[record.spotId],isDelete:1})}>
						<a>Delete</a>
					</Popconfirm>
				) : null,
		},
	];
	//获取分类信息
	const spotData = useSelector(state => state.spotData.data);
	//获取分类
	useEffect(() => {
		if (spotData == null) {
			let data = { isGet: 1, storeId:storeId };
			dispatch(getSpot(data));
		}
	}, [dispatch, spotData])

	if (spotData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="桌子管理"
			/>
			{/* <QrImage></QrImage> */}
			<Card>
				<DisplayTable columns={columns} dataSource={spotData} handleApi={handleApi} />
			</Card>
		</>
	)
}