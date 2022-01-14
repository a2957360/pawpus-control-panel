import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDeliver,getDeliver } from 'redux/actions/deliver';


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
	const [iconImg, seticonImg] = useState([]);
	const [coverImg, setcoverImg] = useState([]);

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
					console.log(values);
					dispatch(addDeliver(values));
					history.push(`/app/deliver`)
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['deliverId'] = editId;
					console.log(values);
					dispatch(addDeliver(values));
					history.push(`/app/deliver`)
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	//获取产品信息
	const deliverData = useSelector(state => state.deliverData.data);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && deliverData != null) {
			const id = param.params
			const showData = deliverData.filter(item => item.deliverId === id)
			const item = showData[0]
			form.setFieldsValue({
				deliverName: item.deliverName,
				deliverPostal: item.deliverPostal,
				deliverPrice: item.deliverPrice,
				deliverRequirePrice: item.deliverRequirePrice,
				deliverType: item.deliverType,
			});
			seticonImg(item.urls);
			setcoverImg(item.image);
			seteditId(id);
		}else{
			form.setFieldsValue({
				deliverType : 0
			});
		}
	}, [form, mode, param, props, deliverData]);

	//获取产品
	useEffect(() => {
		if (deliverData == null) {
			let data = { isGet: 1};
			dispatch(getDeliver(data));
		}
	}, [dispatch, deliverData])
	
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
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New deliver Media' : `Edit deliver Media`} </h2>
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
								setcoverImg={setcoverImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								iconImg={iconImg}
								coverImg={coverImg}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}
