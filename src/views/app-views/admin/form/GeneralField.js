import React, {useEffect} from 'react'
import { Input, Row, Col, Card, Form,  InputNumber, Select,Modal } from 'antd';

import Mediapop from '../../media/Mediapop'

const GeneralField = (props) => {
	const { Option } = Select;

	const rules = {
		name: [
			{
				required: true,
				message: 'Please enter product name',
			}
		],
		description: [
			{
				required: true,
				message: 'Please enter product description',
			}
		],
		price: [
			{
				required: true,
				message: 'Please enter product price',
			}
		],
		comparePrice: [
		],
		taxRate: [
			{
				required: true,
				message: 'Please enter tax rate',
			}
		],
		cost: [
			{
				required: true,
				message: 'Please enter item cost',
			}
		]
	}

	let [imagePop, setImagePop] = React.useState(false);

	const categories = props.categoryData
	const attributeData = props.attributeData
	const setImage =  (url)=>{
		props.setImage(url);
	}
	useEffect(() => {
		if (props.uploadedImg != null) {
			setImagePop(false);
		}
	}, [props.uploadedImg])

	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={17}>
				<Card title="Basic Info">
					<Form.Item name="itemName" label="名字" rules={rules.name}>
						<Input placeholder="Product Name" />
					</Form.Item>
					{/* <Form.Item name="description" label="Description" rules={rules.description}>
						<Input.TextArea rows={4} />
					</Form.Item> */}
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12}>
							<Form.Item name="itemPrice" label="价格" rules={rules.price}>
								<InputNumber
									className="w-100"
									formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									parser={value => value.replace(/\$\s?|(,*)/g, '')}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24}>
							<Form.Item name="itemSelection" label="规格" >
							<Select
								mode="multiple"
								size="default"
								placeholder="Please select"
								defaultValue={[]}
								style={{ width: '100%' }}
								>
								{
								attributeData != null &&
								attributeData.map(item=>(
									<Option key={item.attributeId} value={item.attributeId}>{item.itemSelection}</Option>
								))}

							</Select>
							</Form.Item>
						</Col>
						{/* <Col xs={24} sm={24} md={12}>
							<Form.Item name="comparePrice" label="Compare price" rules={rules.comparePrice}>
								<InputNumber
									className="w-100"
									value={0}
									formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									parser={value => value.replace(/\$\s?|(,*)/g, '')}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12}>
							<Form.Item name="cost" label="Cost per item" rules={rules.cost}>
								<InputNumber
									className="w-100"
									formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									parser={value => value.replace(/\$\s?|(,*)/g, '')}
								/>
							</Form.Item>
						</Col> */}
						{/* <Col xs={24} sm={24} md={12}>
							<Form.Item name="taxRate" label="Tax rate" rules={rules.taxRate}>
								<InputNumber
									className="w-100"
									min={0}
									max={100}
									formatter={value => `${value}%`}
									parser={value => value.replace('%', '')}
								/>
							</Form.Item>
						</Col> */}
					</Row>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={7}>
				<Card title="Media">
						<div onClick={()=>setImagePop(true)} className="selectImage">
							{
								props.uploadedImg != "" &&
								<img className="display_img" src={props.uploadedImg}></img>
								||
								<p className="ant-upload-text">点击选择图片</p>
							}
						</div>
				</Card>
				<Card title="Organization">
					<Form.Item name="categoryId" label="Category" >
						<Select className="w-100" placeholder="Category">
							{
								categories != null &&
								categories.map(elm => (
									<Option key={elm.categoryId} value={elm.categoryId}>{elm.categoryName}</Option>
								))
							}
						</Select>
					</Form.Item>
					{/* <Form.Item name="tags" label="Tags" >
						<Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
							{tags.map(elm => <Option key={elm}>{elm}</Option>)}
						</Select>
					</Form.Item> */}
				</Card>
			</Col>
			<Modal width="80%" visible={imagePop} footer={null} onCancel={()=>setImagePop(false)}>
				<Mediapop setImage={setImage}></Mediapop>
			</Modal>
		</Row>
		
	)

}

export default GeneralField
