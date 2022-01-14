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
import { getValidServer,getWaitServer } from 'redux/actions/Server';

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
			{/* {
				row.isShow == 1 &&
				<Menu.Item onClick={() => hideRow(row)}>
					<Flex alignhomePages="center">
						<EyeInvisibleOutlined />
						<span className="ml-2">Hide</span>
					</Flex>
				</Menu.Item>
				||
				<Menu.Item onClick={() => showRow(row)}>
					<Flex alignhomePages="center">
						<EyeOutlined />
						<span className="ml-2">Show</span>
					</Flex>
				</Menu.Item>
			}
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignhomePages="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item> */}
		</Menu>
	);

	const addItem = () => {
		history.push(`/app/server-add`)
	}

	const viewDetails = row => {
		history.push(`/app/server-edit/${row.userId}`)
	}

	const hideRow = row => {
		let data={isChangeState:1,id:row.id,isShow:0};
		// dispatch(addBlog(data));
	}
	const showRow = row => {
		let data={isChangeState:1,id:row.id,isShow:1};
		// dispatch(addBlog(data));
	}

	const deleteRow = row => {
		if (selectedRows.length > 1) {
			let data={isDelete:1,id:[]}
			selectedRows.forEach(elm => {
				data['id'].push(elm.id)
				// dispatch(addhomePage(data));
			})
			setSelectedRows([])
			// dispatch(addhomePage(data));
		} else {
			let data={isDelete:1,id:[row.id]};
			console.log(data);
			// dispatch(addBlog(data));
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'userId',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userId')
		},
		{
			title: '头像',
			dataIndex: 'homePageImage',
			render: (_, record) => (
				<div className="d-flex">
					{
						<AvatarStatus size={100} type="square" src={record.userImage} />
					}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'image')
		},
		{
			title: '用户名',
			dataIndex: 'userName',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userName')
		},
		{
			title: '电话',
			dataIndex: 'userPhone',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userPhone')
		},
		{
			title: '星级',
			dataIndex: 'serverStar',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'serverStar')
		},
		{
			title: '标签',
			dataIndex: 'serverLevel',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'serverLevel')
		},
		{
			title: '销售额',
			dataIndex: 'orderTotal',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'orderTotal')
		},
		
		// {
		// 	title: '价格',
		// 	dataIndex: 'homePagePrice',
		// 	render: price => (
		// 		<div>
		// 			<NumberFormat
		// 				displayType={'text'}
		// 				value={(Math.round(price * 100) / 100).toFixed(2)}
		// 				prefix={'$'}
		// 				thousandSeparator={true}
		// 			/>
		// 		</div>
		// 	),
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'homePagePrice')
		// },
		// {
		// 	title: 'Stock',
		// 	dataIndex: 'stock',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		// },
		// {
		// 	title: 'Status',
		// 	dataIndex: 'stock',
		// 	render: stock => (
		// 		<Flex alignhomePages="center">{getStockStatus(stock)}</Flex>
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
		// const searchArray = e.currentTarget.value ? list : homePageData
		const searchArray = serverWaitData
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

	const serverWaitData = useSelector(state => state.serverData.waitData);

	useEffect(() => {
		if (serverWaitData == null) {
			// 	0:未激活;1：普通用户;2:服务者信息草稿;3:服务者待审核;4:服务者;5:黑名单	
			let data = { isGet: 1,userState:5};
			console.log(data);
			dispatch(getWaitServer(data));
		}else if(serverWaitData != null){
			setList(serverWaitData);
		}
	}, [dispatch, serverWaitData])
	useEffect(() => {
		// 	0:未激活;1：普通用户;2:服务者信息草稿;3:服务者待审核;4:服务者;5:黑名单	
		let data = { isGet: 1,userState:5};
		console.log(data);
		dispatch(getWaitServer(data));
	}, [dispatch])
	const [list, setList] = useState(serverWaitData)

	if (serverWaitData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="服务商家"
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
					{/* <div>
						<Button onClick={addItem} type="primary" icon={<PlusCircleOutlined />} block>Add product</Button>
					</div> */}
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
