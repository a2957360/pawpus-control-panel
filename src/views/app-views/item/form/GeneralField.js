import React, { useEffect } from 'react'
import { Input, Row, Col, Card, Form, Button, Select, Modal, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Mediapop from '../../media/Mediapop'
import VideoPlayer from '../../videoPlayer'

import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

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
	const [categoryId, setcategoryId] = React.useState(props.itemCategory);

	const myUploadFn = async (param) => {
		const fd = new FormData()
		fd.append('isUploadImage', 1)
		fd.append('uploadImages', param.file)
		axios
		.post(API_BASE_URL + "imageModule.php", fd)
		.then(res => {
			param.success({
			url: res.data.data[0],
			})
		});
	}

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
		setcategoryId(props.itemCategory);
	}, [props.uploadedImg, props.iconImg])

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={17}>
					<Card title="Basic Info">
						<Form.Item name='itemTitle' label="itemTitle" rules={rules.title}>
							<Input placeholder="itemTitle" />
						</Form.Item>
							<Form.Item name="itemCategory" label="??????" >
							<Select className="w-100" placeholder="Category" onChange={setcategoryId}>
								{
									categories != null &&
									categories.map(elm => (
										elm.categoryType == 2 &&
										elm.parentCategoryId == 0 &&
										<Option key={elm.categoryId} value={elm.categoryId}>{elm.categoryName.zh}</Option>
									))
								}
							</Select>
						</Form.Item>
						<Form.Item name="itemSubCategory" label="????????????" >
							<Select
								mode="multiple"
								size="default"
								placeholder="Please select"
								defaultValue={[]}
								style={{ width: '100%' }}
							>
								{
									categories != null &&
									categories.map(item => (
										item.categoryType == 2 &&
										item.parentCategoryId == categoryId &&
										<Option key={item.categoryId} value={item.categoryId}>{item.categoryName.zh}</Option>
									))}

							</Select>
						</Form.Item>
						<Form.Item name="itemPetCategory" label="????????????" >
							<Select
								mode="multiple"
								size="default"
								placeholder="Please select"
								defaultValue={[]}
								style={{ width: '100%' }}
							>
								{
									categories != null &&
									categories.map(item => (
										item.categoryType == 3 &&
										<Option key={item.categoryId} value={item.categoryId}>{item.categoryName.zh}</Option>
									))}
							</Select>
						</Form.Item>
						<Form.Item name="itemPetSubCategory" label="??????sub??????" >
							<Select
								mode="multiple"
								size="default"
								placeholder="Please select"
								defaultValue={[]}
								style={{ width: '100%' }}
							>
								{
									categories != null &&
									categories.map(item => (
										item.categoryType == 4 &&
										<Option key={item.categoryId} value={item.categoryId}>{item.categoryName.zh}</Option>
									))}
							</Select>
						</Form.Item>
						<Form.Item name='itemTax' label="itemTax" rules={rules.title}>
							<Input placeholder="itemTax" />
						</Form.Item >
						{/* <Form.Item name='itemPrice' label="itemPrice" rules={rules.title}>
							<Input placeholder="itemPrice" />
						</Form.Item>
						<Form.Item name='itemSalePrice' label="itemSalePrice" >
							<Input placeholder="itemSalePrice" />
						</Form.Item>

						<Form.Item name='itemOption' label="??????(??????????????????,????????????????????????????????????)" rules={rules.title}>
							<Select mode="tags" style={{ width: '100%' }} placeholder="??????">
							</Select>
						</Form.Item > */}
						<Form.Item name='itemShortDescription' label="itemShortDescription" rules={rules.title}>
							<TextArea rows={4} />
						</Form.Item >
						<Form.Item name='itemDescription' label="????????????" rules={rules.title}>
							<BraftEditor
								className="my-editor"
								placeholder="?????????????????????"
								media={{uploadFn: myUploadFn}}
							/>
						</Form.Item>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={7}>
					<Card title="Image/Video">
						{
							props.iconImg.map((field, index) => (
								<>
									<div onClick={() => openPop(index)} className="selectImage mutil">
										{
											field.match(/\.(jpeg|jpg|gif|png)$/) != null &&
											<img className="display_img" src={field}></img>
											||
											<VideoPlayer src={field}></VideoPlayer>
										}
									</div>
									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() => {
											remove(index);
										}}
									/>
								</>
							))
						}

						<Button
							type="dashed"
							onClick={() => {
								openPop(props.iconImg.length);
							}}
							style={{ width: '60%' }}
						>
							<PlusOutlined /> Add field
                		</Button>
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
