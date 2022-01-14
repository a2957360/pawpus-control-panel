import React, {useEffect} from 'react'
import { Input, Row, Col, Card, Form,  InputNumber, Select,Modal } from 'antd';

import Mediapop from '../../media/Mediapop'

const GeneralField = (props) => {
	const { Option } = Select;

	const rules = {
		title: [
			{
				required: true,
				message: 'not Empty',
			}
		],
	}
	const [imgName, setimgName] = React.useState('');
	const [imagePop, setImagePop] = React.useState(false);

	const categories = props.categoryData
	const attributeData = props.attributeData
	const setImage =  (url)=>{
		switch (imgName) {
			case "icon":
				props.seticonImg(url);
				break;
		}
		setImagePop(false)
	}

	const openPop =  (name)=>{
		setimgName(name);
		setImagePop(true)
	}
	useEffect(() => {
		if (props.uploadedImg != null) {
			setImagePop(false);
		}
	}, [props.uploadedImg])

	return (
		<>
		<Row gutter={16}>
			<Col xs={24} sm={24} md={17}>
				<Card title="Basic Info">
					<Form.Item name='name' label="Meida Name" rules={rules.title}>
						<Input placeholder="Title" disabled/>
					</Form.Item>
					<Form.Item name='link' label="Link" rules={rules.title}>
						<Input placeholder="Title" />
					</Form.Item>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={7}>
				<Card title="Icon">
						<div onClick={()=>openPop("icon")} className="selectImage">
							{
								props.iconImg != "" &&
								<img className="display_img" src={props.iconImg}></img>
								||
								<p className="ant-upload-text">点击选择图片</p>
							}
						</div>
				</Card>
			</Col>
		</Row>
		<Modal width="80%" visible={imagePop} footer={null} onCancel={()=>setImagePop(false)}>
			<Mediapop setImage={setImage}></Mediapop>
		</Modal>
		</>
	)

}

export default GeneralField
