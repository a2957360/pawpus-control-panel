import React, { useEffect } from 'react'
import { Input, Row, Col, Card, Form, Button, Select, Modal, Radio } from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

import Mediapop from '../../media/Mediapop'
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";
import { useDispatch } from "react-redux";


const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 24, offset: 0 },
	},
};

// const myUploadFn = (param) => {

// 	const serverURL = API_BASE_URL+"imageModule.php";
// 	const xhr = new XMLHttpRequest
// 	const fd = new FormData()

// 	const successFn = (response) => {
// 	  // 假设服务端直接返回文件上传后的地址
// 	  // 上传成功后调用param.success并传入上传后的文件地址
// 	  console.log(xhr);
// 	  param.success({
// 		url: xhr.responseText,
// 	  })
// 	}

// 	const progressFn = (event) => {
// 	  // 上传进度发生变化时调用param.progress
// 	  param.progress(event.loaded / event.total * 100)
// 	}

// 	const errorFn = (response) => {
// 	  // 上传发生错误时调用param.error
// 	  param.error({
// 		msg: 'unable to upload.'
// 	  })
// 	}

// 	xhr.upload.addEventListener("progress", progressFn, false)
// 	xhr.addEventListener("load", successFn, false)
// 	xhr.addEventListener("error", errorFn, false)
// 	xhr.addEventListener("abort", errorFn, false)

// 	fd.append('file', param.file)
// 	xhr.open('POST', serverURL, true)
// 	xhr.send(fd)

//   }


const GeneralField = (props) => {
	const { TextArea } = Input;
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

	const myUploadFn = async (param) => {
		const fd = new FormData()
		fd.append('isUploadImage', 1)
		fd.append('uploadImages', param.file)
		axios
			.post(API_BASE_URL + "imageModule.php", fd)
			.then(res => {
				param.success({
					url: res.data.data[0],
				})
			});

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

	const categories = props.categoryData
	const attributeData = props.attributeData
	const setImage = (url) => {
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
				<Col xs={24} sm={24} md={17}>
					<Card title="Basic Info">
						<Form.Item name='momentTitle' label="标题" rules={rules.title} disable>
							<Input placeholder="Title" />
						</Form.Item>
						<Form.Item name='momentContent' label="内容" rules={rules.title} disable>
							<TextArea
								autoSize={{ minRows: 10}}
							/>
						</Form.Item>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={7}>
					<Card title="Image/Video">
						{
							props.coverImg.map((field, index) => (
								<>
									<img className="display_img" src={field}></img>
								</>
							))
						}

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
