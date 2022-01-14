import React, { useState, useEffect } from 'react'
import { Select, Form, Button, message, PageHeader, Card, Row, Col, Input, Modal } from 'antd';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Mediapop from '../../media/Mediapop'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, getAdmin } from 'redux/actions/admin';

const ADD = 'ADD'
const EDIT = 'EDIT'

export default function FoodForm(props) {
	const { Option } = Select;
	const { TextArea } = Input;

	let history = useHistory();
	const dispatch = useDispatch();

	const { mode = ADD, param } = props

	const [form] = Form.useForm();

	const [submitLoading, setSubmitLoading] = useState(false)
	//修改的产品id
	let [editId, seteditId] = React.useState(0);

	//媒体库
	let [imagePop, setImagePop] = React.useState(false);

	const [storeLogo, setstoreLogo] = useState("");
	const [storeBg, setstoreBg] = useState("");
	const [storeDefaultImage, setstoreDefaultImage] = useState("");
	const [imageName, setimageName] = useState("");

	const setImage = (url) => {
		if (imageName == "logo") {
			setstoreLogo(url);
			setImagePop(false)
		} else if (imageName == "bg") {
			setstoreBg(url);
			setImagePop(false)
		} else if (imageName == "default") {
			setstoreDefaultImage(url);
			setImagePop(false)
		}
	}

	const selectpopop = (name) => {
		setimageName(name);
		setImagePop(true)
	}

	const testimage = (url) => {
		console.log(url);
	}

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					message.success(`添加 成功`);
					dispatch(addAdmin(values));
					history.push(`/app/admin`)
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['adminId'] = param.params;
					dispatch(addAdmin(values));
					history.push(`/app/admin`)
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	//获取产品信息
	const adminData = useSelector(state => state.adminData.data);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && adminData != null) {
			const adminId = param.params
			const showstoreData = adminData.filter(store => store.adminId === adminId)
			const store = showstoreData[0]
			console.log(store);
			form.setFieldsValue({
				adminName: store.adminName,
				adminType: store.adminType,
			});
			seteditId(adminId);
		}else{
			form.setFieldsValue({
				adminType: 0,
			});
		}
	}, [form, mode, param, props, adminData]);

	useEffect(() => {
		if (adminData == null) {
			let data = { isGet: 1 };
			dispatch(getAdmin(data));
		}
	}, [dispatch, adminData])

	// if (categoryData == null && attributeData == null) {
	// 	return "loading";
	// }
	// if ((storeData == null || attributeData.length === 0) && mode === EDIT) {
	// 	return "loading";
	// }

	return (
		<>
			<PageHeader
				title="门店信息"
			/>
			<Card>
				<div className="mt-4">
					<Form
						name="basicInformation"
						layout="vertical"
						form={form}
						onFinish={onFinish}
					// onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={24}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="登陆用户名"
											name="adminName"
											rules={[
												{
													required: true,
													message: '请输入登陆用户名!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="登陆密码"
											name="adminPassword"
											rules={[
												{
													required: true,
													message: '请输入登陆密码!'
												},
											]}
										>
											<Input.Password />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="角色"
											name="adminType"
											rules={[
												{
													required: true,
												},
											]}
										>
											<Select style={{ width: 200 }}>
												<Option value="0">商家管理员</Option>
												<Option value="1">全站管理员</Option>
											</Select>
										</Form.Item>
									</Col>
								</Row>
								<Button type="primary" htmlType="submit">
									Save Change
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</Card>
			<Modal width="80%" visible={imagePop} footer={null} onCancel={() => setImagePop(false)}>
				<Mediapop setImage={setImage}></Mediapop>
			</Modal>
		</>
	)
}
