import React,{Component} from 'react';
import withHoc from './hoc';

// 受控组件
@withHoc('登陆')
 class Login extends Component {
    /*state = {
        username: '',
        password: ''
    };*/
   /* Change=(name)=>{
        return (e)=>{
            this.setState({
                [name]:e.target.value
            })
        }
    }*/

    /*onUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }*/

    /*login = (e) => {
        // 禁止默认事件
        e.preventDefault();
        // 收集表单数据
        const { username, password } = this.state;
        alert(`用户名: ${username}, 密码: ${password}`);
    }*/

    render () {
        const { username, password,Change, handleSubmit} = this.props;
        return (
            <div>
                <h2>登陆</h2>
                <form onSubmit={handleSubmit}>
                    用户名: <input type="text" name="username" value={username} onChange={Change('username')}/> <br/>
                    密码: <input type="password" name="password" value={password} onChange={Change('password')}/> <br/>
                    <input type="submit" value="登陆"/>
                </form>
            </div>
        )
    }
}

export default Login
