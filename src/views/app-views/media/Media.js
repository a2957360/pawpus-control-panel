import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { PageHeader, Card, Upload, Modal, message } from 'antd';
import { InboxOutlined} from '@ant-design/icons';
import { API_BASE_URL } from 'constants/ApiConstant';
import { addMedia,getMedia } from 'redux/actions/Media';


export default function Media() {
	const dispatch = useDispatch();

	//获取图片
	const mediaData = useSelector(state => state.mediaData.data);

	let [previewVisible , setPreviewVisible]=React.useState(false);
	let [previewImage  ,setPreviewImage]=React.useState("");
	let showFileList=mediaData;

	const handleCancel = () => {setPreviewVisible(false)};

	const { Dragger } = Upload;
	// 图片上传
	const props = {
		name: 'uploadImages',
		multiple: true,
		data:{"isUploadImage":"1"},
		action: API_BASE_URL+'imageModule.php',
		onChange(info) {
			console.log("upload");
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
				let data = { isGet: 1 };
				dispatch(getMedia(data));
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};
	//图片预览
	const handlePreview = (file) => {
		setPreviewVisible(true);
		setPreviewImage(file.url);
	};
	// 图片删除
	let handleChange = (getfileList ) => {
		let data = { isDelete: 1,imageId:getfileList.imageId };
		dispatch(addMedia(data));
	};

	//获取图片
	useEffect(() => {
		if (mediaData == null) {
			let data = { isGet: 1};
			dispatch(getMedia(data));
		}
	}, [dispatch, mediaData])

	if(mediaData == null){
		return "loading";
	}

	return (
		<>
			<PageHeader
				title="媒体库"
			/>
			<Card>
				<Upload
					// action={API_BASE_URL+'imageModule.php'}
					listType="picture-card"
					fileList={showFileList}
					onPreview={handlePreview}
					onChange={(fileList) => handleChange(fileList)}
					onRemove={(fileList) => handleChange(fileList)}
					onDownload={(fileList) => handleChange(fileList)}
				>
					{/* {fileList.length >= 8 ? null : uploadButton} */}
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>

				<Dragger {...props}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload. Strictly prohibit from uploading company data or other
						band files
		        </p>
				</Dragger>
			</Card>
		</>
	)
}