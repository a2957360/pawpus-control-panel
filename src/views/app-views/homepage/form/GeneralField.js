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
				<Col xs={24} sm={24} md={17}>
					<Card title="Basic Info">
						<Form.Item name="type" label="Radio.Button">
							<Radio.Group defaultValue="0">
								<Radio.Button value="0">Image</Radio.Button>
								<Radio.Button value="1">Video</Radio.Button>
							</Radio.Group>
						</Form.Item>
						<Form.Item name={['name', 'En']} label="Name En" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name={['name', 'Fr']} label="Name Fr" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name={['device', 'En']} label="Device En" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name={['device', 'Fr']} label="Device Fr" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name={['credit', 'En']} label="Credit En" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name={['credit', 'Fr']} label="Credit Fr" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name={['comment', 'En']} label="Comment En" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name={['comment', 'Fr']} label="Comment Fr" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={7}>
					<Card title="Cover Image">
						<div onClick={() => openPop("coverImg")} className="selectImage">
							{
								props.coverImg != "" &&
								<img className="display_img" src={props.coverImg}></img>
								||
								<p className="ant-upload-text">点击选择图片</p>
							}
						</div>
					</Card>
					<Card title="Image/Video">
						{/* <div onClick={() => openPop("icon")} className="selectImage">
							{
								props.iconImg != "" &&
								<img className="display_img" src={props.iconImg}></img>
								||
								<p className="ant-upload-text">点击选择图片</p>
							}
						</div> */}
						{
							props.iconImg.map((field, index) => (
								<>
									<div onClick={() => openPop(index)} className="selectImage mutil">
										{/* <img className="display_img" src={field}></img> */}
										{
											field.match(/\.(jpeg|jpg|gif|png)$/) != null&&
												<img className="display_img" src={field}></img>
											||
											// <video width="100%" height="100%"  controls>
											// 	<source src={field}t ype="video/mp4"/>
											// </video>
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
						{/* <Form.List name="names">
							{(fields, { add, remove }) => {
								const tmpadd = () => {
									console.log(fields);
									add();
								}
								props.iconImg.map((field, index) => (
									fields.push({ name: index, key: index, isListField: true, fieldKey: index })
								))
								console.log(fields);
								return (
									<div>
										{fields.map((field, index) => (
											<Form.Item
												{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
												label={index === 0 ? 'media' : ''}
												required={false}
												key={field.key}
											>
												<Form.Item
													{...field}

													noStyle
												>
													<div onClick={() => openPop(index)} className="selectImage mutil">
														{
															props.iconImg.hasOwnProperty(index) &&
															<img className="display_img" src={props.iconImg[index]}></img>
															||
															<p className="ant-upload-text">点击选择图片</p>
														}
													</div>
												</Form.Item>
												{fields.length >= 1 ? (
													<MinusCircleOutlined
														className="dynamic-delete-button"
														onClick={() => {
															remove(field.name);
														}}
													/>
												) : null}
											</Form.Item>
										))}
										<Form.Item>
											<Button
												type="dashed"
												onClick={() => {
													tmpadd();
												}}
												style={{ width: '60%' }}
											>
												<PlusOutlined /> Add field
                							</Button>
										</Form.Item>
									</div>
								);
							}}
						</Form.List> */}
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
