import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Fragment } from 'react';
import '../Login-form/Login_form.css'

class NormalLoginFormRegister extends React.Component {
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
          <Form onSubmit={this.props.handleOnCreateEmail} className="login-form">
          <h2 style={{ textAlign: 'center' }}>Registrarse</h2>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Por favor ingresa tu nombre!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Nombre"
                  name="nombre"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Por favor ingresa tu email!' }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="email"
                  placeholder="Email"
                  name="email"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Por favor ingresa tu email!' }],
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
              <Button type="primary" htmlType="submit" className="login-form-button">
                Registrarse
              </Button>
              O <a onClick={this.props.logintoggle}>Iniciar Sesion!</a>
            </Form.Item>
          </Form>
      </Fragment>
    );
  }
}

const LoginRegister = Form.create({ name: 'normal_login' })(NormalLoginFormRegister);
export default LoginRegister;