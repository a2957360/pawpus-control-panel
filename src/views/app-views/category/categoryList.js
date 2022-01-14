import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Card, Button, Popconfirm, Modal, Select } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategory } from 'redux/actions/Category';

import DisplayTable from "./form/table"
import CategoryPanel from "./form"


export default function Specification(props) {
	const { Option } = Select;
	let history = useHistory();
	const dispatch = useDispatch();

	const { categoryType, categoryLevel } = props;

	//popup
	let [categoryPop, setcategoryPop] = React.useState(false);
	let [categoryId, setcategoryId] = React.useState(0);
	let [mode, setmode] = React.useState("ADD");


	//打开pop
	const openPop = (info) => {
		setcategoryPop(true)
		setcategoryId(info.categoryId);
		setmode(info.mode);
	}

	const handleApi = (info) => {
		let data = info;
		dispatch(addCategory(data));
	}

	const handleUp = (data) => {
		console.log(data);
		data['isChangeOrder'] = '1';
		data['movement'] = 'up';
		data['categoryType'] = categoryType;
		data['categoryLevel'] = categoryLevel;
		dispatch(addCategory(data));
	}
	const handleDown = (data) => {
		data['isChangeOrder'] = '1';
		data['movement'] = 'down';
		data['categoryType'] = categoryType;
		data['categoryLevel'] = categoryLevel;
		dispatch(addCategory(data));
	}
	let columns = [
		{
			title: '名称',
			dataIndex: ['categoryName','zh'],
			width: '30%',
			// editable: true,
		},
		{
			title: '英文名称',
			dataIndex: ['categoryName','en'],
			width: '30%',
			// editable: true,
		}]
	//1是二级分类
	if (categoryLevel == 1) {
		columns.push(
			{
				title: '上级分类',
				dataIndex: ['parentName','zh'],
				width: '30%',
			});
	}
	columns.push(
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (text, record) =>
				categoryData.length >= 1 ? (
					<>
						<Button onClick={() => openPop({ categoryId: record.categoryId, mode: "EDIT" })}>修改</Button>
						{/* <Popconfirm title="确认上移?" onConfirm={() => handleUp(record)} okText="是" cancelText="否">
							<Button>上移</Button>
						</Popconfirm>
						<Popconfirm title="确认下移?" onConfirm={() => handleDown(record)} okText="是" cancelText="否">
							<Button>下移</Button>
						</Popconfirm> */}
						<Popconfirm title="确认删除?" onConfirm={() => handleApi({ categoryId: [record.categoryId], isDelete: 1 })} okText="是" cancelText="否">
							<a>删除</a>
						</Popconfirm>
					</>
				) : null,
		});

	//获取分类信息
	const categoryData = useSelector(state => state.categoryData.data);
	//获取分类
	useEffect(() => {
		if (categoryData == null) {
			let data = { isGet: 1};
			dispatch(getCategory(data));
		}
	}, [dispatch, categoryData])

	if (categoryData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="分类管理"
			/>
			<Card>
				<Button
					onClick={() => openPop({ categoryId: 0, mode: "ADD" })}
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					添加新分类
		  		</Button>
				<DisplayTable columns={columns} 
				dataSource={categoryData.filter(item => item.categoryType == categoryType && (categoryLevel == 0?item.parentCategoryId == 0:item.parentCategoryId != 0) )} 
				handleApi={handleApi} />
			</Card>
			<Modal width="80%" visible={categoryPop} footer={null} onCancel={() => setcategoryPop(false)}>
				<CategoryPanel
					categoryType={categoryType}
					categoryLevel={categoryLevel}
					categoryId={categoryId} 
					mode={mode}
					closePop={()=>setcategoryPop(false)}
					>
				</CategoryPanel>
			</Modal>
		</>
	)
}