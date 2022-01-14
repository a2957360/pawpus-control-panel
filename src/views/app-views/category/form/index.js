import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategory } from 'redux/actions/Category';


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

	const { mode = ADD, categoryId } = props
	const [form] = Form.useForm();
	const [bgImg, setbgImage] = useState('');
	const [lfImg, setlfImage] = useState('');
	const [riImg, setriImage] = useState('');
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	//修改的产品id
	let [editId, seteditId] = React.useState(0);


	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl => {
				setbgImage(imageUrl)
				setUploadLoading(true)
			});
		}
	};

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === EDIT) {
					message.success(`保存 成功`);
					// values['image'] = bgImg;
					values['categoryId'] = editId;
					props.closePop();
					dispatch(addCategory(values));
					// history.push(`/app/homepage`)
				}else{
					message.success(`添加 成功`);
					values['categoryType'] = props.categoryType;
					props.closePop();
					dispatch(addCategory(values));
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			message.error('Please enter all required field ');
		});
	};

	//获取产品信息
	const categoryData = useSelector(state => state.categoryData.data);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && categoryData != null) {
			const showData = categoryData.filter(item => item.categoryId == categoryId)
			const item = showData[0]
			form.setFieldsValue({
				categoryName: item.categoryName.zh,
				parentCategoryId: item.parentCategoryId,
			});
			console.log(categoryData.title);

			// setbgImage(subPageData.image);
			seteditId(item.categoryId);
		}else{
			form.setFieldsValue({
				categoryName: '',
				parentCategoryId: '',
			});
		}
	}, [form, mode, categoryId, props, categoryData]);

	//获取产品
	useEffect(() => {
		if(categoryData == null){
			let data = { isGet: 1};
			dispatch(getCategory(data));
		}
	}, [dispatch])

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

				<div className="container">
					<GeneralField
						bgImg={bgImg}
						uploadLoading={uploadLoading}
						handleUploadChange={handleUploadChange}
						setbgImage={setbgImage}
						categoryType={props.categoryType} 
						categoryLevel={props.categoryLevel}
					/>
				</div>
				<PageHeaderAlt className="bg-white border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<div className="mb-3">
								{/* <Button className="mr-2">Discard</Button> */}
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' ? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
			</Form>
		</>
	)
}
