import React, { Component } from 'react';
import { Card,Table,Button,Icon,message,Modal } from 'antd';
import {ReqCategories,reqAddCategory,reqUpdateCategoryName} from '../../api/index'
import MyButton from '../../components/my-button/my-button'
import AddForm from './Add-Form'
import UpdateForm from './Update-Form'
import './index.less'


export default class Category extends Component {

  constructor(props){
    super(props)
   this.state={
      categories:[],
     SubCategories:[],
     isShowAddCategoryModal:false,
     isShowUpdateCategoryModal:false,
     isShowSubCategory:false,
     category: {}, // 要操作分类数据
     subcategory:{},
     parentCategory: {},
    }
    this.createAddForm = React.createRef()
    this.createUpdateForm = React.createRef()
  }
  // 当请求数据为空时，不要loading
  isLoading = true;

columns = [
    {
      title: '品类名称',
      dataIndex: 'name',


    }, {
      title: '操作',
      className: 'operator',
      render:category =><div>
        <MyButton onClick={this.ShowUpdateCategoryModal(category)}>修改名称</MyButton>
        {
          this.state.isShowSubCategory ? null :<MyButton onClick={this.ShowSubCategoryModal(category)}>查看其子品类</MyButton>
        }
      </div>,
    }
  ];
  ShowUpdateCategoryModal=(category)=>{
    return()=>{
      this.setState({
       category
      })
      this.handleModel('isShowUpdateCategoryModal',true)()
    }
  }

  ShowSubCategoryModal=(parentCategory)=>{
    return()=>{
      this.setState({
        parentCategory,
        isShowSubCategory: true
      })
      // 请求二级分类数据
      this.getcategories(parentCategory._id);
    }
  }

  getcategories=async(parentId)=>{

    const result =await ReqCategories(parentId);
    if(result.status === 0){
      // 判断是一级/二级分类
      const options = {};
      if (result.data.length === 0) {
        this.isLoading = false;
        // 等当前更新完成后在调用，目的：让下一次生效
        setTimeout(() => {
          this.isLoading = true;
        }, 0)
      }
      if (parentId === '0') {
        options.categories = result.data;
      } else {
        options.SubCategories = result.data;
      }

      this.setState(options);
    }else{
      message.error(result.msg)
    }
  }

  componentDidMount(){
    this.getcategories('0')
  }
  addCategory=()=>{
    const { validateFields } = this.createAddForm.current.props.form;
    validateFields(async(err,values)=>{
      console.log(err, values);
      if(!err){
        // 校验成功  --> 发送请求 添加分类数据 、隐藏对话框、提示添加分类成功
        const { parentId, categoryName } = values;
        const result = await reqAddCategory(parentId, categoryName);
        if (result.status === 0) {
          message.success('添加分类成功~');
          if (parentId === '0') {
            this.setState({
              isShowAddCategoryModal: false,
              categories: [...this.state.categories, result.data]
            })
          } else if (parentId === this.state.parentCategory._id) {
            this.setState({
              isShowAddCategoryModal: false,
              SubCategories: [...this.state.SubCategories, result.data]
            })
          }
        }else{
          message.error(result.msg);

        }
      }  else {
        // 校验失败 -- 啥也不做

      }
    })
  }

  UpdateCategory=()=>{
    const { validateFields,resetFields  } = this.createUpdateForm.current.props.form;
    validateFields(async(err,values)=>{
      if (!err) {
        const { categoryName } = values;
        const { category : { _id }, isShowSubCategory} = this.state;
        const result = await reqUpdateCategoryName(_id, categoryName);
        if (result.status === 0) {
          // 隐藏对话框、提示成功、修改显示的分类名称
          message.success('更新分类名称成功~');
          // 如果在一级分类，点击修改一级分类数据
          // 如果在二级分类，点击修改二级分类数据
          let name = 'categories';
          if (isShowSubCategory) {
            name = 'subCategories'
          }
          this.setState({
            isShowUpdateCategoryModal: false,
            [name]: this.state[name].map((category) => {
              if (category._id === _id) return {...category, name: categoryName};
              return category;
            })
          })
          // 重置表单项
          resetFields();
        } else {
          message.error(result.msg);
        }
      }
    })
  }
  goBack = () => {
    this.setState({
      isShowSubCategory: false
    })
  }

  handleModel=(name,isshow)=>{
    return ()=>{
      this.setState({
        [name]:isshow
      })
    }
  }
  render() {
const {
  categories,
  isShowAddCategoryModal,
  isShowUpdateCategoryModal,
  category:{ name },
  SubCategories,
  isShowSubCategory,
  parentCategory } = this.state;

    return <div>
      <Card
        className='category'
        title={isShowSubCategory ? <div><MyButton onClick={this.goBack}>一级分类</MyButton><Icon type="arrow-right"/><span>{parentCategory.name}</span></div>: '一级分类列表'}
        extra={<Button type="primary" onClick={this.handleModel('isShowAddCategoryModal',true)}><Icon type="plus"/>添加品类</Button>}
        style={{ width: 860 }}
      >
        <Table
          columns={this.columns}
          dataSource={isShowSubCategory ? SubCategories : categories}
          bordered
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            defaultPageSize: 3,
            showQuickJumper: true,

          }}
          rowKey="_id"
          isLoading={isShowSubCategory ? this.isLoading && ! SubCategories.length:this.isLoading && !categories.length}
        />
        <Modal
        title="添加分类"
        visible={isShowAddCategoryModal} //是否显示隐藏,true,显示
        onOk={this.addCategory}
        onCancel={this.handleModel('isShowAddCategoryModal',false)}
        okText='确定'
        cancelText='取消'
      >
        <AddForm categories={categories} wrappedComponentRef={this.createAddForm}/>
      </Modal>
        <Modal
          title="修改分类"
          visible={isShowUpdateCategoryModal} //是否显示隐藏,true,显示
          onOk={this.UpdateCategory}
          onCancel={this.handleModel('isShowUpdateCategoryModal',false)}
          okText='确定'
          cancelText='取消'
          width={300}
        >
          <UpdateForm categoryName={name} wrappedComponentRef={this.createUpdateForm}/>
        </Modal>
      </Card>

    </div>
  }
}
