/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { PageHeader, Card, Select, Button, Badge, Popconfirm, Tag,Row,Col,Statistic } from 'antd';
import OrderListData from "assets/data/order-list.data.json"
import Chart from "react-apexcharts";
import { COLORS } from 'constants/ChartConstant';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment';
import utils from 'utils'

import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from 'redux/actions/Statistics';


const { Option } = Select

const Orders = () => {
	const dispatch = useDispatch();

	const [list, setList] = useState(OrderListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleShowStatus = value => {
		if (value !== 'All') {
			const key = 'orderStateName'
			const data = utils.filterArray(OrderListData, key, value)
			setList(data)
		} else {
			setList(OrderListData)
		}
	}
	const [series, setseries] = useState([])
	const [options, setoptions] = useState({})
	// let series=[{
	// 	name: 'series1',
	// 	data: [31, 40, 28, 51, 42, 109, 100]
	// }, {
	// 	name: 'series2',
	// 	data: [11, 32, 45, 32, 34, 52, 41]
	// }]
	// let options={
	// 	dataLabels: {
	// 		enabled: false
	// 	},
	// 	colors: COLORS,
	// 	stroke: {
	// 		curve: 'smooth'
	// 	},
	// 	xaxis: {
	// 		type: 'datetime',
	// 		categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
	// 	},
	// 	tooltip: {
	// 		x: {
	// 			format: 'dd/MM/yy HH:mm'
	// 		},
	// 	},
	// }


	//获取订单信息
	const storeId = localStorage.getItem("storeId");
	const statisticsData = useSelector(state => state.statisticsData.data);
	//获取订单
	useEffect(() => {
		if (statisticsData == null) {
			let data = { isGet: 1, storeId: storeId};
			dispatch(getStatistics(data));
		}else{
			let series=[{
				name: 'userNum',
				data: statisticsData['month']['userNum']
			}, {
				name: 'orderNum',
				data: statisticsData['month']['orderNum']
			}, {
				name: 'orderPrice',
				data: statisticsData['month']['orderPrice']
			}]
			setseries(series);
			let tmpoptions={
				dataLabels: {
					enabled: false
				},
				colors: COLORS,
				stroke: {
					curve: 'smooth'
				},
				xaxis: {
					type: 'date',
					categories: statisticsData['month']['yearMonth']
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					},
				},
			}
			setoptions(tmpoptions);
		}
	}, [dispatch, statisticsData])

	if (statisticsData == null) {
		return "loading";
	}
	console.log(series);
	console.log(options);
	return (
		<>
			<PageHeader
				title="分析列表"
			/>
			<Card>
				<Row gutter={16}>
					<Col span={8}>
						<Statistic title="Active Users" value={statisticsData.userNum} />
					</Col>
					<Col span={8}>
						<Statistic title="Total Times" value={statisticsData.orderNum} />
					</Col>
					<Col span={8}>
						<Statistic title="Total Price" value={statisticsData.orderPrice} />
					</Col>
				</Row>
			</Card>
			<Chart
				options={options}
				series={series}
				type="area"
				height= {300}
			/>
		</>
	)
}

export default Orders;
