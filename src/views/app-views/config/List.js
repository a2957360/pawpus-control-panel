import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Card, Button, Popconfirm, Modal, Select } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { addConfig, getConfig } from 'redux/actions/config';

import DisplayTable from "./form/table"
import ConfigPanel from "./form"


export default function Specification(props) {
	const { Option } = Select;
	let history = useHistory();
	const dispatch = useDispatch();

	const { configType = 0, configLevel } = props;

	//popup
	let [configPop, setconfigPop] = React.useState(false);
	let [configId, setconfigId] = React.useState(0);
	let [mode, setmode] = React.useState("ADD");


	//打开pop
	const openPop = (info) => {
		setconfigPop(true)
		setconfigId(info.configId);
		setmode(info.mode);
	}

	const handleApi = (info) => {
		let data = info;
		dispatch(addConfig(data));
	}

	let columns = [
		{
			title: '名称',
			dataIndex: 'configZhName',
			// editable: true,
		},
		{
			title: '数值',
			dataIndex: 'configValue',
			editable: true,
		}]

	//获取分类信息
	const configData = useSelector(state => state.configData.data);
	//获取分类
	useEffect(() => {
		if (configData == null) {
			let data = { isGet: 1};
			dispatch(getConfig(data));
		}
	}, [dispatch, configData])
	console.log(configData);

	if (configData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="参数管理"
			/>
			<Card>
				{/* <Button
					onClick={() => openPop({ configId: 0, mode: "ADD" })}
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					添加新分类
		  		</Button> */}
				<DisplayTable columns={columns} 
				dataSource={configData.filter(item => item.configType == configType)} 
				handleApi={handleApi} />
			</Card>
			<Modal width="80%" visible={configPop} footer={null} onCancel={() => setconfigPop(false)}>
				<ConfigPanel
					configType={configType}
					configLevel={configLevel}
					configId={configId} 
					mode={mode}
					closePop={()=>setconfigPop(false)}
					>
				</ConfigPanel>
			</Modal>
		</>
	)
}