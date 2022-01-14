import React, { Component } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import { connect } from "react-redux";
import ThemeConfigurator from 'components/layout-components/ThemeConfigurator';
import NavLanguage from 'components/layout-components/NavLanguage';


export class NavPanel extends Component {
	state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
	};
	
	render() {
		return (
      <>
        <Menu mode="horizontal">
          <Menu.Item onClick={this.showDrawer}>
            <SettingOutlined className="nav-icon mr-0" />
          </Menu.Item>
        </Menu>
        <NavLanguage></NavLanguage>
        <Drawer
          title="Theme Config"
          placement="right"
          width={350}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ThemeConfigurator></ThemeConfigurator>
        </Drawer>
      </>
    );
	}
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default connect(mapStateToProps)(NavPanel);