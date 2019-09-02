import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button,  Card, message, notification, Progress  } from 'antd';
import uuid from 'uuid'
import { db, storage, currentTime } from '../../firebase.js'


const success = () => {
    message.success('Curso Agregado');
};
const error = () => {
    message.error('Un Error ah ocurrido');
};

const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Subido Correctamente',
    });
  };

class NormalNuevoCursoForm extends Component {
    constructor(){
        super();
        this.state = {
            picture:'https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/06/Instructional-Design-Courses-and-Programs-01.jpg',
            uploadValue:0,
        }

        this.handlenewCourse = this.handlenewCourse.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        
    }

    


    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };


    handleUpload (event) {
        const file = event.target.files[0] || uuid.v4();
        const storageRef = storage.ref(`/coursesPic/${file.name}${uuid.v4()}`);
        const task = storageRef.put(file);
        
        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
              uploadValue:percentage
            })
            
        },(err) => { 
            error();
            console.log(err,'error al subir')

        }, () => {
            task.snapshot.ref.getDownloadURL().then( DownloadURL => {
                this.setState({
                    picture:DownloadURL,
                })
                openNotificationWithIcon('success');
            })
        });  
    }

    handlenewCourse(event) {
        event.preventDefault();
    
        let title = event.target.title.value;
        let subtitle = event.target.subtitle.value;
        let picture = this.state.picture;
            
        db.collection("Cursos").add({
            timestamp:currentTime.FieldValue.serverTimestamp(),
            title,
            subtitle,
            picture
        })
        .then((docRef) => {

            this.props.form.resetFields()
            console.log("Document written with ID: ", docRef.id);
            success();
            this.setState({
                picture:'https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/06/Instructional-Design-Courses-and-Programs-01.jpg',
                uploadValue:0,
            })
            
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    render(){
        console.log(this.state.picture, 'picture')

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
                offset: 10,
              },
            },
          };
          const uploadtailFormItemLayout = {
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
                    <Form onSubmit={this.handlenewCourse} {...formItemLayout} >
                    <Form.Item
                        label={
                            <span>
                            Titulo&nbsp;
                            </span>
                        }
                    >
                        {getFieldDecorator('curso_title', {
                            rules: [{ required: true, message: 'Por favor ingresa un nombre para el curso!', whitespace: true }],
                        })(<Input  type="text" name="title" />)}
                    </Form.Item>


                    <Form.Item
                        label={
                            <span>
                            Subtitulo&nbsp;
                            </span>
                        }
                    >
                        {getFieldDecorator('curso_subtitle', {
                            rules: [{ required: true, message: 'Por favor ingresa un subtitulo!', whitespace: true, initialValue:this.state.subtitle }],
                        })(<Input  type="text" name="subtitle" />)}
                    </Form.Item>

                    <Form.Item label="Subir Imagen">
                            <label className="custom-file-upload" style={{ border: '1px solid #ccc', display: 'inline-block', padding: '0px 4px', cursor:'pointer', marginBottom:'1rem'}}>
                                <input type="file" name="picture" onChange={this.handleUpload} style={{display:'none'}} />
                                Seleccionar imagen
                            </label>
                            
                               
                        <Card   
                                hoverable
                                style={{ width: 240, marginBottom: '1rem', margin:'0 0.5rem 1rem 0.5rem', margin:'0 auto'}}
                                cover={<img alt="example" style={{ height:'238px', width:'238px', objectFit:'cover', objectPosition:'center' }} src={this.state.picture} />}
                            >
                                
                                <Progress percent={Math.round(this.state.uploadValue)} max='100'/>
                        </Card>
                        
                        {/* getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button>
                                    <Icon type="upload" /> Click para subir Imagen.
                                </Button>
                            </Upload>,
                        ) */}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Crear Curso
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </Layout.Content>
        )
    }
}
const NuevoCursoForm = Form.create({ name: 'CursoTitle' })(NormalNuevoCursoForm);
export default NuevoCursoForm