import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from 'redux/actions/coupon';

import moment from 'moment';

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

	const { mode = ADD, couponInfo } = props
	const [form] = Form.useForm();
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	//修改的产品id
	let [editId, seteditId] = React.useState(0);

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === EDIT) {
					message.success(`保存 成功`);
					// values['image'] = bgImg;
					values['couponId'] = editId;
					props.closePop();
					dispatch(addCoupon(values));
					// history.push(`/app/homepage`)
				}else{
					message.success(`添加 成功`);
					props.closePop();
					dispatch(addCoupon(values));
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			message.error('Please enter all required field ');
		});
	};

	//编辑时设定值
	useEffect(() => {
		if (mode === EDIT && couponInfo != null) {
			console.log(couponInfo);
			const item = couponInfo
			form.setFieldsValue({
				couponType: item.couponType,
				discountType: item.discountType,
				couponCode: item.couponCode,
				couponrequirePrice: item.couponrequirePrice,
				couponValue: item.couponValue,
				avaiableTimes: item.avaiableTimes,
				expireDate: moment(item.expireDate,'Y-M-D'),
			});
			// setbgImage(subPageData.image);
			seteditId(couponInfo.couponId);
		}else{
			form.setFieldsValue({
				couponType: "0",
				discountType: "0",
				expireDate: moment(moment(),'Y-M-D'),
			});
		}
	}, [form, mode, props]);


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
						uploadLoading={uploadLoading}
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
