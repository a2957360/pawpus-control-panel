import React, { useEffect } from 'react'
import { Row, Col, Descriptions,  } from 'antd';

import { useDispatch, useSelector } from "react-redux";


export default function FoodForm(props) {
	const dispatch = useDispatch();

	// const [form] = Form.useForm();
	// const [bgImg, setbgImage] = useState('');
	// const [uploadLoading, setUploadLoading] = useState(false)
	// const [submitLoading, setSubmitLoading] = useState(false)
	// //修改的产品id
	// let [editId, seteditId] = React.useState(0);
	const { orderInfo } = props;



	const onFinish = () => {

	};

	//获取产品信息
	const categoryData = useSelector(state => state.categoryData.data);
	//编辑时设定值
	useEffect(() => {

	}, [props, categoryData]);


	return (
		<>
			<Row gutter={16}>
				<Col span={24}>
					<Descriptions
						title="订单信息"
						bordered
						layout="vertical"
						column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
					>
						<Descriptions.Item label="订单编号" span={2}>{orderInfo.orderNo}</Descriptions.Item>
						<Descriptions.Item label="用户名称" span={2}>{orderInfo.userName}</Descriptions.Item>
						<Descriptions.Item label="商品总价">{orderInfo.subTotal}</Descriptions.Item>
						<Descriptions.Item label="税">{orderInfo.tax}</Descriptions.Item>
						<Descriptions.Item label="配送费">{orderInfo.deliverPrice}</Descriptions.Item>
						<Descriptions.Item label="优惠">{orderInfo.coupon}</Descriptions.Item>
						<Descriptions.Item label="总价">{orderInfo.total}</Descriptions.Item>
						<Descriptions.Item label="支付方式">{orderInfo.paymentType}</Descriptions.Item>
						<Descriptions.Item label="退款">{orderInfo.refundPrice}</Descriptions.Item>
					</Descriptions>
				</Col>
				{orderInfo.itemList.map((item,index) => (
					<Col span={24}>
						<Descriptions
							title={"商品" + (index+1)}
							bordered
							column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
						>
							<Descriptions.Item label="商品名称" span={2}>{item.itemTitle}</Descriptions.Item>
							<Descriptions.Item label="商品名称" span={2}>{item.itemOptionName}</Descriptions.Item>
							<Descriptions.Item label="商品价格" span={2}>{item.itemOptionPrice}</Descriptions.Item>
							<Descriptions.Item label="商品促销价" span={2}>{item.itemOptionSalePrice}</Descriptions.Item>
							<Descriptions.Item label="购买数量" span={1}>{item.itemQuantity}</Descriptions.Item>
							<Descriptions.Item label="商品总价" span={1}>{item.subTotal}</Descriptions.Item>
							<Descriptions.Item label="税" span={1}>{item.tax}</Descriptions.Item>
							<Descriptions.Item label="总计" span={1}>{item.total}</Descriptions.Item>
						</Descriptions>
					</Col>
				))}
			</Row>
		</>
	)
}
