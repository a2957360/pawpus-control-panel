import React, { useEffect } from 'react'
import { Input, Form, Row, Col, Card, Modal } from 'antd';

import Mediapop from '../../media/Mediapop'

const GeneralField = (props) => {
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

	const remove = (index) => {
		let tmpImg = props.iconImg;
		tmpImg.splice(index, 1);
		console.log(tmpImg);
		props.seticonImg(tmpImg);
		console.log(index);
		if (index == imgName) {
			index--;
		}
		setimgName(index);
	}

	const setImage = (url) => {
		console.log(url);
		switch (imgName) {
			case "coverImg":
				props.setcoverImg(url);
				break;
			default:
				let tempImg = props.iconImg;
				if (props.iconImg[imgName] != '') {
		
					tempImg[imgName] = url;
				} else {
					tempImg.push(url);
				}
				console.log(tempImg);
				props.seticonImg(tempImg);
				break;
		}
		setImagePop(false)
	}

	const openPop = (name) => {
		setimgName(name);
		setImagePop(true)
	}
	useEffect(() => {
		if (props.uploadedImg != null) {
			setImagePop(false);
		}
	}, [props.uploadedImg, props.iconImg])

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24}>
					<Card title="Cover Image">
						<Form.Item name='componentTitle' label="componentTitle" rules={rules.title}>
							<Input placeholder="Title" />
						</Form.Item>
						<div onClick={() => openPop("coverImg")} className="selectImage">
							{
								props.coverImg != "" &&
								<img className="display_img" src={props.coverImg}></img>
								||
								<p className="ant-upload-text">点击选择图片</p>
							}
						</div>
					</Card>
				</Col>
			</Row>
			<Modal width="80%" visible={imagePop} footer={null} onCancel={() => setImagePop(false)}>
				<Mediapop setImage={setImage}></Mediapop>
			</Modal>
		</>
	)

}

export default GeneralField
