import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Form, Button, Input, Modal, Row, Col, message,Select} from 'antd';
import { ROW_GUTTER } from 'constants/ThemeConstant';

import { useDispatch, useSelector } from "react-redux";
import { addStore, getStore } from 'redux/actions/Store';

import Mediapop from '../media/Mediapop'

export default function StoreProfile() {
	const { Option } = Select;
	const dispatch = useDispatch();
	const { TextArea } = Input;
	const storeId = localStorage.getItem("storeId");
	
	//获取门店信息
	const storeData = useSelector(state => state.storeData.data);

	// const getBase64 = (img, callback) => {
	// 	const reader = new FileReader();
	// 	reader.addEventListener('load', () => callback(reader.result));
	// 	reader.readAsDataURL(img);
	// }

	const onFinish = values => {
		const key = 'updatable';
		message.loading({ content: 'Updating...', key });
		setTimeout(() => {
			values['storeLogo'] = storeLogo;
			values['storeBg'] = storeBg;
			values['storeDefaultImage'] = storeDefaultImage;
			values['storeId'] = storeId;
			console.log(values);
			dispatch(addStore(values));
			message.success({ content: 'Done!', key, duration: 2 });
		}, 1000);
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	// const { storeLogo, storeBg, storeName, storePhone, phoneNumber, website, address, city, postcode, avatarUrl } = state;
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

	const selectpopop = (name)=>{
		setimageName(name);
		setImagePop(true)
	}

	//获取店铺信息
	useEffect(() => {
		if (storeData == null) {
			let data = { isGet: 1, storeId: storeId };
			dispatch(getStore(data));
		}else if(storeData != null){
			setstoreLogo(storeData[0].storeLogo);
			setstoreBg(storeData[0].storeBg);
			setstoreDefaultImage(storeData[0].storeDefaultImage);
		}
	}, [dispatch, storeData,storeId])

	if (storeData == null) {
		return "loading";
	}
	console.log(storeData);
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
						initialValues={
							{
								'storeName': storeData[0].storeName,
								'storePhone': storeData[0].storePhone,
								'storeUserName': storeData[0].storeUserName,
								'storeOperateHour': storeData[0].storeOperateHour,
								'storeAddress': storeData[0].storeAddress,
								'storeComment': storeData[0].storeComment,
								'storePayment': storeData[0].storePayment,
								'storeRequiement': storeData[0].storeRequiement,
							}
						}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={24}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={8}>
										<Card title="店铺Logo">
											<div onClick={() => selectpopop("logo")} className="selectImage">
												{
													storeLogo != null &&
													<img className="display_img" src={storeLogo}></img>
													||
													<p className="ant-upload-text">点击选择图片</p>
												}
											</div>
										</Card>
									</Col>
									<Col xs={24} sm={24} md={8}>
										<Card title="店铺背景图片">
											<div onClick={() => selectpopop("bg")} className="selectImage">
												{
													storeBg != null &&
													<img className="display_img" src={storeBg}></img>
													||
													<p className="ant-upload-text">点击选择图片</p>
												}
											</div>
										</Card>
									</Col>
									<Col xs={24} sm={24} md={8}>
										<Card title="店铺菜品默认图">
											<div onClick={() => selectpopop("default")} className="selectImage">
												{
													storeBg != null &&
													<img className="display_img" src={storeDefaultImage}></img>
													||
													<p className="ant-upload-text">点击选择图片</p>
												}
											</div>
										</Card>
									</Col>
									<Col xs={24} sm={24} md={12}>

										<Form.Item
											label="店铺名字"
											name="storeName"
											rules={[
												{
													required: true,
													message: '请输入店铺名字!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="登陆用户名"
											name="storeUserName"
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
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="电话"
											name="storePhone"
											rules={[
												{
													required: true,
													message: '请输入店铺电话!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="开店时间"
											name="storeOperateHour"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="地址"
											name="storeAddress"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="支付方式"
											name="storePayment"
										>
											<Select
												mode="multiple"
												size="default"
												placeholder="Please select"
												defaultValue={[]}
												style={{ width: '100%' }}
												>
												<Option key="1" value="现金">现金</Option>
												<Option key="2" value="Emt">Emt</Option>
												<Option key="3" value="微信">微信</Option>
												<Option key="4" value="支付宝">支付宝</Option>
												<Option key="5" value="信用卡">信用卡</Option>
												<Option key="6" value="储蓄卡">储蓄卡</Option>
											</Select>
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="描述"
											name="storeComment"
										>
											<TextArea />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="备注"
											name="storeRequiement"
										>
											<TextArea />
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
