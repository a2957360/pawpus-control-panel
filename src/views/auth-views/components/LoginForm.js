import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { PhoneOutlined , LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

import { useDispatch, useSelector } from "react-redux";
import { loginStore,clearStore } from "redux/actions/Store"


export const LoginForm = (props) => {
	let history = useHistory();
	const dispatch = useDispatch();
	
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminType");

	const { 
		showForgetPassword, 
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		loading,
		showMessage,
		message,
		showAuthMessage,
		token,
		redirect,
		allowRedirect
	} = props

	const onLogin = values => {
		let data = values;
		data['isCheckPassword'] = 1;
		dispatch(loginStore(data));
	};

	const onGoogleLogin = () => {
		showLoading()
	}

	const onFacebookLogin = () => {
		showLoading()
	}

	useEffect(() => {
		if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if(showMessage) {
			setTimeout(() => {
			hideAuthMessage();
		}, 3000);
		}
	});

	const loginmessage = useSelector(state => state.storeData.loginmessage);
	const logidata = useSelector(state => state.storeData.data);
	useEffect(() => {
		switch (loginmessage) {
			case "success":
				localStorage.setItem("adminId",logidata.storeId);
				localStorage.setItem("adminType",logidata.adminType);
				history.push("/app/homepage")
				dispatch(clearStore());
				break;
			case "fail":
				showAuthMessage(`登陆失败，请检查用户名或者密码`);
				break;
			case "nouser":
				showAuthMessage(`登陆失败，用户名不存在`);
				break;
			default:
				break;
		}

	}, [loginmessage]);
	
	const renderOtherSignIn = (
		<div>
			<Divider>
				<span className="text-muted font-size-base font-weight-normal">or connect with</span>
			</Divider>
			<div className="d-flex justify-content-center">
				<Button 
					onClick={() => onGoogleLogin()} 
					className="mr-2" 
					disabled={loading} 
					icon={<CustomIcon svg={GoogleSVG}/>}
				>
					Google
				</Button>
				<Button 
					onClick={() => onFacebookLogin()} 
					icon={<CustomIcon svg={FacebookSVG}/>}
					disabled={loading} 
				>
					Facebook
				</Button>
			</div>
		</div>
	)

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form 
				layout="vertical" 
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item 
					name="adminName" 
					label="User Name" 
					rules={[
						{ 
							required: true,
							message: '请输入用户名',
						},

					]}>
					<Input prefix={<PhoneOutlined  className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="adminPassword" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword && 
								<span 
									onClick={() => onForgetPasswordClick} 
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							} 
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign In
					</Button>
				</Form.Item>
				{/* {
					otherSignIn ? renderOtherSignIn : null
				}
				{ extra } */}
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  	return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
