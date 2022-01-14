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
import { getPet } from 'redux/actions/pet';
import { get } from 'lodash';

export default function FoodList(props) {
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
			</Menu.Item>
		</Menu>
	);

	const addItem = () => {
		history.push(`/app/service-add`)
	}

	const viewDetails = row => {
		history.push(`/app/service-edit/${row.serviceId}`)
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
			title: '图片',
			dataIndex: 'petImage',
			render: (_, record) => (
				<div className="d-flex">
					{
						<AvatarStatus size={100} type="square" src={record.petImage} />
					}
				</div>
			),
		},
		{
			title: '名字',
			dataIndex: 'petName',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'petName')
		},
		{
			title: '类型',
			dataIndex: ['petType','zh'],
			sorter: (a, b) => utils.antdTableSorter(a, b, 'petType')
		},
		{
			title: '品种',
			dataIndex: 'petVariety',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'servicePrice')
		},
		{
			title: '年龄',
			dataIndex: 'petAge',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'serviceCity')
		},
		{
			title: '公母',
			dataIndex: 'petGender',
		},
		{
			title: '绝育状态',
			dataIndex: 'isOperated',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'isOperated')
		},
		{
			title: '重量',
			dataIndex: 'petWeight',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'petWeight')
		},
		{
			title: '描述',
			width:'25%',
			dataIndex: 'petDescription',
		},
		{
			title: '安全文件',
			dataIndex: 'petPortfolio',
			render: (_, record) => (
				<div className="d-flex">
					{
						record.petPortfolio != null &&
						record.petPortfolio.map(item=>{
							return(
								<a href={item}>安全文件</a>
							)
						})
					}

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
		const searchArray = petData
		console.log(searchArray);
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const petData = useSelector(state => state.petData.data);

	useEffect(() => {
		let data = { isGet: 1,userId:props.userId};
		dispatch(getPet(data));
	}, [dispatch])
	useEffect(() => {
		if(petData != null){
			setList(petData);
		}
	}, [petData])
	const [list, setList] = useState(petData)

	if (petData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="服务"
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
					/>
				</div>
			</Card>
		</>
	)
}
