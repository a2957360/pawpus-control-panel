import React, { useEffect } from 'react'
import { Input, Row, Col, Card, Form, Button, Select, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Mediapop from '../../media/Mediapop'
import VideoPlayer from '../../videoPlayer'

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
	const [categoryId, setcategoryId] = React.useState(props.serviceCategory);

	const categories = props.categoryData

	const setImage = (url) => {
		let tempImg = props.userImg;
		if (props.userImg[imgName] != '') {
			tempImg[imgName] = url;
		} else {
			tempImg.push(url);
		}
		console.log(tempImg);
		props.setuserImg(tempImg);
		setImagePop(false)
	}

	const remove = (index) => {
		let tmpImg = props.userImg;
		tmpImg.splice(index, 1);
		console.log(tmpImg);
		props.setuserImg(tmpImg);
		console.log(index);
		if (index == imgName) {
			index--;
		}
		setimgName(index);
	}

	const openImagePop = (name) => {
		setImagePop(true);
		setimgName(name);
	}

	useEffect(() => {
		if (props.uploadedImg != null) {
			setImagePop(false);
		}
	}, [props.uploadedImg])

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24}>
					<h2>服务信息</h2>
				</Col>
				<Col xs={24} sm={24} md={17}>
					<Card title="Basic Info">
						<Form.Item name="serviceState" label="服务审核状态" >
							<Select className="w-100" placeholder="serviceState" >
								<Option key={"-2"} value={"-2"}>审核不通过</Option>
								<Option key={"0"} value={"0"}>未审核</Option>
								<Option key={"1"} value={"1"}>上架</Option>
								<Option key={"2"} value={"2"}>下架</Option>
							</Select>
						</Form.Item>
						<Form.Item name='serviceName' label="名字" rules={rules.title}>
							<Input placeholder="serviceName" />
						</Form.Item>
						<Form.Item name='servicePrice' label="价格" rules={rules.title}>
							<Input placeholder="servicePrice" />
						</Form.Item>
						<Form.Item name='serviceStock' label="可接待数量" rules={rules.title}>
							<Input placeholder="serviceStock" />
						</Form.Item>
						<Form.Item name="serviceCategory" label="分类" >
							<Select className="w-100" placeholder="Category" onChange={setcategoryId}>
								{
									categories != null &&
									categories.map(elm => (
										elm.categoryType == 0 &&
										elm.parentCategoryId == 0 &&
										<Option key={elm.categoryId} value={elm.categoryId}>{elm.zh}</Option>
									))
								}
							</Select>
						</Form.Item>
						<Form.Item name="serviceSubCategory" label="二级分类" >
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
										item.categoryType == 0 &&
										item.parentCategoryId == categoryId &&
										<Option key={item.categoryId} value={item.categoryId}>{item.categoryName.zh}</Option>
									))}

							</Select>
						</Form.Item>

						<Row gutter={16}>
							<Col span={24}>
								<label>额外服务</label>
							</Col>

							{
								categories != null &&
								categories.map(item => (
									item.categoryType == 1 &&
									<Col span={6}>
										<Form.Item name={['serviceExtra', 's' + item.categoryId]} label={item.categoryName.zh} >
											<Input placeholder="价格 没有该服务请留空" />
										</Form.Item>
									</Col>
								))}
						</Row>
						<Form.Item name='serviceAddress' label="地址" rules={rules.title}>
							<Input placeholder="serviceAddress" />
						</Form.Item>
						<Form.Item name='serviceCity' label="城市" rules={rules.title}>
							<Input placeholder="serviceCity" />
						</Form.Item>
						<Form.Item name='serviceProvince' label="省份" rules={rules.title}>
							<Input placeholder="serviceProvince" />
						</Form.Item>
						<Form.Item name='servicePhone' label="电话" rules={rules.title}>
							<Input placeholder="servicePhone" />
						</Form.Item>
						<Form.Item name='serviceDescription' label="Service Description" rules={rules.title}>
							<TextArea rows={4} />
						</Form.Item>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={7}>
					<Card title="Background">
						{
							props.userImg != null &&
							props.userImg.map((field, index) => (
								<>
									<div onClick={() => openImagePop(index)} className="selectImage mutil">
										<img className="display_img" src={field}></img>
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
								openImagePop(props.userImg.length);
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
