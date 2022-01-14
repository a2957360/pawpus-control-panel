import React from 'react'
import { Calendar, Badge } from 'antd';

function getListData(value) {
  let listData;
  switch (value.format('YYYY-MM-DD')) {
    case '2021-03-03':
      listData = [
        { type: 'success', content: 'This is usual event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    // case 10:
    //   listData = [
    //     { type: 'warning', content: 'This is warning event.' },
    //     { type: 'success', content: 'This is usual event.' },
    //     { type: 'error', content: 'This is error event.' },
    //   ];
    //   break;
    // case 15:
    //   listData = [
    //     { type: 'warning', content: 'This is warning event' },
    //     { type: 'success', content: 'This is very long usual event。。....' },
    //     { type: 'error', content: 'This is error event 1.' },
    //     { type: 'error', content: 'This is error event 2.' },
    //     { type: 'error', content: 'This is error event 3.' },
    //     { type: 'error', content: 'This is error event 4.' },
    //   ];
    //   break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item,index) => (
        <li key={index}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}
export default function OutputItem(props) {
	return (
		//服务 二级分类
        <Calendar dateCellRender={dateCellRender} />
	)
}
