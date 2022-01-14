import React from 'react'
import { Col, Row, DatePicker,Button  } from 'antd';
import Statistic from '../itemOrderStatistic/List';
import moment from 'moment';

export default function EditProduct(props) {
	const { RangePicker } = DatePicker;
	const today = moment().format('YYYY-MM-DD');
	const tommorrow = moment(today).add(+1, 'days');
	const yesterday = moment(new Date()).add(-1, 'days');
	let [startDate, setstartDate] = React.useState(today);
	let [endDate, setendDate] = React.useState(tommorrow);

	const changeTime = (date) =>{
		setstartDate(date);
		setendDate(date);
	}

	function onChange(value, dateString) {
		setstartDate(dateString[0]);
		setendDate(dateString[1]);
	}

	return (
		<>
			<Row gutter={6}>
				<Col><Button onClick={()=>changeTime(today)} >今天</Button></Col>
				<Col><Button onClick={()=>changeTime(yesterday)}>昨天</Button></Col>
				<Col><RangePicker onChange={onChange} value={[moment(startDate),moment(endDate)]}/></Col>
			</Row>
			<Statistic
				startDate={startDate}
				endDate={endDate}
			/>
		</>
	)
}
