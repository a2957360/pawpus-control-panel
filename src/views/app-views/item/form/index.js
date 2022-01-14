import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import Option from '../../itemOption/List'

import BraftEditor from 'braft-editor'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getSingleItem } from 'redux/actions/item';
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
	let history = useHistory();
	const dispatch = useDispatch();

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [iconImg, seticonImg] = useState([]);
	const [itemOption, setitemOption] = useState([]);

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
					values['itemImage'] = iconImg;
					values.itemDescription = values.itemDescription.toHTML()
					console.log(values);
					dispatch(addItem(values));
					history.push(`/app/item`)
				}
				if (mode === EDIT) {
					message.success(`保存 成功`);
					values['itemImage'] = iconImg;
					values.itemDescription = values.itemDescription.toHTML()
					values['itemId'] = editId;
					console.log(values);
					dispatch(addItem(values));
					history.push(`/app/item`)
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	//获取产品信息
	const itemData = useSelector(state => state.itemData.singleData);
	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && itemData != null) {
			console.log('is edit')
			console.log('props', props)
			const id = param.params
			// const showData = itemData.filter(item => item.id === id)
			const item = itemData[0];
			form.setFieldsValue({
				itemTitle: item.itemTitle,
				itemShortDescription: item.itemShortDescription,
				itemDescription: BraftEditor.createEditorState(item.itemDescription),
				itemPrice: item.itemPrice,
				itemSalePrice: item.itemSalePrice,
				itemTax: item.itemTax,
				itemCategory: item.itemCategory,
				itemSubCategory: item.itemSubCategory,
				itemPetCategory: item.itemPetCategory,
				itemPetSubCategory: item.itemPetSubCategory,
				itemOption: item.itemOption,
				itemState: item.itemState,
			});
			seticonImg(item.itemImage);
			seteditId(id);
			setitemOption(item.itemOption);
		}
	}, [form, mode, param, props, itemData]);

	//获取产品
	useEffect(() => {
		if (mode == EDIT) {
			let data = { isGet: 1, itemId: param.params };
			dispatch(getSingleItem(data));
		}
	}, [dispatch])

	//获取分类信息
	const categoryData = useSelector(state => state.categoryData.data);
	//获取分类
	useEffect(() => {
		if (categoryData == null) {
			let data = { isGet: 1 };
			dispatch(getCategory(data));
		}
	}, [dispatch, categoryData])

	if (categoryData == null || (mode == EDIT && itemData == null)) {
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
								seticonImg={seticonImg}
								uploadLoading={uploadLoading}
								handleUploadChange={handleUploadChange}
								iconImg={iconImg}
								categoryData={categoryData}
								itemCategory={mode === EDIT ? itemData[0].itemCategory : 0}
							/>
						</TabPane>
						{
							mode === EDIT &&
							<TabPane tab="option" key="2">
								<Option
									itemId={itemData[0].itemId}
								/>
							</TabPane>
						}
					</Tabs>
				</div>
			</Form>
		</>
	)
}
