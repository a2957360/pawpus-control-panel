import React from 'react'
import { Form, Input, Row, Col, Card, Select} from 'antd';

export default function GeneralField(props) {
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

	const onGenderChange = value => {
		form.setFieldsValue({
			note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
		});
	};

	const [form] = Form.useForm();
	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={24}>
				<Card title="Basic Info">
					<Form.Item name="attributeName" label="规格名称" rules={rules.name}>
						<Input placeholder="Product Name" />
					</Form.Item>

					<Form.Item name="attributeType" label="种类" rules={[{ required: true }]}>
						<Select
							placeholder="Select a option and change input text above"
							onChange={onGenderChange}
							allowClear
						>
							<Option value="0">单选</Option>
							<Option value="1">多选</Option>
							<Option value="2">列表</Option>
						</Select>
					</Form.Item>

					{/* <Form.Item name="attributePrice" label="规格价格" rules={rules.name}>
						<Input placeholder="Product Name" />
					</Form.Item> */}

					{/* <Form.Item name="optionList" label="规格选项" rules={[{ required: true }]}>
						<Form.List name="optionList">
							{(fields, { add, remove }) => {
								return (
									<div>
										{fields.map((field, index) => (
											<Form.Item
												{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
												label={index === 0 ? 'Passengers' : ''}
												required={false}
												key={field.key}
											>
												<Form.Item
													{...field}
													validateTrigger={['onChange', 'onBlur']}
													rules={[
														{
															required: true,
															whitespace: true,
															message: "Please input passenger's name or delete this field.",
														},
													]}
													noStyle
												>
													<Input placeholder="passenger name" style={{ width: '45%', marginRight: 8 }} />
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
										))}
										<Form.Item>
											<Button
												type="dashed"
												onClick={() => {
													add();
												}}
												style={{ width: '60%' }}
											>
												<PlusOutlined /> 添加
                							</Button>
										</Form.Item>
									</div>
								);
							}}
						</Form.List>
					</Form.Item> */}
				</Card>
			</Col>
		</Row>
	)
}
