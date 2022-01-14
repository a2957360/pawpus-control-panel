import React, { useState,useEffect } from 'react'
import { Row, Col, Tabs,PageHeader, Card, Table, Button, Menu, Modal } from 'antd';
import { EyeOutlined, DeleteOutlined, FileDoneOutlined, PlusCircleOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'


import { useDispatch, useSelector } from "react-redux";
import { addHomePage, getHomePage } from 'redux/actions/homePage';
import SearchField from './search'
import FeatureField from './feature'
import SliderField from './slider'
import ServiceField from './service'
import ItemField from './item'



export default function FoodList() {
	const { TabPane } = Tabs;
	const dispatch = useDispatch();
	let history = useHistory();

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [searchPop, setsearchPop] = React.useState(false);
	const [featurePop, setfeaturePop] = React.useState(false);
	const [sliderPop, setsliderPop] = React.useState(false);
	const [servicePop, setservicePop] = React.useState(false);
	const [itemPop, setitemPop] = React.useState(false);
	const [componentId, setcomponentId] = React.useState([]);


	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignhomePages="center">
					<FileDoneOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			{
				row.pageState == 0 &&
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
			{/* <Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignhomePages="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item> */}
		</Menu>
	);

	const addProduct = () => {
		history.push(`/app/homepage-add`)
	}

	const viewDetails = row => {
		console.log(row);
		setcomponentId(row.componentId);
		switch (row.pageCode) {
			case "101":
				setsearchPop(true);
				break;
			case "102":
				setfeaturePop(true);
				break;
			case "103":
				setsliderPop(true);
				break;
			case "104":
				setservicePop(true);
				break;
			case "105":
				setitemPop(true);
				break;
			default:
				break;
		}
	}

	const hideRow = row => {
		let data={isChangeState:1,componentId:row.componentId,pageState:1};
		dispatch(addHomePage(data));
	}
	const showRow = row => {
		let data={isChangeState:1,componentId:row.componentId,pageState:0};
		dispatch(addHomePage(data));
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
			let data={isDelete:1,componentId:[row.componentId]};
			console.log(data);
			dispatch(addHomePage(data));
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'componentId',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'componentId')
		},
		// {
		// 	title: 'Image',
		// 	dataIndex: 'homePageImage',
		// 	render: (_, record) => (
		// 		<div className="d-flex">
		// 			{
		// 				<AvatarStatus size={200} type="square" src={record.image[0]} name={record.name} />
		// 			}
		// 		</div>
		// 	),
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'image')
		// },
		{
			title: 'Title',
			dataIndex: 'componentTitle',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'componentTitle')
		},
		{
			title: 'Show/Hide',
			dataIndex: 'pageStateText',
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
		const searchArray = homePageData
		console.log(searchArray);
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	// const handleShowCategory = value => {
	// 	if (value !== 'All') {
	// 		const key = 'category'
	// 		const data = utils.filterArray(homePageData, key, value)
	// 		setList(data)
	// 	} else {
	// 		setList(homePageData)
	// 	}
	// }

	const homePageData = useSelector(state => state.homePageData.data);
	useEffect(() => {
		if (homePageData == null) {
			let data = { isGet: 1};
			dispatch(getHomePage(data));
		}else if(homePageData != null){
			setList(homePageData);
		}
	}, [dispatch, homePageData])
	const [list, setList] = useState(homePageData)

	if (homePageData == null) {
		return "loading";
	}
	return (
		<>
			<PageHeader
				title="首页"
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
					<div>
						{/* <Button onClick={() => setaddpop(true)} type="primary" icon={<PlusCircleOutlined />} block>Add product</Button> */}
					</div>
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
			{/* <Modal width="80%" visible={addpop} footer={null} onCancel={() => setaddpop(false)}>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={7}>
						<Card title="Cover Image">

						</Card>
					</Col>
				</Row>
			</Modal> */}
			<Modal width="80%" visible={searchPop} footer={null} onCancel={() => setsearchPop(false)}>
				<SearchField componentId={componentId} mode={'EDIT'}></SearchField>
			</Modal>
			<Modal width="80%" visible={featurePop} footer={null} onCancel={() => setfeaturePop(false)}>
				<FeatureField  componentId={componentId} mode={'EDIT'}></FeatureField>
			</Modal>
			<Modal width="80%" visible={sliderPop} footer={null} onCancel={() => setsliderPop(false)}>
				<SliderField  componentId={componentId} mode={'EDIT'}></SliderField>
			</Modal>
			<Modal width="80%" visible={servicePop} footer={null} onCancel={() => setservicePop(false)}>
				<ServiceField componentId={componentId} mode={'EDIT'}></ServiceField>
			</Modal>
			<Modal width="80%" visible={itemPop} footer={null} onCancel={() => setitemPop(false)}>
				<ItemField  componentId={componentId} mode={'EDIT'}></ItemField>
			</Modal>
		</>
	)
}
