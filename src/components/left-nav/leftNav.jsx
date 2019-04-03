import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom';
import { Menu, Icon } from "antd";


import menuList from '../../config/menulist'
import './leftNav.less'
import logo from '../../assets/image/logo.png';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

@withRouter
class LeftNav extends Component {
  static propTypes = {
    opacity: PropTypes.number.isRequired
  }
constructor (props){
  super(props)
const openKeys =[];
  //创建菜单
this.menus = this.createMenu(menuList,openKeys)
  this.state={
    openKeys
  }
}

menufunc=(menu)=>{
 return <Item key={menu.key}>
    <Link to={menu.key}>
      <Icon type={menu.icon} />
      <span>{menu.title}</span>
    </Link>
  </Item>
}

createMenu(menuList,openKeys){

  const { pathname } = this.props.location;
    return menuList.map((menu)=>{
    const children = menu.children;

      if(children){
        //二级菜单
        return <SubMenu
          key={menu.key}
          title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}
        >
          {
            children.map((item) => {

              if (pathname === item.key) {
                openKeys.push(menu.key);
              }

              return this.menufunc(item)
            })
          }
        </SubMenu>
      }else{
        //一级菜单
        return this.menufunc(menu)
      }
    })
}

  handleOpenChange=(openKeys)=>{
    this.setState ({
      openKeys
    })
  }

  handleClick = () => {
    // 收起所有的二级菜单
    this.setState({openKeys: []})
  }

  render() {
const {location:{pathname} ,opacity} = this.props;
    return (
      <div className='left-nav'>
        <Link to="/home" className="logo" onClick={this.handleClick}>
          <img src={logo} alt="logo"/>
          <h1 style={{opacity}}>硅谷后台</h1>
        </Link>
        <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.handleOpenChange}>
          {
            this.menus
          }
        </Menu>
      </div>
    )
  }
}
export default LeftNav
