import React, { useEffect } from 'react'
import { Input, Row, Col, Card, Form, Button, Select, Modal, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Mediapop from '../../media/Mediapop'
import VideoPlayer from '../../videoPlayer'
import { array } from 'prop-types';
import { add } from 'lodash';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 24, offset: 0 },
	},
};

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

	const remove = (index) => {
		let tmpImg = props.coverImg;
		tmpImg.splice(index, 1);
		console.log(tmpImg);
		props.setcoverImg(tmpImg);
		console.log(index);
		if (index == imgName) {
			index--;
		}
		setimgName(index);
	}

	const serviceData = props.serviceData

	const setImage = (url) => {
		switch (imgName) {
			case "coverImg":
				props.setcoverImg(url);
				break;
			default:
				let tempImg = props.coverImg;
				if (props.coverImg[imgName] != '') {

					tempImg[imgName] = url;
				} else {
					tempImg.push(url);
				}
				console.log(tempImg);
				props.setcoverImg(tempImg);
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
	}, [props.uploadedImg, props.coverImg])

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={17}>
					<Card title="title">
						<Form.Item name='componentTitle' label="componentTitle" rules={rules.title}>
							<Input placeholder="componentTitle" />
						</Form.Item>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={24}>
					<Card title="Image">
						<Form.Item name='componentContent' label="componentContent" rules={rules.title}>
							<Select
								mode="multiple"
							>
								{serviceData.map(item => (
									<Select.Option key={item.serviceId} value={item.serviceId}>
										{item.serviceName + "-" + item.userName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
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
