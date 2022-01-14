/* eslint-disable no-unused-vars */
import React from 'react'
import { PageHeader} from 'antd';
import { useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import {
    LOG_OUT,
  } from 'redux/constants/ActionType';

const Orders = () => {
	const dispatch = useDispatch();
    const history = useHistory();

    localStorage.removeItem("adminId");
    localStorage.removeItem("adminType");
    
    history.push(`/auth/login`)
    dispatch({ type: LOG_OUT });
	return (
		<>
			<PageHeader
				title="正在退出。。。"
			/>
		</>
	)
}

export default Orders;
