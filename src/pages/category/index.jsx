import React, { Component } from 'react';
import { Card,Table,Button,Icon } from 'antd';

import MyButton from '../../components/my-button/my-button'
import './index.less'
const columns = [
  {
  title: '品类名称',
  dataIndex: 'name',


}, {
  title: '操作',
  className: 'operator',
  dataIndex: 'operator',
    render: text =>  <div>
      <MyButton>修改名称</MyButton>
      <MyButton>查看其子品类</MyButton>
    </div>,
}
];

const data = [
  {
  key: '1',
  name: '手机',


}, {
  key: '2',
  name: '电脑',

},
  {
    key: '3',
    name: '冰箱',

  }
];


export default class Category extends Component {
  onChange=(pageNumber)=> {
    console.log('Page: ', pageNumber);
  }

  render() {

    return <div>
      <Card
        className='category'
        title="品类管理"
        extra={<Button type="primary"><Icon type="plus"/>添加品类</Button>}
        style={{ width: 860 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            defaultPageSize: 3,
            showQuickJumper: true,

          }}
        />
      </Card>

    </div>
  }
}
