import React, { useEffect } from 'react'
import { Input, Row, Col, Card, Form, InputNumber, Select, Modal } from 'antd';

import Mediapop from '../../media/Mediapop'
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from 'redux/actions/Category';

const GeneralField = (props) => {
	const { Option } = Select;
	const dispatch = useDispatch();

	const rules = {
		title: [
			{
				required: true,
				message: 'not Empty',
			}
		],
	}

	const [imagePop, setImagePop] = React.useState(false);
	const [imageName, setimageName] = React.useState();

	const categories = props.categoryData
	const attributeData = props.attributeData
	const openImagePop = (name) => {
		setImagePop(true);
		setimageName(name);
	}
	//设置不同图片
	const setImage = (url) => {
		switch (imageName) {
			case "bg":
				props.setbgImage(url);
				break;
			case "lf":
				props.setlfImage(url);
				break;
			case "ri":
				props.setriImage(url);
				break;
			default:
				break;
		}
		setImagePop(false);
	}
	useEffect(() => {
		if (props.uploadedImg != null) {
			setImagePop(false);
		}
	}, [props.uploadedImg])
	//获取产品信息
	const categoryData = useSelector(state => state.categoryData.data);
	//获取产品
	useEffect(() => {
		if(categoryData == null){
			let data = { isGet: 1};
			dispatch(getCategory(data));
		}
	}, [dispatch])
	return (
		<Row gutter={16}>
			<Col xs={24} sm={24} md={24}>
				<Card title="规格信息">
					<Form.Item name='itemOptionName' label="规格名称" rules={rules.title}>
						<Input placeholder="Title" />
					</Form.Item>
					<Form.Item name='itemOptionPrice' label="规格价格" rules={rules.title}>
						<Input placeholder="Title" />
					</Form.Item>
					<Form.Item name='itemOptionSalePrice' label="规格打折价" >
						<Input placeholder="Title" />
					</Form.Item>
					<Form.Item name='itemOptionSku' label="规格SKU" rules={rules.title}>
						<Input placeholder="Title" />
					</Form.Item>
					<Form.Item name='itemOptionStock' label="规格库存" rules={rules.title}>
						<Input placeholder="Title" />
					</Form.Item>
				</Card>
			</Col>
			{/* <Col xs={24} sm={24} md={7}>
				<Card title="Background">
						<div onClick={()=>openImagePop("bg")} className="selectImage">
							{
								props.bgImg != "" &&
								<img className="display_img" src={props.bgImg}></img>
								||
								<p className="ant-upload-text">点击选择图片</p>
							}
						</div>
				</Card>
			</Col> */}
			<Modal width="80%" visible={imagePop} footer={null} onCancel={() => setImagePop(false)}>
				<Mediapop setImage={setImage}></Mediapop>
			</Modal>
		</Row>

	)

}

export default GeneralField
