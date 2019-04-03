import React, {Component} from 'react';

export default function withHoc(name) {
  return (WrappedComponent) => {

    return class extends Component {
      static displayName = `Form(${getDisplayName(WrappedComponent)})`

      state = {
        username: '',
        password: '',
        rePassword: ''
      };
      Change = (name) => {
        return (e) => {
          this.setState({
            [name]: e.target.value
          })
        }
      };
      /*login = (e) => {
          // 禁止默认事件
          e.preventDefault();
          // 收集表单数据
          const { username, password } = this.state;
          alert(`用户名: ${username}, 密码: ${password}`);
      };
      register = (e) => {
          // 禁止默认事件
          e.preventDefault();
          // 收集表单数据
          const { username, password, rePassword } = this.state;
          alert(`用户名: ${username}, 密码: ${password}, 确认密码: ${rePassword}`);
      }*/
      handleSubmit = (e) => {
        e.preventDefault();
        const {username, password, rePassword} = this.state;
        if (rePassword) {
          alert(`用户名: ${username}, 密码: ${password}, 确认密码: ${rePassword}`);
        } else {
          alert(`用户名: ${username}, 密码: ${password}`);
        }
      };

      render() {
        const mapMethodToProps = {
          Change: this.Change,
          handleSubmit: this.handleSubmit,
        }
        return <div>
          <h2>{name}</h2>
          <WrappedComponent {...mapMethodToProps} {...this.state}/>
        </div>
      }

    }
  }

}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
