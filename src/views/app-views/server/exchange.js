import React, { useState,useEffect } from 'react'
import { PageHeader, Card, Table, Select, Input, Button, Menu } from 'antd';
import { CheckOutlined , CloseOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'


import { useDispatch, useSelector } from "react-redux";
import { getExchange,addExchange } from 'redux/actions/exchange';

export default function FoodList() {
	const dispatch = useDispatch();
	let history = useHistory();

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => confirm(row)}>
				<Flex alignhomePages="center">
					<CheckOutlined />
					<span className="ml-2">转账完成</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => cancel(row)}>
				<Flex alignhomePages="center">
					<CloseOutlined />
					<span className="ml-2">取消</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	const confirm = row => {
		let data={isFinish:1,exchangeId:row.exchangeId};
		dispatch(addExchange(data));
	}
	const cancel = row => {
		let data={isCancel:1,exchangeId:row.exchangeId};
		dispatch(addExchange(data));
	}


	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'exchangeId',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'exchangeId')
		},
		{
			title: '提现日期',
			dataIndex: 'createTime',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'createTime')
		},
		{
			title: '头像',
			dataIndex: 'userImage',
			render: (_, record) => (
				<div className="d-flex">
					{
						<AvatarStatus size={100} type="square" src={record.userImage} />
					}
				</div>
			),
		},
		{
			title: '用户名',
			dataIndex: 'userName',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userName')
		},
		{
			title: '提现价格',
			dataIndex: 'exchangePrice',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'exchangePrice')
		},
		{
			title: '提现邮箱',
			dataIndex: 'exchangeEmail',
		},
		{
			title: '提现密码',
			dataIndex: 'exchangePassword',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'exchangePassword')
		},
		{
			title: '状态',
			dataIndex: 'exchangeStateDisplay',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'exchangeStateDisplay')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				elm.exchangeState == 0&&
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
	// const handleShowCategory = value => {
	// 	if (value !== 'All') {
	// 		const key = 'category'
	// 		const data = utils.filterArray(homePageData, key, value)
	// 		setList(data)
	// 	} else {
	// 		setList(homePageData)
	// 	}
	// }

	const exchangeData = useSelector(state => state.exchangeData.data);

	useEffect(() => {
		if (exchangeData == null) {
			// 	0:未激活;1：普通用户;2:服务者信息草稿;3:服务者待审核;4:服务者;5:黑名单	
			let data = { isGet: 1};
			dispatch(getExchange(data));
		}else if(exchangeData != null){
			setList(exchangeData);
		}
	}, [dispatch, exchangeData])
	const [list, setList] = useState(exchangeData)

	if (exchangeData == null) {
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
						</div>
						<div className="mb-3">
						</div>
					</Flex>
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
