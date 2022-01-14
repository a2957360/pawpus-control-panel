import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addHomePage,getSingleHomePage } from 'redux/actions/homePage';
import { getService } from 'redux/actions/service';


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
					values['componentType'] = 0;
					dispatch(addHomePage(values));
					history.push(`/app/homepage`)
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['componentId'] = editId;
					dispatch(addHomePage(values));
					history.push(`/app/homepage`)
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	//获取主页信息
	const homePageData = useSelector(state => state.homePageData.singleData);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && homePageData != null) {
			const id = props.componentId
			const item = homePageData[0]
			form.setFieldsValue({
				componentTitle: item.componentTitle,
				componentContent: item.componentContent,
			});
			seteditId(id);
		}
	}, [form, mode, props, homePageData]);

	//获取主页
	useEffect(() => {
		let data = { isGet: 1,componentId:props.componentId};
		dispatch(getSingleHomePage(data));
	}, [dispatch,props])


	const serviceData = useSelector(state => state.serviceData.data);

	useEffect(() => {
		// 	0:未激活;1：普通用户;2:服务者信息草稿;3:服务者待审核;4:服务者;5:黑名单	
		let data = { isGet: 1};
		dispatch(getService(data));
	}, [dispatch])
	
	if (homePageData == null || serviceData == null) {
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
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New gallery Media' : `Edit gallery Media`} </h2>
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
								setcoverImg={setcoverImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								coverImg={coverImg}
								serviceData={serviceData}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}
