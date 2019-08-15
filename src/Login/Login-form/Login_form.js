import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Fragment } from 'react';
import './Login_form.css'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
          <Form onSubmit={this.props.handleOnAuthEmail} className="login-form">
          <h2 style={{ textAlign: 'center' }}>Iniciar sesion</h2>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Por favor ingresa tu nombre!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Nombre"
                  name="email"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Ingresa una contraseña!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="#">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              O <a onClick={this.props.logintoggle}>Registrarse ahora!</a>
            </Form.Item>
          </Form>
      </Fragment>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default LoginForm;