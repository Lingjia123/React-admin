import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {
  Layout
} from 'antd';

import Home from '../home'
import Category from '../category'
import Products from '../products'
import Head from '../../components/Header/index.jsx'
import LeftNav from '../../components/left-nav/leftNav.jsx'

import { getItem } from '../../utils/storage-utils';
import memory from '../../utils/memory-utils';


const {
  Header, Content, Footer, Sider,
} = Layout;

export default class Admin extends Component {
  constructor (props){
    super (props);

    this.state={
      collapsed: false,
    }
    //判断用户是否登录过
    const user = getItem();
    if(!user || !user._id){
      return this.props.history.replace('/login');

    }
    memory.user = user;
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const {collapsed} = this.state;
    const opacity = collapsed ? 0 : 1;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <LeftNav opacity={opacity}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 ,height: 100}}>
            <Head/>
          </Header>
          <Content style={{ margin: '20px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/products" component={Products}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
