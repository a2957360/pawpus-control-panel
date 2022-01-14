import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleService,addService } from 'redux/actions/service';
import { getCategory } from 'redux/actions/Category';


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
	const [userImg, setuserImg] = useState([]);

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
					values['serviceImage'] = userImg;
					console.log(values);
					dispatch(addService(values));
					history.goBack()
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['serviceImage'] = userImg;
					values['serviceId'] = editId;
					console.log(values);
					dispatch(addService(values));
					history.goBack()
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	//获取产品信息
	const serviceSingleData = useSelector(state => state.serviceData.singleData);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && serviceSingleData != null) {
			const id = param.params
			//1 是partner数据
			const item = serviceSingleData[0];
			form.setFieldsValue({
				serviceName: item.serviceName,
				serviceCategory: item.serviceCategory,
				serviceSubCategory: item.serviceSubCategory,
				serviceDescription: item.serviceDescription,
				serviceRequirement: item.serviceRequirement,
				serviceExtra: item.serviceExtra,
				serviceFacility: item.serviceFacility,
				servicePrice: item.servicePrice,
				serviceStock: item.serviceStock,
				serviceAddress: item.serviceAddress,
				serviceCity: item.serviceCity,
				serviceProvince: item.serviceProvince,
				servicePostal: item.servicePostal,
				serviceHourseType: item.serviceHourseType,
				servicePhone: item.servicePhone,
				serviceState: item.serviceState,
				serviceLanguage: item.serviceLanguage,
				endDate: item.endDate,
				checkinTime: item.checkinTime,
				checkoutTime: item.checkoutTime,
			});
			setuserImg(item.serviceImage);
			seteditId(id);
		}
	}, [form, mode, param, props, serviceSingleData]);

	//获取产品
	useEffect(() => {
		let data = { isGet: 1,serviceId:param.params};
		dispatch(getSingleService(data));
	}, [dispatch])
		
	//获取分类信息
	const categoryData = useSelector(state => state.categoryData.data);
	//获取分类
	useEffect(() => {
		if (categoryData == null) {
			let data = { isGet: 1};
			dispatch(getCategory(data));
		}
	}, [dispatch, categoryData])

	if (categoryData == null || serviceSingleData == null) {
		return "loading";
	}

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
							<h2 className="mb-3">{mode === 'ADD' ? 'Add Partner New blog' : `Edit Partner blog`} </h2>
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
								setuserImg={setuserImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								userImg={userImg}
								categoryData={categoryData}
								serviceCategory={serviceSingleData[0].serviceCategory}
								serviceExtra={serviceSingleData[0].serviceExtra}
							/>
						</TabPane>
					</Tabs>
				</div>
				<div className="container">
					<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
					<h2 className="mb-3"></h2>
						<div className="mb-3">
							{/* <Button className="mr-2">Discard</Button> */}
							<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
								{mode === 'ADD' ? 'Add' : `Save`}
							</Button>
						</div>
					</Flex>
				</div>
			</Form>
		</>
	)
}
