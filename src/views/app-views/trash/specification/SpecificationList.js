import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Card, Button, Divider, Table, Tag,Popconfirm } from 'antd';
import Flex from 'components/shared-components/Flex';
import { PlusCircleOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from "react-redux";
import { getAttribute } from 'redux/actions/Attribute';

export default function Specification() {
	let history = useHistory();
	const dispatch = useDispatch();

	const storeId = localStorage.getItem("storeId");

	//获取规格信息
	const attributeData = useSelector(state => state.attributeData.data);

	const columns = [
		{
			title: '名称',
			dataIndex: 'attributeName',
			key: 'attributeName',
			render: text => text,
		},
		{
			title: '类型',
			dataIndex: 'attributeTypeName',
			key: 'attributeTypeName',
			render: text => text,
		},
		{
			title: '选项',
			key: 'optionListShow',
			dataIndex: 'optionListShow',
			render: optionListShow => (
				<span>
					{
					optionListShow != null &&
					optionListShow.map(tag => {
						// let color = tag.length > 5 ? 'geekblue' : 'green';
						let color = 'geekblue';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{/* {tag.toUpperCase()} */}
								{tag}
							</Tag>
						);
					})}
				</span>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<>

					<Button type="primary" onClick={()=>viewDetails(record['attributeId'])}>
						编辑
			        </Button >

					<Divider type="vertical" />
					<Popconfirm title="确认删除" onConfirm={()=>deleteAttribute(record['attributeId'])} okText="是" cancelText="否">
						<Button type="primary" >
							删除
						</Button >
					</Popconfirm>
				</>
			),
		},
	];

	const addProduct = () => {
		history.push(`/app/specification-add`)
	}

	const viewDetails = row => {
		history.push(`/app/specification-edit/${row}`)
	}

	const deleteAttribute = rowid => {
		let data = { isDelete: 1, attributeId: [rowid] };
		dispatch(getAttribute(data));
		// history.push(`/app/specification-edit/${row.id}`)
	}
	//获取规格
	useEffect(() => {
		if (attributeData == null) {
			let data = { isGet: 1, storeId: storeId };
			dispatch(getAttribute(data));
		}
	}, [dispatch, attributeData,storeId])

	if (attributeData == null) {
		return "loading";
	}
	console.log(attributeData);
	return (
		<>
			<PageHeader
				title="规格管理"
			/>
			<Card>
				<Flex alignItems="center" justifyContent="end" mobileFlex={false}>
					<div>
						<Button
							onClick={addProduct}
							type="primary"
							icon={<PlusCircleOutlined />}
							block
						>
							添加规格
					</Button>
					</div>
				</Flex>

				<Table columns={columns} dataSource={attributeData} />
			</Card>
			
		</>
	)
}