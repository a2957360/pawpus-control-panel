import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { PageHeader, Card, Row, Col, Upload, Modal, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { API_BASE_URL } from 'constants/ApiConstant';
import { getMedia } from 'redux/actions/Media';


export default function Media(father) {
	const dispatch = useDispatch();

	const storeId = localStorage.getItem("storeId");

	//获取图片
	const mediaData = useSelector(state => state.mediaData.data);

	let [previewVisible, setPreviewVisible] = React.useState(false);
	let [previewImage, setPreviewImage] = React.useState("");

	const handleCancel = () => { setPreviewVisible(false) };

	const { Dragger } = Upload;
	// 图片上传
	const props = {
		name: 'uploadImages',
		multiple: true,
		data:{"isUploadImage":"1","storeId":storeId},
		action: API_BASE_URL+'imageModule.php',
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
				let data = { isGet: 1,storeId:storeId };
				dispatch(getMedia(data));
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};


	//获取图片
	useEffect(() => {
		if (mediaData == null) {
			let data = { isGet: 1,storeId:storeId };
			dispatch(getMedia(data));
		}
	}, [dispatch, mediaData])

	if (mediaData == null) {
		return "loading";
	}

	return (
		<>
			<PageHeader
				title="媒体库"
			/>
			<Card>
				<Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>

				<Row gutter={16}>
					<Col xs={24} sm={24} md={4}>
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
						</Dragger>
					</Col>
					{mediaData.map(image => (
						<Col xs={24} sm={24} md={4}>
							<img onClick={()=>father.setImage(image.url)} class="media_img" src={image.display}></img>
							<p>{image.name}</p>
						</Col>

					))}
				</Row>
			</Card>
		</>
	)
}