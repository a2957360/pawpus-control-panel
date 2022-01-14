import React, { useEffect } from 'react'
import { Row, Col, Descriptions, Button,Popconfirm,message } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { changeServiceOrder } from 'redux/actions/serviceOrder';

export default function FoodForm(props) {
	const dispatch = useDispatch();

	// const [form] = Form.useForm();
	// const [bgImg, setbgImage] = useState('');
	// const [uploadLoading, setUploadLoading] = useState(false)
	// const [submitLoading, setSubmitLoading] = useState(false)
	// //修改的产品id
	// let [editId, seteditId] = React.useState(0);
	const { orderInfo } = props;

	const handleSend = (info) => {
		let data = info;
		dispatch(changeServiceOrder(data));
		message.success(`修改订单成功`);
		props.closePop();
		if(info.orderState == 5){
			window.open("https://stripe.com/en-ca");
		}
	}

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
						column={{ xxl: 6, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
					>
						<Descriptions.Item label="订单编号" span={2}>{orderInfo.serviceOrderNo}</Descriptions.Item>
						<Descriptions.Item label="用户名称" span={2}>{orderInfo.userName}</Descriptions.Item>
						<Descriptions.Item label="服务者名称" span={2}>{orderInfo.serverName}</Descriptions.Item>
						<Descriptions.Item label="服务分类">{orderInfo.categoryName.zh}</Descriptions.Item>
						<Descriptions.Item label="寄样数量">{orderInfo.servicePetNumber}</Descriptions.Item>
						<Descriptions.Item label="开始日期">{orderInfo.orderStartDate}</Descriptions.Item>
						<Descriptions.Item label="结束日期">{orderInfo.orderEndDate}</Descriptions.Item>
						<Descriptions.Item label="总价">{orderInfo.serviceOrderTotalPrice}</Descriptions.Item>
					</Descriptions>
				</Col>
				{orderInfo.serviceOrderPetCard.map((item,index) => (
					<Col span={24}>
						<Descriptions
							title={"宠物" + (index+1)}
							bordered
							column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
						>
							<Descriptions.Item label="宠物名字" >{item.petName}</Descriptions.Item>
							{/* <Descriptions.Item label="宠物照片" span={2}>{item.petImage[0]}</Descriptions.Item> */}
							<Descriptions.Item label="宠物类别" >{item.petType.zh}</Descriptions.Item>
							<Descriptions.Item label="宠物品种" >{item.petVariety}</Descriptions.Item>
							<Descriptions.Item label="宠物年龄" >{item.petAge}</Descriptions.Item>
							<Descriptions.Item label="宠物性别" >{item.petGender==0?"母":"公"}</Descriptions.Item>
							<Descriptions.Item label="是否绝育" >{item.isOperated==0?"未绝育":"已绝育"}</Descriptions.Item>
							<Descriptions.Item label="描述" >{item.petDescription}</Descriptions.Item>
						</Descriptions>
					</Col>
				))}
				<Col span={24}>
					<div className="mt-3">
						{
							orderInfo.orderStateNo > 0 &&
							orderInfo.orderStateNo < 4 &&
							<Popconfirm title="确认取消?" onConfirm={() => handleSend({changeOrderState:1, serviceOrderId: orderInfo.serviceOrderId, orderState: 5 })} okText="是" cancelText="否">
								<Button type="primary" htmlType="submit">
									取消订单
								</Button>
							</Popconfirm>
						}
					</div>
				</Col>
			</Row>
		</>
	)
}
