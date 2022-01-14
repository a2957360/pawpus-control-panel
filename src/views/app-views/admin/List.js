import React, { useState,useEffect } from 'react'
import { PageHeader, Card, Table, Input, Button, Menu } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'


import { useDispatch, useSelector } from "react-redux";
import { addAdmin,getAdmin } from 'redux/actions/admin';

export default function FoodList() {
	const dispatch = useDispatch();
	let history = useHistory();

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const addProduct = () => {
		history.push(`/app/admin-add`)
	}

	const viewDetails = row => {
		history.push(`/app/admin-edit/${row.adminId}`)
	}

	const deleteRow = row => {
		let data={isDelete:1,adminId:[row.adminId]};
		dispatch(addAdmin(data));
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'adminId'
		},
		{
			title: '用户名',
			dataIndex: 'adminName',
		},
		{
			title: '身份',
			dataIndex: 'adminTypeDisplay',
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)} />
				</div>
			)
		}
	];

	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		// const searchArray = e.currentTarget.value ? list : itemData
		const searchArray = adminData
		console.log(searchArray);
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	// const handleShowCategory = value => {
	// 	if (value !== 'All') {
	// 		const key = 'category'
	// 		const data = utils.filterArray(itemData, key, value)
	// 		setList(data)
	// 	} else {
	// 		setList(itemData)
	// 	}
	// }

	//获取产品信息
	const adminData = useSelector(state => state.adminData.data);
	//获取产品
	useEffect(() => {
		if (adminData == null) {
			let data = { isGet: 1};
			dispatch(getAdmin(data));
		}else if(adminData != null){
			setList(adminData);
		}
	}, [dispatch, adminData])
	const [list, setList] = useState(adminData)

	if (adminData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="店铺管理"
			/>
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
						</div>
						<div className="mb-3">
							{/* <Select
								defaultValue="All"
								className="w-100"
								style={{ minWidth: 180 }}
								onChange={handleShowCategory}
								placeholder="Category"
							>
								<Option value="All">All</Option>
								{
									categories.map(elm => (
										<Option key={elm} value={elm}>{elm}</Option>
									))
								}
							</Select> */}
						</div>
					</Flex>
					<div>
						<Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block>Add product</Button>
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={list}
						rowKey='itemId'
						rowSelection={{
							selectedRowKeys: selectedRowKeys,
							type: 'checkbox',
							preserveSelectedRowKeys: false,
							...rowSelection,
						}}
					/>
				</div>
			</Card>
		</>
	)
}
