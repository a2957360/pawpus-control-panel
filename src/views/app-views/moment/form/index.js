import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { Tabs, Form, Table, message, Popconfirm,Input } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { SearchOutlined } from '@ant-design/icons';
import utils from 'utils'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMoment, getSingleMoment } from 'redux/actions/moment';

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

export default function FoodForm(props) {
	const storeId = localStorage.getItem("storeId");
	let history = useHistory();
	const dispatch = useDispatch();

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [iconImg, seticonImg] = useState([]);
	const [coverImg, setcoverImg] = useState([]);

	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	//修改的产品id
	let [editId, seteditId] = React.useState(0);

	const tableColumns = [

		{
			title: '内容',
			width: '50%',
			dataIndex: 'replyContent',
		},
		{
			title: '发布者',
			dataIndex: 'userName',
		},
		{
			title: '发布者头像',
			dataIndex: 'userImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={100} type="square" src={record.userImage} />
				</div>
			),
		},
		{
			title: '@用户名称',
			dataIndex: 'atUserName',
		},
		{
			title: '@用户头像',
			dataIndex: 'atUserImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={100} type="square" src={record.atUserImage} />
				</div>
			),
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (text, record) =>
				momentData.replylist.length >= 1 ? (
					<>
						<Popconfirm title="确认删除?" onConfirm={() => deleteReply({ replyId: record.replyId, isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm>
					</>
				) : null,
		}
	];
	const deleteReply = row => {
		let data = row;
		console.log(data);
		dispatch(addMoment(data));
	}

	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl => {
				// setImage(imageUrl)
				setUploadLoading(true)
			});
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		// const searchArray = e.currentTarget.value ? list : homePageData
		const searchArray = momentData.replylist
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					message.success(`添加 成功`);
					//0是photography 1是partner
					values.momentContent = values.momentContent.toHTML()
					dispatch(addMoment(values));
					history.push(`/app/moment`)
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['momentId'] = editId;
					values.momentContent = values.momentContent.toHTML()
					dispatch(addMoment(values));
					history.push(`/app/moment`)
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	//获取产品信息
	const momentData = useSelector(state => state.momentData.singleData);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && momentData != null) {
			const id = param.params
			const item = momentData
			form.setFieldsValue({
				momentTitle: item.momentTitle,
				momentContent: item.momentContent,
			});
			setcoverImg(item.momentImage);
			seteditId(id);
		}
	}, [form, mode, param, props, momentData]);

	//获取产品
	useEffect(() => {
		if (mode === EDIT) {
			let data = { isGetSingle: 1, momentId: param.params };
			dispatch(getSingleMoment(data));
		}
	}, [dispatch])

	useEffect(() => {
		if (momentData == null) {
			let data = { isGetSingle: 1, momentId: param.params };
			dispatch(getSingleMoment(data));
		}else{
			setList(momentData.replylist);
		}
	}, [momentData])

	const [list, setList] = useState([]);

	if (momentData == null) {
		return "loading";
	}

	return (
		<>
			<Form
				layout="vertical"
				form={form}
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
						<TabPane tab="朋友圈" key="1">
							<GeneralField
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								coverImg={coverImg}
							/>
						</TabPane>
						<TabPane tab="回复" key="2">
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
								columns={tableColumns}
								dataSource={list}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}
