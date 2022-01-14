import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

let children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}123</Option>);
// }

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

class SelectSizesDemo extends React.Component {

  constructor(props) {
		super(props);
    this.props= props;
    children = props.attributeData;
  }
  
  state = {
    size: 'default',
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div>

        <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
          defaultValue={[]}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
        <br />

      </div>
    );
  }
}

export default SelectSizesDemo;