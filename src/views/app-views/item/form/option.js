import React, { useEffect } from 'react'
import { Input, Row, Col, Card, Form, Button, Select, Modal, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Mediapop from '../../media/Mediapop'

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

	const remove = (index) => {
		let tmp = props.itemOption;
		tmp.splice(index, 1);
		props.setitemOption(tmp);
	}

	const add = (index) => {
		let tmp = props.itemOption;
		tmp.push({ title: "123", price: "123", salePrice: "123", sku: "2323", stock: "2323" });
		console.log(tmp);
		console.log(props.itemOption);
		props.setitemOption(tmp);
	}
	useEffect(() => {
		console.log("11");
	}, [props.itemOption])
	return (
		<>
			<Form.List name="itemOption">
				{(fields, { add, remove }) => {
					return (
						<div>
							{fields.map((field, index) => (
								<Card>
									<Form.Item
										label={'规格' + (index + 1)}
										required={false}
										key={field.key}
									>
										<Form.Item name={[field.name, 'title']} fieldKey={[field.fieldKey, 'title']} label="title" rules={rules.title}>
											<Input placeholder="title" />
										</Form.Item>
										<Form.Item name={[field.name, 'price']} fieldKey={[field.fieldKey, 'price']} label="price" rules={rules.title}>
											<Input placeholder="content" />
										</Form.Item>
										<Form.Item name={[field.name, 'salePrice']} fieldKey={[field.fieldKey, 'salePrice']} label="salePrice" rules={rules.title}>
											<Input placeholder="content" />
										</Form.Item>
										<Form.Item name={[field.name, 'sku']} fieldKey={[field.fieldKey, 'sku']} label="sku" rules={rules.title}>
											<Input placeholder="content" />
										</Form.Item>
										<Form.Item name={[field.name, 'stock']} fieldKey={[field.fieldKey, 'stock']} label="stock" rules={rules.title}>
											<Input placeholder="content" />
										</Form.Item>
										{fields.length > 1 ? (
											<MinusCircleOutlined
												className="dynamic-delete-button"
												onClick={() => {
													remove(field.name);
												}}
											/>
										) : null}
									</Form.Item>
								</Card>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => {
										add();
									}}
									style={{ width: '60%' }}
								>
									<PlusOutlined /> Add field
                </Button>
							</Form.Item>
						</div>
					);
				}}
			</Form.List>
			{/* <Row gutter={16}>
				{
					props.itemOption.map((field, index) => (
						<>
							<Col xs={24} sm={24} md={17}>
								<Card title="Basic Info">
									<Form.Item name={['itemOption', index, 'title']} label="title" rules={rules.title}>
										<Input placeholder="title" />
									</Form.Item>
									<Form.Item name={['itemOption', index, 'price']} label="price" rules={rules.title}>
										<Input placeholder="content" />
									</Form.Item>
									<Form.Item name={['itemOption', index, 'salePrice']} label="salePrice" rules={rules.title}>
										<Input placeholder="content" />
									</Form.Item>
									<Form.Item name={['itemOption', index, 'sku']} label="sku" rules={rules.title}>
										<Input placeholder="content" />
									</Form.Item>
									<Form.Item name={['itemOption', index, 'stock']} label="stock" rules={rules.title}>
										<Input placeholder="content" />
									</Form.Item>
									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() => {
											remove(index);
										}}
									/>
								</Card>
							</Col>
						</>
					))
				}
				<Button
					type="dashed"
					onClick={() => {
						add();
					}}
					style={{ width: '60%' }}
				>
					<PlusOutlined /> Add field
				</Button>
			</Row> */}
		</>
	)

}

export default GeneralField
