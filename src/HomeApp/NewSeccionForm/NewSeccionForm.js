import React, { Component } from 'react'
import { Layout, PageHeader, Button, Form, Input } from 'antd';
import { db, currentTime } from '../../firebase.js'


class NormalNewSeccionForm extends Component {
    constructor(){
        super();
        this.handlenewSeccion = this.handlenewSeccion.bind(this)
    }

    handlenewSeccion(event) {
        event.preventDefault();
    
        let nombre = event.target.nombre.value;

        db.collection("Cursos").doc(this.props.match.params.idcurso).collection('Archivos').add({
            seccionName:nombre,
            timestamp:currentTime.FieldValue.serverTimestamp()
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    render(){
        console.log(this.props.match,"NewSeccionForm")
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
        return(
            <div>
            <PageHeader 
                title="Nueva Seccion"
                /* subTitle="Lista de Cursos" */
            />
            
            <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial', marginBottom:'1rem' }}>
                <div style={{ padding: 24, background: '#fff'}}>
                    <Form onSubmit={this.handlenewSeccion} {...formItemLayout} >
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
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Crear Seccion
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Layout.Content>
        </div>
        )
    }
}
const NewSeccionForm = Form.create({ name: 'NuevoUsuario' })(NormalNewSeccionForm);
export default NewSeccionForm