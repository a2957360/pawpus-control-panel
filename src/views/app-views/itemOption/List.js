import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Card, Button, Popconfirm, Modal, Table } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { addItemOption, getItemOption } from 'redux/actions/itemOption';

import DisplayTable from "./form/table"
import CategoryPanel from "./form"


export default function Specification(props) {
	const dispatch = useDispatch();

	const { itemId } = props;

	//popup
	let [categoryPop, setcategoryPop] = React.useState(false);
	let [itemOptionId, setitemOptionId] = React.useState(0);
	let [mode, setmode] = React.useState("ADD");

	//打开pop
	const openPop = (info) => {
		setcategoryPop(true)
		setitemOptionId(info.itemOptionId);
		setmode(info.mode);
	}

	const handleApi = (info) => {
		let data = info;
		dispatch(addItemOption(data));
	}

	const handleUp = (data) => {
		console.log(data);
		data['isChangeOrder'] = '1';
		data['movement'] = 'up';
		dispatch(addItemOption(data));
	}
	const handleDown = (data) => {
		data['isChangeOrder'] = '1';
		data['movement'] = 'down';
		dispatch(addItemOption(data));
	}
	let columns = [
		{
			title: '名称',
			dataIndex: 'itemOptionName',
			width: '30%',
			editable: true,
		},{
			title: '价格',
			dataIndex: 'itemOptionPrice',
			editable: true,
		},{
			title: '打折价',
			dataIndex: 'itemOptionSalePrice',
			editable: true,
		},{
			title: 'SKU',
			dataIndex: 'itemOptionSku',
			editable: true,
		},{
			title: '库存',
			dataIndex: 'itemOptionStock',
			editable: true,
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record) =>
				itemOptionData.length >= 1 ? (
					<>
						<Button onClick={() => openPop({ itemOptionId: record.itemOptionId, mode: "EDIT" })}>修改</Button>
						{/* <Popconfirm title="确认上移?" onConfirm={() => handleUp(record)} okText="是" cancelText="否">
							<Button>上移</Button>
						</Popconfirm>
						<Popconfirm title="确认下移?" onConfirm={() => handleDown(record)} okText="是" cancelText="否">
							<Button>下移</Button>
						</Popconfirm> */}
						<Popconfirm title="确认删除?" onConfirm={() => handleApi({ itemOptionId: [record.itemOptionId], isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm>
					</>
				) : null,
		}]

	//获取规格信息
	const itemOptionData = useSelector(state => state.itemOptionData.data);
	//获取规格
	useEffect(() => {
		if(itemOptionData == null){
			let data = { isGet: 1, itemId:itemId};
			dispatch(getItemOption(data));
		}
	}, [dispatch,itemOptionData])

	useEffect(() => {
			let data = { isGet: 1, itemId:itemId};
			dispatch(getItemOption(data));
	}, [props])

	if (itemOptionData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="规格管理"
			/>
			<Card>
				<Button
					onClick={() => openPop({ itemOptionId: 0, mode: "ADD" })}
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					添加新规格
		  		</Button>
				{/* <DisplayTable 
				columns={columns} 
				dataSource={itemOptionData} 
				handleApi={handleApi} /> */}
				<Table
					columns={columns}
					dataSource={itemOptionData}
					rowKey='id'
					/>
			</Card>
			<Modal width="80%" visible={categoryPop} footer={null} onCancel={() => setcategoryPop(false)}>
				<CategoryPanel
					itemData={itemOptionData.filter(item => item.itemOptionId == itemOptionId)}
					mode={mode}
					itemId={itemId}
					closePop={()=>setcategoryPop(false)}
					>
				</CategoryPanel>
			</Modal>
		</>
	)
}