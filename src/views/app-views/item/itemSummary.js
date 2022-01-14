import React, { useState, useEffect } from 'react'
import { PageHeader, Card, Table, Select, InputNumber, Button, Statistic } from 'antd';
import { EyeOutlined, DeleteOutlined, FileDoneOutlined, PlusCircleOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'


import { useDispatch, useSelector } from "react-redux";
import { getSummary } from 'redux/actions/itemOrder';
import { addExchange } from 'redux/actions/exchange';


export default function FoodList() {
	const dispatch = useDispatch();
	let history = useHistory();

	const [exchangePrice, setexchangePrice] = useState(0)

	const cashBack = () => {
		let data = { exchangePrice: exchangePrice, userId: 0 };
		dispatch(addExchange(data));
		data = { isGetSummary: 1 };
		dispatch(getSummary(data));
	}

	// const showRow = row => {
	// 	let data={isChangeState:1,itemId:row.itemId,itemState:0};
	// 	dispatch(addItem(data));
	// }

	const tableColumns = [
		{
			title: '时间',
			dataIndex: 'createTime',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'createTime')
		},
		{
			title: '金额',
			dataIndex: 'total',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'total')
		},
		{
			title: '卖家/原因',
			dataIndex: 'userName',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'userName')
		},
	];


	const summaryData = useSelector(state => state.itemOrderData.summaryData);
	useEffect(() => {
		if (summaryData == null) {
			// 0是photography 1 是partner
			let data = { isGetSummary: 1 };
			dispatch(getSummary(data));
		} else if (summaryData != null) {
			setList(summaryData.list);
		}
	}, [dispatch, summaryData])
	const [list, setList] = useState()

	if (summaryData == null) {
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
							<Statistic prefix="现有余额 $" value={summaryData.total} precision={2} />
						</div>
						<div className="mr-md-3 mb-3">
							<InputNumber
								defaultValue={exchangePrice}
								min={0}
								max={summaryData.total}
								formatter={value => `$${value}`}
								onChange={setexchangePrice}
							/>
						</div>
						<div className="mb-3">
							<Button type="primary" htmlType="submit" onClick={() => cashBack()}>
								返现
        					</Button>
						</div>
					</Flex>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={list}
						rowKey='id'
					/>
				</div>
			</Card>
		</>
	)
}
