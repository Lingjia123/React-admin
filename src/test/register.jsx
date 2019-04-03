import React, {Component} from 'react';
import withHoc from './hoc';

@withHoc('注册')
// 受控组件
class Register extends Component {
  /*state = {
      username: '',
      password: '',
      rePassword: ''
  };*/
  /*Change=(name)=>{
      return (e)=>{
          this.setState({
           [name]:e.target.value
          })
      }
}*/


  /* onUsernameChange = (e) => {
       this.setState({username: e.target.value});
   }

   onPasswordChange = (e) => {
       this.setState({password: e.target.value});
   }

   onRePasswordChange = (e) => {
       this.setState({rePassword: e.target.value});
   }*/

  /* register = (e) => {
       // 禁止默认事件
       e.preventDefault();
       // 收集表单数据
       const { username, password, rePassword } = this.state;
       alert(`用户名: ${username}, 密码: ${password}, 确认密码: ${rePassword}`);
   }*/

  render() {
    const {username, password, rePassword, Change, handleSubmit} = this.props;
    return (
      <div>
        <h2>注册</h2>
        <form onSubmit={handleSubmit}>
          用户名: <input type="text" name="username" value={username} onChange={Change('username')}/> <br/>
          密码: <input type="password" name="password" value={password} onChange={Change('password')}/> <br/>
          确认密码: <input type="password" name="rePassword" value={rePassword} onChange={Change('rePassword')}/> <br/>
          <input type="submit" value="注册"/>
        </form>
      </div>
    )
  }
}

export default Register
