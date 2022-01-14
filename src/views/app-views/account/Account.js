import React from 'react'
import { PageHeader, Card, Form, Button, Input, Row, Col, message } from 'antd';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStore } from 'redux/actions/Store';

export default function Account() {
	const dispatch = useDispatch();
	let history = useHistory();
	let changePasswordFormRef = React.createRef();

	const onFinish = values => {
		values['isChangePassword'] = 1;
		values['adminId'] = 3;
		dispatch(addStore(values));
		message.success({ content: '密码修改成功!', duration: 2 });
		// onReset()
		history.push(`/app/account`)
	};

	// const onReset = () => {
	// 	changePasswordFormRef.current.resetFields();
	// };

	return (
		<>
			<Card>
				<h2 className="mb-4">Change Password</h2>
				<Row >
					<Col xs={24} sm={24} md={24} lg={8}>
						<Form
							name="changePasswordForm"
							layout="vertical"
							ref={changePasswordFormRef}
							onFinish={onFinish}
						>
							{/* <Form.Item
								label="Current Password"
								name="currentPassword"
								rules={[{
									required: true,
									message: 'Please enter your currrent password!'
								}]}
							>
								<Input.Password />
							</Form.Item> */}
							<Form.Item
								label="New Password"
								name="newPassword"
								rules={[{
									required: true,
									message: 'Please enter your new password!'
								}]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								label="Confirm Password"
								name="adminPassword"
								rules={
									[
										{
											required: true,
											message: 'Please confirm your password!'
										},
										({ getFieldValue }) => ({
											validator(rule, value) {
												if (!value || getFieldValue('newPassword') === value) {
													return Promise.resolve();
												}
												return Promise.reject('Password not matched!');
											},
										}),
									]
								}
							>
								<Input.Password />
							</Form.Item>
							<Button type="primary" htmlType="submit">
								Change password
						</Button>
						</Form>
					</Col>
				</Row>
			</Card>
		</>
	)
}
