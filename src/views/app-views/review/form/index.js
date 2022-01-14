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
						column={{ xxl: 6, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
					>
						<Descriptions.Item label="订单编号" span={2}>{orderInfo.serviceOrderNo}</Descriptions.Item>
						<Descriptions.Item label="用户名称" span={2}>{orderInfo.userName}</Descriptions.Item>
						<Descriptions.Item label="服务者名称" span={2}>{orderInfo.serverName}</Descriptions.Item>
						<Descriptions.Item label="服务分类">{orderInfo.categoryName}</Descriptions.Item>
						<Descriptions.Item label="寄样数量">{orderInfo.servicePetNumber}</Descriptions.Item>
						<Descriptions.Item label="开始日期">{orderInfo.orderStartDate}</Descriptions.Item>
						<Descriptions.Item label="结束日期">{orderInfo.orderEndDate}</Descriptions.Item>
						<Descriptions.Item label="总价">{orderInfo.serviceOrderTotalPrice}</Descriptions.Item>
					</Descriptions>
				</Col>
				{orderInfo.serviceOrderPetInfo.map((item,index) => (
					<Col span={24}>
						<Descriptions
							title={"宠物" + (index+1)}
							bordered
							column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
						>
							<Descriptions.Item label="宠物名字" span={2}>{item.petName}</Descriptions.Item>
							{/* <Descriptions.Item label="宠物照片" span={2}>{item.petImage[0]}</Descriptions.Item> */}
							<Descriptions.Item label="宠物类别" span={2}>{item.petType}</Descriptions.Item>
							<Descriptions.Item label="宠物品种" span={2}>{item.petVariety}</Descriptions.Item>
							<Descriptions.Item label="宠物年龄" span={1}>{item.petAge}</Descriptions.Item>
							<Descriptions.Item label="宠物性别" span={1}>{item.petGender}</Descriptions.Item>
							<Descriptions.Item label="是否绝育" span={1}>{item.isOperated}</Descriptions.Item>
							<Descriptions.Item label="描述" span={1}>{item.petDescription}</Descriptions.Item>
						</Descriptions>
					</Col>
				))}
			</Row>
		</>
	)
}
