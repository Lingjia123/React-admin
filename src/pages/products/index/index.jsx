import React, { Component ,Fragment} from 'react';
import {Card,Table,Button,Input,Select,Icon,message} from 'antd';
import {Link} from 'react-router-dom'


import MyButton from '../../../components/my-button/my-button';
import {reqGetProducts,ReqSearch} from '../../../api/index'
const Option = Select.Option;

export default class Product extends Component {
  constructor(props){
    super(props)
    this.state={
      products:[],
      total:0,
      searchType:'productName',
      pageNum:1,
      pageSize:3
    }
    this.SearchValue = React.createRef()
  }

  getProducts=async(pageNum, pageSize=3)=>{
    const {searchType} = this.state;
    const searchContent =this.searchContent
    let result=null;
    if(searchContent){
      //搜索请求
   result = await ReqSearch({
        [searchType]:searchContent,
        pageNum,
        pageSize
      })
    }else{
   result =await reqGetProducts(pageNum, pageSize)
    }

    if(result.status === 0){
      this.setState({
        products:result.data.list,
        total: result.data.total,
        pageNum,
        pageSize
      })
    }else{
      message.error(result.msg)
    }

  }

  Search=()=>{
    this.searchContent =this.SearchValue.current.state.value;
    this.getProducts(1)

  }
  showDetail=(path,product)=>{
    this.props.history.push(path,product);
  }

  componentDidMount(){
this.getProducts(1)
  }
columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },{
      title: '状态',
      key: 'status',
      render:()=>{
        return<div>
          <Button type='primary'>下架</Button>
          &nbsp;&nbsp;在售
        </div>
      }
    },{
      title: '操作',
      key: 'operator',
      render:(product)=><div>
        <MyButton>详情</MyButton>
        <MyButton onClick={this.UpdateProducts(product)}>修改</MyButton>
      </div>
    }
  ];
  UpdateProducts=(product)=>{
    return ()=>{
      this.props.history.push('/product/save-update',product)
    }
  }
  handleSelectName=(value)=>{
    this.setState({
      searchType:value
    })
  }
  render() {
    const {products,total} = this.state;


    return (<Card
      title={
        <Fragment> {/*为什么加上默认值才能发生切换?*/}
          <Select defaultValue='productName' onClick={this.handleSelectName}>
            <Option key={0} value='productName'>根据商品名称</Option>
            <Option key={1} value='productDesc'>根据商品描述</Option>
          </Select>
          <Input placeholder='关键字' style={{ width: 300,margin:'0 10px'}} ref={this.SearchValue}/>
          <Button type='primary' onClick={this.Search}>搜索</Button>
        </Fragment>}
      extra={<Link to='/product/save-update'><Button type='primary'><Icon type="plus"/>添加产品</Button></Link>}
      style={{width: '100%'}}
    >
      <Table
        dataSource={products}
        columns={this.columns}
        bordered
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3,
          showQuickJumper: true,
          total,
          onChange: this.getProducts,
          onShowSizeChange: this.getProducts
        }}
        loading={false}
        rowKey="_id"
      />
    </Card>)

  }
}
