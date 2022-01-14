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

class EditableTable extends React.Component {
	constructor(props) {
		super(props);
		this.props= props;
		this.columns = [
			{
				title: '选项名称',
				dataIndex: 'optionName',
				width: '30%',
				editable: true,
			},
			{
				title: '选项价格',
				dataIndex: 'optionPrice',
				editable: true,

			},
			{
				title: 'operation',
				dataIndex: 'operation',
				render: (text, record) =>
					this.state.dataSource.length >= 1 ? (
						<Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
							<a>Delete</a>
						</Popconfirm>
					) : null,
			},
		];
		console.log(props);
		this.state = {
			dataSource: props.tableData,
			count: 0,
		};
	}

	handleDelete = key => {
		const dataSource = [...this.state.dataSource];
		this.setState({
			dataSource: dataSource.filter(item => item.key !== key),
		});
		this.props.sendBack(dataSource.filter(item => item.key !== key));
	};

	handleAdd = () => {
		const { count, dataSource } = this.state;
		const newData = {
			key: count,
			optionName: `选项 ${count}`,
			optionPrice: 0,
		};
		this.setState({
			dataSource: [...dataSource, newData],
			count: count + 1,
		});
		let data = dataSource;
		data.push(newData);
		this.props.sendBack(data);
	};

	handleSave = row => {
		const newData = [...this.state.dataSource];
		const index = newData.findIndex(item => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		this.setState({
			dataSource: newData,
		});
		this.props.sendBack(this.state.dataSource);
	};

	render() {
		// const { dataSource } = this.state;
		const  dataSource  = this.state.dataSource;
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
				<Button
					onClick={this.handleAdd}
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					Add a row
		  </Button>
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