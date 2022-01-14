import React, { useState,useEffect } from 'react'
import { PageHeader, Card, Table, Select, Input, Button, Menu } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'


import { useDispatch, useSelector } from "react-redux";
import { addItem, getItem } from 'redux/actions/ItemFood';


export default function FoodList() {
	const dispatch = useDispatch();
	let history = useHistory();

	const storeId = localStorage.getItem("storeId");

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
		history.push(`/app/food-add`)
	}

	const viewDetails = row => {
		history.push(`/app/food-edit/${row.itemId}`)
	}

	const deleteRow = row => {
		if (selectedRows.length > 1) {
			let data={isDelete:1,itemId:[]}
			selectedRows.forEach(elm => {
				data['itemId'].push(elm.itemId)
				// dispatch(addItem(data));
			})
			setSelectedRows([])
			// dispatch(addItem(data));
		} else {
			let data={isDelete:1,itemId:[row.itemId]};
			dispatch(addItem(data));
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'itemId'
		},
		{
			title: '菜品图片',
			dataIndex: 'itemImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={60} type="square" src={record.itemImage} name={record.name} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'itemImage')
		},
		{
			title: '菜品名称',
			dataIndex: 'itemName',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'itemName')
		},
		{
			title: '分类',
			dataIndex: 'categoryName',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'categoryName')
		},
		{
			title: '价格',
			dataIndex: 'itemPrice',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'}
						value={(Math.round(price * 100) / 100).toFixed(2)}
						prefix={'$'}
						thousandSeparator={true}
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'itemPrice')
		},
		// {
		// 	title: 'Stock',
		// 	dataIndex: 'stock',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		// },
		// {
		// 	title: 'Status',
		// 	dataIndex: 'stock',
		// 	render: stock => (
		// 		<Flex alignItems="center">{getStockStatus(stock)}</Flex>
		// 	),
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		// },
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
		const searchArray = itemData
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
	const itemData = useSelector(state => state.itemData.data);
	//获取产品
	useEffect(() => {
		if (itemData == null) {
			let data = { isGet: 1, storeId: storeId };
			dispatch(getItem(data));
		}else if(itemData != null){
			setList(itemData);
		}
	}, [dispatch, itemData,storeId])
	const [list, setList] = useState(itemData)

	if (itemData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="菜品管理"
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
