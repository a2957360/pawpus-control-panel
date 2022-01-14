import React, { useEffect } from 'react'
import { Input, Row, Col, Card, Form, InputNumber, Select, Modal } from 'antd';

import Mediapop from '../../media/Mediapop'
import VideoPlayer from '../../videoPlayer'

const GeneralField = (props) => {
	const { Option } = Select;

	const rules = {
		title: [
			{
				required: true,
				message: 'not Empty',
			}
		],
	}
	const [imgName, setimgName] = React.useState('');
	const [imagePop, setImagePop] = React.useState(false);

	const categories = props.categoryData
	const attributeData = props.attributeData
	const setImage = (url) => {
		switch (imgName) {
			case "userImg":
				props.setuserImg(url);
				break;
			default:
				break;
		}
		setImagePop(false)
	}

	const openPop = (name) => {
		setimgName(name);
		setImagePop(true)
	}
	useEffect(() => {
		if (props.uploadedImg != null) {
			setImagePop(false);
		}
	}, [props.uploadedImg])

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={17}>
					<Card title="Basic Info">
						<Form.Item name="userState" label="服务者审核状态" >
							<Select className="w-100" placeholder="userState" >
								<Option key={"3"} value={"3"}>服务者待审核</Option>
								<Option key={"4"} value={"4"}>服务者</Option>
								<Option key={"5"} value={"5"}>黑名单</Option>
							</Select>
						</Form.Item>
						<Form.Item name="serverLevel" label="服务者标签" >
							<Select className="w-100" placeholder="serverLevel" >
								<Option key={"0"} value={"0"}>新手</Option>
								<Option key={"1"} value={"1"}>普通</Option>
								<Option key={"2"} value={"2"}>认证</Option>
							</Select>
						</Form.Item>
						<Form.Item name='userName' label="User Name" rules={rules.title}>
							<Input placeholder="userName" />
						</Form.Item>
						<Form.Item name='userPhone' label="User Phone" rules={rules.title}>
							<Input placeholder="userPhone" />
						</Form.Item>						
						<Form.Item name='userEmail' label="User Email" rules={rules.title}>
							<Input placeholder="userEmail" />
						</Form.Item>						
					</Card>
				</Col>
				<Col xs={24} sm={24} md={7}>
					<Card title="头像">
						<div onClick={() => openPop("userImg")} className="selectImage">
							{
								props.userImg == "" &&
								// <img className="display_img" src={props.bannerImg}></img>
								<p className="ant-upload-text">点击选择图片</p>
								||
								<img className="display_img" src={props.userImg}></img>
							}
						</div>
					</Card>
				</Col>
			</Row>
			<Modal width="80%" visible={imagePop} footer={null} onCancel={() => setImagePop(false)}>
				<Mediapop setImage={setImage}></Mediapop>
			</Modal>
		</>
	)

}

export default GeneralField
