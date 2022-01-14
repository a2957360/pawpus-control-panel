import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef();
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};

	const save = async e => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
				<div
					className="editable-cell-value-wrap"
					style={{
						paddingRight: 24,
					}}
					onClick={toggleEdit}
				>
					{children}
				</div>
			);
	}

	return <td {...restProps}>{childNode}</td>;
};
const storeId = localStorage.getItem("storeId");

class EditableTable extends React.Component {

	constructor(props) {
		super(props);
		this.props= props;
		this.columns = props.columns;
		this.state = {
			dataSource: props.dataSource,
			count: 0,
		};
	}
	handleDelete = key => {
		const dataSource = [...this.state.dataSource];
		this.setState({
			dataSource: dataSource.filter(item => item.key !== key),
		});
		// this.props.handleApi(row);
	};

	// handleAdd = () => {
	// 	const { count, dataSource } = this.state;
	// 	const newData = {
	// 		key: count,
	// 		storeId:storeId,
	// 		categoryName: `新分类`,
	// 	};
	// 	this.setState({
	// 		dataSource: [...dataSource, newData],
	// 		count: count + 1,
	// 	});
	// 	this.props.handleApi(newData);
	// };

	handleSave = row => {
		//row就是数据
		console.log(row);
		this.props.handleApi(row);
	};

	render() {
		const { dataSource } = this.state;
		console.log(dataSource);
		const components = {
			body: {
				row: EditableRow,
				cell: EditableCell,
			},
		};
		const columns = this.columns.map(col => {
			if (!col.editable) {
				return col;
			}

			return {
				...col,
				onCell: record => ({
					record,
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
					handleSave: this.handleSave,
				}),
			};
		});

		return (
			<div>

				<Table
					components={components}
					rowClassName={() => 'editable-row'}
					bordered
					dataSource={dataSource}
					columns={columns}
				/>
			</div>
		);
	}
}
export default EditableTable;