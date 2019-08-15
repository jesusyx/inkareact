import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LoginForm from './Login-form/Login_form';
import LoginRegister from './Login-register/Login_register'
import './Login.css'



class Login extends Component {
    constructor(props){
		super(props);
		this.state = {
            registerFormShow: false
        }
        
        this.logintoggleListener = this.logintoggleListener.bind(this);
        this.logintoggle = this.logintoggle.bind(this);
    }
    
    logintoggleListener() {
        if (this.state.registerFormShow) {
            return (
                <LoginRegister 
                    handleOnCreateEmail = {this.props.handleOnCreateEmail}
                    logintoggle = {this.logintoggle}
                />
            )
            
        }
        return (
            <LoginForm
                handleOnAuthEmail = {this.props.handleOnAuthEmail}
                logintoggle = {this.logintoggle}
            />
            
        )
    }
    logintoggle() {
        this.setState({
            registerFormShow: !this.state.registerFormShow
        })
    }

    render(){
       return(
        <div className="login-background">
            <Row type="flex" justify="center" align="middle" style={{ height: '100%' }}>
                    <Col span={24}>
                        {this.logintoggleListener()}
                    </Col>
            </Row>
            
        </div>
        ) 
    }
}
export default Login