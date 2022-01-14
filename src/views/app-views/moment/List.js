import React, { useState,useEffect } from 'react'
import { PageHeader, Card, Table, Select, Input, Button, Menu } from 'antd';
import { EyeOutlined, DeleteOutlined, FileDoneOutlined, PlusCircleOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'
import { SearchOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from "react-redux";
import { addMoment, getMoment } from 'redux/actions/moment';


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
			} */}
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignhomePages="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const addProduct = () => {
		history.push(`/app/moment-add`)
	}

	const viewDetails = row => {
		history.push(`/app/moment-edit/${row.momentId}`)
	}

	// const hideRow = row => {
	// 	let data={isChangeState:1,id:row.id,isShow:0};
	// 	dispatch(addGallery(data));
	// }
	// const showRow = row => {
	// 	let data={isChangeState:1,id:row.id,isShow:1};
	// 	dispatch(addGallery(data));
	// }

	const deleteRow = row => {
		if (selectedRows.length > 1) {
			let data={isDelete:1,momentId:[]}
			selectedRows.forEach(elm => {
				data['momentId'].push(elm.id)
				// dispatch(addhomePage(data));
			})
			setSelectedRows([])
			// dispatch(addhomePage(data));
		} else {
			let data={isDelete:1,momentId:row.momentId};
			console.log(data);
			dispatch(addMoment(data));
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'momentId',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'momentId')
		},
		{
			title: '标题',
			dataIndex: 'momentTitle',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'momentTitle')
		},
		{
			title: '图片',
			dataIndex: 'momentImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={200} type="square" src={record.momentImage[0]} />
				</div>
			),
		},
		{
			title: '内容',
			dataIndex: 'momentContent',
		},
		{
			title: '发布者',
			dataIndex: 'userName',
		},
		{
			title: '发布者头像',
			dataIndex: 'userImage',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={100} type="square" src={record.userImage} />
				</div>
			),
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
		const searchArray = momentData
		console.log(searchArray);
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const momentData = useSelector(state => state.momentData.data);
	useEffect(() => {
		if (momentData == null) {
			// 0是photography 1 是partner
			let data = { isGet: 1};
			dispatch(getMoment(data));
		}else if(momentData != null){
			setList(momentData);
		}
	}, [dispatch, momentData])
	const [list, setList] = useState(momentData)

	if (momentData == null) {
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
						{/* <Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block>Add product</Button> */}
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={list}
						// rowKey='id'
						// rowSelection={{
						// 	selectedRowKeys: selectedRowKeys,
						// 	type: 'checkbox',
						// 	preserveSelectedRowKeys: false,
						// 	...rowSelection,
						// }}
					/>
				</div>
			</Card>
		</>
	)
}
