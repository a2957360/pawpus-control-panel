import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSocial,getSocial } from 'redux/actions/social';


const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

export default function FoodForm(props) {
	const storeId = localStorage.getItem("storeId");
	let history = useHistory();
	const dispatch = useDispatch();

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [iconImg, seticonImg] = useState('');

	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	//修改的产品id
	let [editId,seteditId] = React.useState(0);


	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl => {
				// setImage(imageUrl)
				setUploadLoading(true)
			});
		}
	};

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					message.success(`添加 成功`);
					//0是photography 1是partner
					values['icon'] = iconImg;
					console.log(values);
					dispatch(addSocial(values));
					history.push(`/app/social`)
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['icon'] = iconImg;
					values['id'] = editId;
					console.log(values);
					dispatch(addSocial(values));
					history.push(`/app/social`)
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	//获取产品信息
	const socialData = useSelector(state => state.socialData.data);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && socialData != null) {
			console.log('is edit')
			console.log('props', props)
			const id = param.params
			const showData = socialData.filter(item => item.id === id)
			const item = showData[0]
			console.log(item);
			form.setFieldsValue({
				link: item.link,
				name: item.name,
			});
			seticonImg(item.icon);
			seteditId(id);
		}
	}, [form, mode, param, props, socialData]);

	//获取产品
	useEffect(() => {
		if (socialData == null) {
			let data = { isGet: 1};
			dispatch(getSocial(data));
		}
	}, [dispatch, socialData])
	
	// if (categoryData == null && attributeData == null) {
	// 	return "loading";
	// }

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="bg-white border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New Social Media' : `Edit Social Media`} </h2>
							<div className="mb-3">
								{/* <Button className="mr-2">Discard</Button> */}
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' ? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
						<TabPane tab="General" key="1">
							<GeneralField
								seticonImg={seticonImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								iconImg={iconImg}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}
