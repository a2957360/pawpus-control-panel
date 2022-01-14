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
				<Card title="分类信息">
					<Form.Item name={['categoryName','zh']} label="分类名称" rules={rules.title}>
						<Input placeholder="Title" />
					</Form.Item>
					<Form.Item name={['categoryName','en']} label="英文名称" rules={rules.title}>
						<Input placeholder="Title" />
					</Form.Item>
					{
						props.categoryLevel == 1&&
						<Form.Item name='parentCategoryId' label="上级分类" rules={rules.title}>
							<Select
								showSearch
								style={{ width: 200 }}
								placeholder="Select a person"
								optionFilterProp="children"
								filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{
									categoryData.map((item)=>
										item.parentCategoryId == 0 &&
										item.categoryType == props.categoryType &&
										<Option value={item.categoryId}>{item.categoryName.zh}</Option>
									)
								}
							</Select>
						</Form.Item>
					}
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
