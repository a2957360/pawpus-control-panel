import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { Tabs, Form, Table, message, Popconfirm,Input } from 'antd';
import Flex from 'components/shared-components/Flex'
import { SearchOutlined } from '@ant-design/icons';
import utils from 'utils'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMoment,getMomentReport } from 'redux/actions/moment';

const { TabPane } = Tabs;


export default function FoodForm(props) {
	let history = useHistory();
	const dispatch = useDispatch();

	const tableColumns = [

		{
			title: '内容',
			width: '50%',
			dataIndex: 'replyContent',
		},
		// {
		// 	title: '发布者',
		// 	dataIndex: 'userName',
		// },
		// {
		// 	title: '发布者头像',
		// 	dataIndex: 'userImage',
		// 	render: (_, record) => (
		// 		<div className="d-flex">
		// 			<AvatarStatus size={100} type="square" src={record.userImage} />
		// 		</div>
		// 	),
		// },
		{
			title: '举报原因',
			dataIndex: 'reportContent',
		},
		{
			title: '举报用户名称',
			dataIndex: 'reportName',
		},
		{
			title: '举报用户头像',
			dataIndex: 'reportImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={100} type="square" src={record.reportImage} />
				</div>
			),
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (text, record) =>
			reportData.reply.length >= 1 ? (
					<>
						<Popconfirm title="确认删除?" onConfirm={() => deleteReply({ replyId: record.replyId, isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm>
					</>
				) : null,
		}
	];

	const momentColumns = [
		{
			title: '标题',
			dataIndex: 'momentTitle',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'momentTitle')
		},
		{
			title: '图片',
			dataIndex: 'momentImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={200} type="square" src={record.momentImage[0]} />
				</div>
			),
		},
		{
			title: '内容',
			dataIndex: 'momentContent',
		},
		// {
		// 	title: '发布者',
		// 	dataIndex: 'userName',
		// },
		// {
		// 	title: '发布者头像',
		// 	dataIndex: 'userImage',
		// 	render: (_, record) => (
		// 		<div className="d-flex">
		// 			<AvatarStatus size={100} type="square" src={record.userImage} />
		// 		</div>
		// 	),
		// },
		{
			title: '举报原因',
			dataIndex: 'reportContent',
		},
		{
			title: '举报用户名称',
			dataIndex: 'reportName',
		},
		{
			title: '举报用户头像',
			dataIndex: 'reportImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={100} type="square" src={record.reportImage} />
				</div>
			),
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (text, record) =>
			reportData.moment.length >= 1 ? (
					<>
						<Popconfirm title="确认删除?" onConfirm={() => deleteMoment({ momentId: record.momentId, isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm>
					</>
				) : null,
		}
	];
	const deleteReply = row => {
		let data = row;
		dispatch(addMoment(data));
	}
	const deleteMoment = row => {
		let data = row;
		dispatch(addMoment(data));
	}


	// const onSearch = e => {
	// 	const value = e.currentTarget.value
	// 	// const searchArray = e.currentTarget.value ? list : homePageData
	// 	const searchArray = momentData.replylist
	// 	const data = utils.wildCardSearch(searchArray, value)
	// 	setList(data)
	// }


	//获取产品信息
	const reportData = useSelector(state => state.momentData.reportData);
	//编辑时设定值
	useEffect(() => {
		let data = { isGetReport: 1};
		dispatch(getMomentReport(data));
	}, [dispatch])

	useEffect(() => {
		if(reportData == null){
			let data = { isGetReport: 1};
			dispatch(getMomentReport(data));
		}
	}, [reportData])

	if (reportData == null) {
		return "loading";
	}

	return (
		<>
			<Form
				layout="vertical"
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="bg-white border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">朋友圈 </h2>
							<div className="mb-3">
								{/* <Button className="mr-2">Discard</Button> */}
								{/* <Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' ? 'Add' : `Save`}
								</Button> */}
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
						<TabPane tab="朋友圈举报" key="1">
							<Table
								columns={momentColumns}
								dataSource={reportData.moment}
							/>
						</TabPane>
						<TabPane tab="回复举报" key="2">
							{/* <Flex alignhomePages="center" justifyContent="between" mobileFlex={false}>
								<Flex className="mb-1" mobileFlex={false}>
									<div className="mr-md-3 mb-3">
										<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
									</div>
									<div className="mb-3">
									</div>
								</Flex>
							</Flex> */}
							<Table
								columns={tableColumns}
								dataSource={reportData.reply}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}
