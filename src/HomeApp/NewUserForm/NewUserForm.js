import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button, Select, notification } from 'antd';
import { db, auth, currentTime } from '../../firebase.js'
import uuid from 'uuid'

const { Option } = Select;
const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Usuario Creado',
    });
  };


class NormalNewUserForm extends Component {
    constructor(){
        super();
        this.state = {
            selectDefaultValue: 'estudiante'
        }
        this.handlenewUser = this.handlenewUser.bind(this)
        this.selectChanged = this.selectChanged.bind(this)
    }
    handlenewUser(event) {
        event.preventDefault();
    
        let nombre = event.target.nombre.value;
        let apellidos = event.target.apellidos.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let rol = this.state.selectDefaultValue;
            
        

        auth.createUserWithEmailAndPassword(email, password)
		.then( result =>{
            openNotificationWithIcon('success')
            db.collection("usuarios").add({
                key:uuid.v4(),
                timestamp:currentTime.FieldValue.serverTimestamp(),
                nombre,
                apellidos,
                email,
                rol
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            console.log(result,"result NewUserForm.js")
            
		})
		.catch(function(error) {
  		let errorCode = error.code;
  		let errorMessage = error.message;
  		alert(errorMessage, errorCode)
		})

    }
    selectChanged(value){
        this.setState({
            selectDefaultValue: value
        })
        console.log(value,"value")
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 8,
                offset: 6,
              },
            },
          };
          const selectFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 8,
                offset: 0,
              },
            },
          };
        return (
            <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center'}}>
                    <Form onSubmit={this.handlenewUser} {...formItemLayout} >

                    <Form.Item
                        label={
                            <span>
                            Nombre&nbsp;
                            </span>
                        }
                    >
                        {getFieldDecorator('user_name', {
                            rules: [{ required: true, message: 'Por favor ingresa tu nombre', whitespace: true }],
                        })(<Input type="text" name="nombre" />)}
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>
                            Apellidos&nbsp;
                            </span>
                        }
                    >
                        {getFieldDecorator('user_lastName', {
                            rules: [{ required: true, message: 'Por favor ingresa tu apellido!', whitespace: true }],
                        })(<Input type="text" name="apellidos" />)}
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>
                            Email&nbsp;
                            </span>
                        }
                    >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Por favor ingresa un correo!', whitespace: true }],
                        })(<Input type="email" name="email" />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                            Contraseña&nbsp;
                            </span>
                        }
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Por favor ingresa una contraseña!', whitespace: true }],
                        })(<Input type="password" name="password" />)}
                    </Form.Item>

                    
                    <Form.Item label="Rol" {...selectFormItemLayout}>
                        <Select defaultValue="estudiante" onChange = {this.selectChanged}>
                            <Option value="estudiante">Estudiante</Option>
                            <Option value="administrador">Administrador</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Crear Usuario
                        </Button>
                    </Form.Item>
                    
                    </Form>
                </div>
            </Layout.Content>
            
        )
    }
}
const NewUserForm = Form.create({ name: 'NuevoUsuario' })(NormalNewUserForm);
export default NewUserForm