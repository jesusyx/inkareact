import React, { Component } from 'react'
import { Layout, Form, Input, Button,  Card, Progress } from 'antd';
import uuid from 'uuid'
import { db, storage, currentTime } from '../../firebase.js'

class NormalSingleArchive extends Component {
    constructor(){
        super();
        this.state = {
            video:'',
            uploadValue:0,
        }

        this.handlenewArchive = this.handlenewArchive.bind(this)
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
        const file = event.target.files[0];
        const storageRef = storage.ref(`/Videos/${file.name}${uuid.v4()}`);
        const task = storageRef.put(file);
        
        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
              uploadValue:percentage
            })
            
        },(error) => {console.log(error.message)

        }, () => {
            task.snapshot.ref.getDownloadURL().then( DownloadURL => {
                this.setState({
                    video:DownloadURL
                })
                alert("Video Subido")
            })
        });  
    }

    handlenewArchive(event) {
        event.preventDefault();
    
        let title = event.target.title.value;
        let video = this.state.video;

        db.collection("Cursos").doc(this.props.match.params.idcurso).collection('Archivos').doc(this.props.match.params.idseccion).collection('videos').add({
            timestamp:currentTime.FieldValue.serverTimestamp(),
            title,
            video,
            
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    render(){
        console.log(this.props.match, "MATCH from SingleArchive.js")
        console.log(this.state.video, "Link video")
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
        return(
            
            <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center'}}>
                    <Form onSubmit={this.handlenewArchive} {...formItemLayout} >
                    <Form.Item
                        label={
                            <span>
                            Titulo&nbsp;
                            </span>
                        }
                    >
                        {getFieldDecorator('curso_title', {
                            rules: [{ required: true, message: 'Por favor ingresa un nombre para el archivo!', whitespace: true }],
                        })(<Input type="text" name="title" />)}
                    </Form.Item>



                    <Form.Item label="Subir Imagen">
                            <label className="custom-file-upload" style={{ border: '1px solid #ccc', display: 'inline-block', padding: '0px 4px', cursor:'pointer', marginBottom:'1rem'}}>
                                <input type="file" name="video" onChange={this.handleUpload} style={{display:'none'}} />
                                Seleccionar video
                            </label>
                        <Card
                                hoverable
                                style={{ width: 240, marginBottom: '1rem', margin:'0 0.5rem 1rem 0.5rem', margin:'0 auto'}}
                                cover={<video controls key={this.state.video ? this.state.video : null}>
                                        <source src={ this.state.video ? this.state.video : null } type="video/mp4"/>
                                    </video>}
                            >
                                
                                <Progress percent={Math.round(this.state.uploadValue)} max='100'/>
                        </Card>

                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Crear Archivo
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </Layout.Content>
        )
    }
}
const SingleArchive = Form.create({ name: 'archivefile' })(NormalSingleArchive);
export default SingleArchive