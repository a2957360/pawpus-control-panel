import React from 'react'
import {
  DashboardOutlined,
  ShopOutlined,
  ContainerOutlined,
  UnorderedListOutlined,
  FireOutlined,
  QrcodeOutlined,
  FileImageOutlined,
  SolutionOutlined,
  ProfileOutlined,
  BarChartOutlined,
  UserOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const NavigationConfig = () => {

  const adminType = localStorage.getItem("adminType");
  let submenu = [];
  console.log("enter menu");
  if (adminType == 1) {
    submenu = [
      {
        key: 'user',
        path: `${APP_PREFIX_PATH}/user`,
        title: 'user',
        icon: BarChartOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'homepage',
        path: `${APP_PREFIX_PATH}/homepage`,
        title: 'homepage',
        icon: BarChartOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'shop',
        path: `${APP_PREFIX_PATH}/shop`,
        title: 'shop',
        icon: BarChartOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'itemCategory',
            path: `${APP_PREFIX_PATH}/itemCategory`,
            title: 'itemCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'itemSubCategory',
            path: `${APP_PREFIX_PATH}/itemSubCategory`,
            title: 'itemSubCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'petCategory',
            path: `${APP_PREFIX_PATH}/petCategory`,
            title: 'petCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'petSubCategory',
            path: `${APP_PREFIX_PATH}/petSubCategory`,
            title: 'petSubCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'deliver',
            path: `${APP_PREFIX_PATH}/deliver`,
            title: 'deliver',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'item',
            path: `${APP_PREFIX_PATH}/item`,
            title: 'item',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'itemOrder',
            path: `${APP_PREFIX_PATH}/itemOrder`,
            title: 'itemOrder',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'itemStatistic',
            path: `${APP_PREFIX_PATH}/itemStatistic`,
            title: 'itemStatistic',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'itemSummary',
            path: `${APP_PREFIX_PATH}/itemSummary`,
            title: 'itemSummary',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }
  
        ]
      },
      {
        key: 'serviceTab',
        path: `${APP_PREFIX_PATH}/serviceTab`,
        title: 'serviceTab',
        icon: BarChartOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'category',
            path: `${APP_PREFIX_PATH}/serviceCategory`,
            title: 'category',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'subCategory',
            path: `${APP_PREFIX_PATH}/serviceSubCategory`,
            title: 'subCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'serviceExtra',
            path: `${APP_PREFIX_PATH}/serviceExtra`,
            title: 'serviceExtra',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'serviceFacility',
            path: `${APP_PREFIX_PATH}/serviceFacility`,
            title: 'serviceFacility',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, 
          // {
          //   key: 'serviceHouseType',
          //   path: `${APP_PREFIX_PATH}/serviceHouseType`,
          //   title: 'serviceHouseType',
          //   icon: BarChartOutlined,
          //   breadcrumb: false,
          //   submenu: []
          // }, 
          {
            key: 'serviceConfig',
            path: `${APP_PREFIX_PATH}/serviceConfig`,
            title: 'serviceConfig',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }
        ]
      },
      {
        key: 'server',
        path: `${APP_PREFIX_PATH}/service`,
        title: 'server',
        icon: BarChartOutlined,
        breadcrumb: false,
        submenu: [
  
          {
            key: 'serverList',
            path: `${APP_PREFIX_PATH}/server`,
            title: 'serverList',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'serverBlock',
            path: `${APP_PREFIX_PATH}/serverBlock`,
            title: 'serverBlockList',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'serverWait',
            path: `${APP_PREFIX_PATH}/serverWait`,
            title: 'serverWait',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'orderList',
            path: `${APP_PREFIX_PATH}/orderList`,
            title: 'orderList',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'review',
            path: `${APP_PREFIX_PATH}/review`,
            title: 'review',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'serviceStatistic',
            path: `${APP_PREFIX_PATH}/serviceStatistic`,
            title: 'serviceStatistic',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'serverExchange',
            path: `${APP_PREFIX_PATH}/serverExchange`,
            title: 'serverExchange',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }
  
        ]
      },
      {
        key: 'coupon',
        path: `${APP_PREFIX_PATH}/coupon`,
        title: 'coupon',
        icon: FileImageOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'momentList',
        path: `${APP_PREFIX_PATH}/momentList`,
        title: 'momentList',
        icon: BarChartOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'moment',
            path: `${APP_PREFIX_PATH}/moment`,
            title: 'moment',
            icon: FileImageOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'momentReport',
            path: `${APP_PREFIX_PATH}/momentReport`,
            title: 'momentReport',
            icon: FileImageOutlined,
            breadcrumb: false,
            submenu: []
          },
        ]
      },

      {
        key: 'postcategory',
        title: 'postcategory',
        icon: BarChartOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'post',
            path: `${APP_PREFIX_PATH}/post`,
            title: 'post',
            icon: FileImageOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'postOtherList',
            path: `${APP_PREFIX_PATH}/postOtherList`,
            title: 'postOtherList',
            icon: FileImageOutlined,
            breadcrumb: false,
            submenu: []
          },
        ]
      },
      {
        key: 'media',
        path: `${APP_PREFIX_PATH}/media`,
        title: 'media',
        icon: FileImageOutlined,
        breadcrumb: false,
        submenu: []
      },
      // {
      //   key: 'account',
      //   path: `${APP_PREFIX_PATH}/account`,
      //   title: '修改密码',
      //   icon: FileImageOutlined,
      //   breadcrumb: false,
      //   submenu: []
      // },
      {
        key: 'admin',
        path: `${APP_PREFIX_PATH}/admin`,
        title: 'admin',
        icon: FileImageOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'companyConfig',
        path: `${APP_PREFIX_PATH}/companyConfig`,
        title: 'companyConfig',
        icon: FileImageOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'logout',
        path: `${APP_PREFIX_PATH}/logout`,
        title: 'logout',
        breadcrumb: false,
        submenu: []
      }
    ]
  } else {
    submenu = [    
      {
        key: 'shop',
        path: `${APP_PREFIX_PATH}/shop`,
        title: 'shop',
        icon: BarChartOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'itemCategory',
            path: `${APP_PREFIX_PATH}/itemCategory`,
            title: 'itemCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'itemSubCategory',
            path: `${APP_PREFIX_PATH}/itemSubCategory`,
            title: 'itemSubCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'petCategory',
            path: `${APP_PREFIX_PATH}/petCategory`,
            title: 'petCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'petSubCategory',
            path: `${APP_PREFIX_PATH}/petSubCategory`,
            title: 'petSubCategory',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'item',
            path: `${APP_PREFIX_PATH}/item`,
            title: 'item',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'itemOrder',
            path: `${APP_PREFIX_PATH}/itemOrder`,
            title: 'itemOrder',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }, {
            key: 'itemStatistic',
            path: `${APP_PREFIX_PATH}/itemStatistic`,
            title: 'itemStatistic',
            icon: BarChartOutlined,
            breadcrumb: false,
            submenu: []
          }
        ]
      },
      {
        key: 'coupon',
        path: `${APP_PREFIX_PATH}/coupon`,
        title: 'coupon',
        icon: FileImageOutlined,
        breadcrumb: false,
        submenu: []
      },
    {
      key: 'logout',
      path: `${APP_PREFIX_PATH}/logout`,
      title: 'logout',
      breadcrumb: false,
      submenu: []
    }]
  }
  const dashBoardNavTree = [{
    key: 'dashboards',
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: 'Admin Panel',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: submenu,
  }]
  
  const navigationConfig = [
    ...dashBoardNavTree
  ]
    
  return  navigationConfig
}

export default NavigationConfig
