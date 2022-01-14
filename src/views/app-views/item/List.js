import React, { useState,useEffect } from 'react'
import { PageHeader, Card, Table, Select, Input, Button, Menu } from 'antd';
import { EyeOutlined, DeleteOutlined, FileDoneOutlined, PlusCircleOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'


import { useDispatch, useSelector } from "react-redux";
import { addItem, getItem } from 'redux/actions/item';


export default function FoodList() {
	const dispatch = useDispatch();
	let history = useHistory();

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignhomePages="center">
					<FileDoneOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			{
				row.itemState == 0 &&
				<Menu.Item onClick={() => hideRow(row)}>
					<Flex alignhomePages="center">
						<EyeInvisibleOutlined />
						<span className="ml-2">下架</span>
					</Flex>
				</Menu.Item>
				||
				<Menu.Item onClick={() => showRow(row)}>
					<Flex alignhomePages="center">
						<EyeOutlined />
						<span className="ml-2">上架</span>
					</Flex>
				</Menu.Item>
			}
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignhomePages="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const addProduct = () => {
		history.push(`/app/item-add`)
	}

	const viewDetails = row => {
		history.push(`/app/item-edit/${row.itemId}`)
	}

	const hideRow = row => {
		let data={isChangeState:1,itemId:row.itemId,itemState:1};
		dispatch(addItem(data));
	}
	const showRow = row => {
		let data={isChangeState:1,itemId:row.itemId,itemState:0};
		dispatch(addItem(data));
	}

	const deleteRow = row => {
		if (selectedRows.length > 1) {
			let data={isDelete:1,itemId:[]}
			selectedRows.forEach(elm => {
				data['itemId'].push(elm.itemId)
				// dispatch(addhomePage(data));
			})
			setSelectedRows([])
			// dispatch(addhomePage(data));
		} else {
			let data={isDelete:1,itemId:[row.itemId]};
			console.log(data);
			dispatch(addItem(data));
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'itemId',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'itemId')
		},
		{
			title: '名字',
			dataIndex: 'itemTitle',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'itemTitle')
		},
		{
			title: '图片',
			dataIndex: 'itemImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={200} type="square" src={record.itemImage[0]} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'itemImage')
		},
		// {
		// 	title: 'itemPrice',
		// 	dataIndex: 'itemPrice',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'itemPrice')
		// },
		// {
		// 	title: 'itemSalePrice',
		// 	dataIndex: 'itemSalePrice',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'itemSalePrice')
		// },
		{
			title: 'Show/Hide',
			dataIndex: 'isShowText',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'isShowText')
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
		// const searchArray = e.currentTarget.value ? list : homePageData
		const searchArray = itemData
		console.log(searchArray);
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	// const handleShowCategory = value => {
	// 	if (value !== 'All') {
	// 		const key = 'category'
	// 		const data = utils.filterArray(homePageData, key, value)
	// 		setList(data)
	// 	} else {
	// 		setList(homePageData)
	// 	}
	// }

	const itemData = useSelector(state => state.itemData.data);
	useEffect(() => {
		if (itemData == null) {
			// 0是photography 1 是partner
			let data = { isGet: 1};
			dispatch(getItem(data));
		}else if(itemData != null){
			setList(itemData);
		}
	}, [dispatch, itemData])
	const [list, setList] = useState(itemData)

	if (itemData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="Gallery"
			/>
			<Card>
				<Flex alignhomePages="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							{/* <Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} /> */}
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
						rowKey='id'
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
