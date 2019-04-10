import React, {Component} from 'react';
import {Card, Form, Cascader, InputNumber, Icon, Button, message,Input} from 'antd';

import RichTextEditor from './rich-text-editor';
import PicturesWall from './ImageUpload'
import {ReqCategories,ReqAddProducts,ReqUpdateproducts} from '../../../api/index'
const Item = Form.Item

@Form.create()
class saveUpdate extends Component {
  constructor(){
    super()
   this.state={
      options:[]
    }
    this.richTextEditor = React.createRef();
  }

  goback=()=>{

    this.props.history.goBack()
  }

  //收集表单数据
  submit=(e)=>{
    e.preventDefault()
    this.props.form.validateFields(async(err,values)=>{
      if(!err){
 const {name,price,desc,category} = values;
 const detail =this.richTextEditor.current.state.editorState.toHTML();
        let categoryId,pCategoryId;
        if(category.length === 1 ){
          //数组元素只有一个,表示一级分类
          categoryId = category[0];
          pCategoryId = '0'
        }else{
          //有二级分类
          pCategoryId = category[0];
          categoryId = category[1];
        }
        const {location:{state}} = this.props;
        let result =null;
        let msg ='';
        if(state){
       result = await ReqUpdateproducts({name,price,desc,categoryId,pCategoryId,detail,_id:state._id})
          msg ='修改商品成功'
        }else{
          //发请求
          result = await ReqAddProducts({name,price,desc,categoryId,pCategoryId,detail})
          msg='添加商品成功~';
        }
        if(result.status === 0){
          message.success(msg);
          this.props.history.goBack()
        }else{
          message.error(result.msg)
        }
      }
    })
  }
  // 加载二级分类数据
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 会显示loading状态
    targetOption.loading = true;
    // 请求二级分类数据
    this.getcategories(targetOption.value);
  }

  getcategories=async(parentId)=>{

    const result =await ReqCategories(parentId);
    if(result.status === 0){
     if(parentId === '0'){
       this.setState({
         options:result.data.map((item)=>{
           return {
             label:item.name,
             value:item._id,
             isLeaf: false,
           }
         })
       })
     }else {
       this.setState({
         options:this.state.options.map((option)=>{
           if (parentId === option.value) {
            option.children=result.data.map((item)=>{
              return {
                label: item.name,
                value: item._id
              }
             })
             // 去掉loading状态
             option.loading = false;
             option.isLeaf = true;
           }
           return option
         })
       })

     }
    }else{
      message.error(result.msg)
    }
  }
  componentDidMount(){
    this.getcategories('0')
    const { state } = this.props.location;
    if (state) {
      const { pCategoryId, categoryId } = state;
      if (pCategoryId === '0') {
        this.category = [categoryId];
      } else {
        // 请求二级分类数据
        this.getCategories(pCategoryId);
        this.category = [pCategoryId, categoryId];
      }
    }
  }


  render() {
    const { options } = this.state;
    const { form:{getFieldDecorator},location : { state } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24},
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    return (
      <Card
        title={
          <div  style={{display:'flex',alignItems:'center'}} onClick={this.goback}>
            <Icon type="arrow-left"  style={{fontSize: 25, marginRight: 10}}/>
         <span>添加商品</span>
          </div>
        }
      >
        <Form  {...formItemLayout} onSubmit={this.submit}>
          <Item  label='商品名称' >
            {
              getFieldDecorator(
                'name',
                {
                  rules:[{required:true,whiteSpace: true, message: '商品名称不能为空'}],
                  initialValue: state ? state.name : ''
                }
              )(
                <Input placeholder='请输入商品名称' style={{width:'300px'}}/>
              )
            }

          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator(
                'desc',
                {
                  rules:[{required:true,whiteSpace: true, message: '商品名称不能为空'}],
                  initialValue: state ? state.desc : ''
                }
              )(
                <Input placeholder='请输入商品描述' style={{width:'300px'}}/>
              )
            }

          </Item>
          <Item label='选择分类'
                wrapperCol={{
                  xs: { span: 24 },
                  sm: { span: 5 },
                }}
                >
                {
                  getFieldDecorator(
                    'category',
                    {
                      rules:[{required:true, message: '请选择商品分类'}],
                      initialValue: state ? this.category: []
                    }
                  )(
                    <Cascader
                      options={options}
                      placeholder="请选择分类"
                      changeOnSelect
                      loadData={this.loadData}
                    />
                  )
                }

          </Item>
          <Item label='商品价格'
                wrapperCol={{
                  xs: { span: 24 },
                  sm: { span: 5 },
                }}
                >
                {
                  getFieldDecorator(
                    'price',
                    {
                      rules:[{required:true,message: '请输入商品价格'}],
                      initialValue: state ? state.price : ''
                    }
                  )(
                    <InputNumber
                      style={{width: 150}}
                      formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\D+/g, '')}
                    />
                  )
                }
          </Item>
          {
          state ?  <Item label='上传图片'>
              <PicturesWall _id={state._id} imgs={state.imgs}/>
            </Item> : null
          }
          <Item  label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.richTextEditor} detail={state ? state.detail:''}/>
          </Item>
          <Item>
            <Button type='primary' style={{marginLeft: 20}} htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default saveUpdate
