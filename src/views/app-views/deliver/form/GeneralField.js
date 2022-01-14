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
	const { TextArea } = Input;

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
		let tmpImg = props.iconImg;
		tmpImg.splice(index, 1);
		console.log(tmpImg);
		props.seticonImg(tmpImg);
		console.log(index);
		if (index == imgName) {
			index--;
		}
		setimgName(index);
	}

	const categories = props.categoryData
	const attributeData = props.attributeData
	const setImage = (url) => {
		switch (imgName) {
			case "coverImg":
				props.setcoverImg(url);
				break;
			default:
				let tempImg = props.iconImg;
				if (props.iconImg[imgName] != '') {
		
					tempImg[imgName] = url;
				} else {
					tempImg.push(url);
				}
				console.log(tempImg);
				props.seticonImg(tempImg);
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
	}, [props.uploadedImg, props.iconImg])

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24}>
					<Card title="Basic Info">
						<Form.Item name="deliverType" label="配送范围">
							<Radio.Group>
								<Radio.Button value={0}>限定区域</Radio.Button>
								<Radio.Button value={1}>全部</Radio.Button>
							</Radio.Group>
						</Form.Item>
						<Form.Item name='deliverName' label="名称" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name='deliverPrice' label="配送费" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name='deliverRequirePrice' label="起送价格" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name='deliverPostal' label="配送范围邮编(只写前三位，用逗号隔开)">
							<TextArea rows={4} />
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
