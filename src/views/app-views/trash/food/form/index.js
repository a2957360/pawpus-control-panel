import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from 'redux/actions/Category';
import { getAttribute } from 'redux/actions/Attribute';
import { addItem,getItem } from 'redux/actions/ItemFood';


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
	const [uploadedImg, setImage] = useState('')
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
				setImage(imageUrl)
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
					values['itemImage'] = uploadedImg;
					values['storeId'] = storeId;
					console.log(values);
					dispatch(addItem(values));
					history.push(`/app/food`)
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['itemImage'] = uploadedImg;
					values['itemId'] = editId;
					dispatch(addItem(values));
					history.push(`/app/food`)
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};
	//获取分类信息
	const categoryData = useSelector(state => state.categoryData.data);
	//获取分类
	useEffect(() => {
		if (categoryData == null) {
			let data = { isGet: 1, storeId:storeId };
			dispatch(getCategory(data));
		}
	}, [dispatch, categoryData,storeId])

	//获取规格信息
	const attributeData = useSelector(state => state.attributeData.data);
	//获取规格
	useEffect(() => {
		if (attributeData == null) {
			let data = { isGet: 1, storeId:storeId };
			dispatch(getAttribute(data));
		}
	}, [dispatch, attributeData,storeId])


	//获取产品信息
	const itemData = useSelector(state => state.itemData.data);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && itemData != null) {
			console.log('is edit')
			console.log('props', props)
			const itemId = param.params
			const showitemData = itemData.filter(item => item.itemId === itemId)
			const item = showitemData[0]
			console.log(item);
			form.setFieldsValue({
				itemName: item.itemName,
				itemPrice: item.itemPrice,
				itemSelection: item.formitemSelection,
				categoryId: item.categoryId,
			});
			setImage(item.itemImage);
			seteditId(itemId);
		}
	}, [form, mode, param, props,itemData]);

	//获取产品
	useEffect(() => {
		if (itemData == null) {
			let data = { isGet: 1, storeId:storeId };
			dispatch(getItem(data));
		}
	}, [dispatch, itemData, storeId])
	
	if (categoryData == null && attributeData == null) {
		return "loading";
	}
	// if ((itemData == null || attributeData.length === 0) && mode === EDIT) {
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
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New Product' : `Edit Product`} </h2>
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
								uploadedImg={uploadedImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								categoryData={categoryData}
								attributeData={attributeData}
								setImage={setImage}
							/>
						</TabPane>
						{/* <TabPane tab="Variation" key="2">
							<VariationField />
						</TabPane>
						<TabPane tab="Shipping" key="3">
							<ShippingField />
						</TabPane> */}
					</Tabs>
				</div>
			</Form>
		</>
	)
}
