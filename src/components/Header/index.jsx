import React, {Component} from 'react';
import { Row, Col,Modal, message} from 'antd';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import MyButton from '../my-button/my-button.jsx';
import {ReqWeather} from '../../api/index.js'
import { removeItem } from '../../utils/storage-utils';
import memory from '../../utils/memory-utils';
import menuList from '../../config/menulist'

import './index.less'

@withRouter
 class Head extends Component {
state={
  sysTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
  weatherImage:'http://api.map.baidu.com/images/weather/day/qing.png',
  weather:'晴'
  }

  logout=()=>{
 Modal.confirm ({
   title: '您确认要退出登录吗？',
   onOk:()=>{
     memory.user = {};
     removeItem();
     this.props.history.replace('/login')
   },
   okText: '确认',
   cancelText: '取消'
 })
  };
 componentDidMount(){
 this.timer = setInterval(()=>{
     this.setState({
       sysTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
     })
   },1000)

   ReqWeather('深圳')
     .then(res=>{
       this.setState({
         weatherImage:res.weatherImage,
         weather:res.weather
       })
     })
     .catch(err => message.error(err, 2))
 }

 componentWillUnmount (){
   clearInterval(this.timer)
 }
getName=()=>{
//获取 pathname
  const {pathname} = this.props.location
  for(let i=0;i<menuList.length;i++){
   const menu = menuList[i]

    const children = menu.children

    if(children){
      for(let j=0;j<children.length;j++){
        const item = children[j]
        if(item.key === pathname){
          return item.title
        }
      }
    }else{
      if(menu.key === pathname){
        return menu.title
      }
    }
  }


}
  render () {
   const {sysTime,weatherImage,weather} = this.state

    const title =this.getName();
   const username = memory.user.username
    return (
      <div className='head'>
        <Row className='head-top'>
          <span>欢迎，{username}</span>
          <MyButton onClick={this.logout}>退出</MyButton>
        </Row>
        <Row className='head-bottom'>
          <Col className="head-left" span={6}>{title}</Col>
          <Col className="head-right" span={18}>
            <span>{sysTime}</span>
            <img src={weatherImage} alt="天气"/>
            <span>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Head
