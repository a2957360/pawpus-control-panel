import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
// import ProductListData from "assets/data/product-list.data.json"

import DisplayTable from "./table"

import { useDispatch, useSelector } from "react-redux";
import { getAttribute,addAttribute } from 'redux/actions/Attribute';
import { countBy } from 'lodash';
const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

export default function FoodForm(props){
	let history = useHistory();
	const dispatch = useDispatch();
	const storeId = localStorage.getItem("storeId");

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	let [tableData,settableData] = React.useState([]);
	let [editId,seteditId] = React.useState(0);

	const sendback = (getbackData) =>{
		settableData(getbackData);
	};

	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl =>{
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
				if(mode === ADD) {
					console.log('info', values)
					console.log('info', tableData)
					let data = values;
					data['optionList'] = tableData
					data['storeId'] = storeId
					dispatch(addAttribute(data));
					console.log(data);
					message.success(`保存成功！`);
					history.push(`/app/specification`)
				}
				if(mode === EDIT) {
					let data = values;
					data['attributeId'] = editId
					data['optionList'] = tableData
					console.log('info', data)
					dispatch(addAttribute(data));
					message.success(`保存成功！`);
					history.push(`/app/specification`)
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			message.error('Please enter all required field ');
		});
	};
	//获取规格信息
	const attributeData = useSelector(state => state.attributeData.data);

	useEffect(() => {
    	if(mode === EDIT && attributeData != null) {
			const attributeId = param.params
			const productData = attributeData.filter( attribute => attribute.attributeId == attributeId)
			const attribute = productData[0]
			form.setFieldsValue({
				attributeName: attribute.attributeName,
				attributeType: attribute.attributeType,
				// price: product.price
			});
			seteditId(attribute.attributeId);
			if(attribute.optionList != null){
				settableData(attribute.optionList)
			}
			// setImage(product.image)	
		}
	  }, [form, mode, param, props, attributeData]);
	  

	//获取规格
	useEffect(() => {
		if (attributeData == null) {
			let data = { isGet: 1, storeId: storeId };
			dispatch(getAttribute(data));
		}
	}, [dispatch, attributeData])

	if ((attributeData == null || tableData.length === 0) && mode === EDIT) {
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
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Product' : `Edit Product`} </h2>
							<div className="mb-3">
								<Button className="mr-2">Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField 
								uploadedImg={uploadedImg} 
								uploadLoading={uploadLoading} 
								handleUploadChange={handleUploadChange}
							/>
							<DisplayTable tableData={tableData} sendBack={sendback}/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}
