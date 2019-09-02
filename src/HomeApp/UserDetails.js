import React, { Component } from 'react'
import { Descriptions } from 'antd';
import { List,  Layout, PageHeader, Button, Icon,  Select, Avatar, Form, Spin   } from 'antd';
import { db } from '../firebase.js'

import uuid from 'uuid'


const { Option } = Select;
/* const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]; */
class UserDetails extends Component {
    constructor() {
        super();
        this.state = {
            user:{},
            allcourses:[],
            usercourses:[],
            currentCourseFocus:'',
            currentUserDocId:'',
            coursesRef:[],
            coursesData:[],
            isFetched1:false,
            isFetched2:false
            
        }
        this.onChange = this.onChange.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.handleSendCourses = this.handleSendCourses.bind(this)
    }

    handleSendCourses(event){
        
        event.preventDefault();
        if (this.state.currentCourseFocus != ''){
            this.state.coursesRef=[]



            db.collection('usuarios').doc(this.state.currentUserDocId).collection('owncourses').add({
                id:uuid.v4(),
                course:this.state.currentCourseFocus,
            })
            .then( (docRef) => {
                /* this.setState({
                    usercourses:[...this.state.usercourses, this.state.currentCourseFocus]
                }) */
                
                
                
                console.log(docRef.id,'ID DEL DOC AGREGADO')
                
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

        }
        
    }

    onChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            currentCourseFocus: value
        })
    }
      
    onBlur() {
        console.log('blur');
    }
      
    onFocus() { 
        console.log('focus');
    }
      
    onSearch(val) {
        console.log('search:', val);
    }
    
    componentDidMount(){
        db.collection('usuarios').where('key', '==', this.props.match.params.idusuario).get()
        .then( snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                this.setState({
                    user:doc.data(),
                    currentUserDocId:doc.id,
                    isFetched1:true
                })

            });
        }).catch((error) =>{
            console.log("Error getting documents: ", error);
        })


        db.collection('usuarios').where('key', '==', this.props.match.params.idusuario).get()
        .then( querySnapshot => {
            querySnapshot.forEach( doc => {
                db.collection('usuarios').doc(doc.id).collection('owncourses')
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.setState({
                            coursesRef:[...this.state.coursesRef, doc.data().course],
                            isFetched2:true
                        })
        
                        /* db.collection('Cursos').where('title', '==', doc.data().course).get()
                        .then(snapshot3 => {
                            snapshot3.forEach( doc => {
                                console.log(doc.id, doc.data(),'ID Y DATAA')
                                this.setState({
                                    coursesData:[...this.state.coursesData , doc.data()]
                                })
                            })
                        }) */
                    });
                });
            })
        });
        
        


        


        



        /* db.collection('usuarios').where('key', '==', this.props.match.params.idusuario).collection('owncourses').get()
        .then( snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            console.log(snapshot.docs,'DOCS DEL SNAPSHOT')
        }).catch((error) =>{
            console.log("Error getting documents: ", error);
        }) */



        db.collection('Cursos').get()
        .then(querySnapshot => {
            this.setState({
                allcourses:querySnapshot.docs
            })
        })
        .catch((error) =>{
            console.log("Error getting documents: ", error);
        })
       
    }
    render() {
        console.log(this.state.usercourses,'usercourses')
        console.log(this.state.currentCourseFocus,'currentCOursefOCUS')
        console.log(this.state.coursesRef,'itutlos del curso')
        /* console.log(this.state.coursesData,'Courses DATA') */
        return(
            <div>
                
                <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial', marginBottom:'1rem' }}>
                <PageHeader title={(<span style={{color:'#fff'}}>Información del Usuario</span>)}
                            style={{ background:'#001529', color:'#fff!important' }}
                            /* subTitle="Lista de Cursos" */
                    />
                <div style={{ padding: 24, background: '#fff'}}>
                    {this.state.isFetched1 ? 
                        <Descriptions title="User Info">
                            <Descriptions.Item label="Nombre">{this.state.user.nombre}</Descriptions.Item>
                            <Descriptions.Item label="Apellidos">{this.state.user.apellidos}</Descriptions.Item>
                            <Descriptions.Item label="Email">{this.state.user.email}</Descriptions.Item>
                            <Descriptions.Item label="Rol">{this.state.user.rol}</Descriptions.Item>
                        </Descriptions>  
                    :<Spin size="large" style={{ display:'flex', justifyContent:'center', alignItems:'center'}} />}
                    
                </div>
                </Layout.Content>
                <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial', marginBottom:'1rem' }}>
                <PageHeader title={(<span style={{color:'#fff'}}>Cursos</span>)}
                            style={{ background:'#001529', color:'#fff!important' }}
                            /* subTitle="Lista de Cursos" */
                    />
                <div style={{ padding: 24, background: '#fff'}}>
                    <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
                    <Form onSubmit={this.handleSendCourses}>
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onSearch={this.onSearch}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.allcourses.map( doc => {
                                return(
                                    <Option key={doc.id} value={doc.data().title}>{doc.data().title}</Option>
                                )
                            })}
                            
                        </Select>
                        <Button type="primary" htmlType="submit" >Agregar Curso</Button>
                    </Form>
                    </div>
                    {this.state.isFetched2 ? 
                      <List
                        itemLayout="horizontal"
                        dataSource={this.state.coursesRef}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src="https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/06/Instructional-Design-Courses-and-Programs-01.jpg" />}
                            title={<a href="#">{item}</a>}
                            /* description="Ant Design, a design language for background applications, is refined by Ant UED Team" */
                            />
                        </List.Item>
                        )}
                    />  
                    :<Spin size="large" style={{ display:'flex', justifyContent:'center', alignItems:'center'}} />}
                    

                    
                </div>
                </Layout.Content>
            </div>
            
        )
    }
}
export default UserDetails