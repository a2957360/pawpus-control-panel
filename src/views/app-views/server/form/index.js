import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleServer,addServer } from 'redux/actions/Server';

import ServiceList from '../../service/List'
import PetList from '../../pet/List'
import Calendar from '../../calendar/index'
import Review from '../../review/List'
import Order from '../../serviceOrder/List'


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
	const [userImg, setuserImg] = useState('');

	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	//修改的产品id
	let [editId,seteditId] = React.useState(0);


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

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					message.success(`添加 成功`);
					//0是photography 1是partner
					values['type'] = 1;
					values['userImage'] = userImg;
					console.log(values);
					dispatch(addServer(values));
					history.goBack()
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['userImage'] = userImg;
					values['userId'] = editId;
					console.log(values);
					dispatch(addServer(values));
					history.goBack()
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	//获取产品信息
	const serverSingleData = useSelector(state => state.serverData.singleData);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && serverSingleData != null) {
			const id = param.params
			//1 是partner数据
			const item = serverSingleData;
			form.setFieldsValue({
				userName: item.userName,
				userPhone: item.userPhone,
				userEmail: item.userEmail,
				userState: item.userState,
				serverLevel: item.serverLevel,
			});
			setuserImg(item.userImage);
			seteditId(id);
		}
	}, [form, mode, param, props, serverSingleData]);

	//获取产品
	useEffect(() => {
		let data = { isGetSingle: 1,userId:param.params};
		dispatch(getSingleServer(data));
	}, [dispatch , param])
	
	if (serverSingleData == null) {
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
							<h2 className="mb-3">{mode === 'ADD' ? '服务者信息' : `Edit Partner blog`} </h2>
							<div className="mb-3">
								{/* <Button className="mr-2">Discard</Button> */}
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' ? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
						<TabPane tab="信息" key="1">
							<GeneralField
								setuserImg={setuserImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								userImg={userImg}
							/>
						</TabPane>
						<TabPane tab="服务" key="2">
							<ServiceList userId={serverSingleData.userId}></ServiceList>
						</TabPane>
						<TabPane tab="宠物" key="3">
							<PetList userId={serverSingleData.userId}></PetList>
						</TabPane>
						{/* <TabPane tab="日历" key="4">
							<Calendar ></Calendar>
						</TabPane> */}
						<TabPane tab="评论" key="4">
							<Review userId={serverSingleData.userId} targetType={0}></Review>
						</TabPane>
						<TabPane tab="订单" key="5">
							<Order serverId={serverSingleData.userId}></Order>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}
