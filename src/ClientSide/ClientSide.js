import React, { Component } from 'react'
import { Card, Avatar, Layout, PageHeader, Button, Icon, Menu, Dropdown, Spin } from 'antd';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { db } from '../firebase.js'
import VideoPlayer from './VideoPlayer/VideoPlayer'

const { Meta } = Card;
const { Header } = Layout;
class ClientSide extends Component {
    constructor(){
        super();
        this.state = {
            current: 'mail',
            cursos:[],
            isFetched:false,
            currentUserId:''
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {

            if (this.props.userEmail != 'jesusyx22@gmail.com') {
                db.collection('usuarios').where('email', '==', this.props.userEmail).get()
                .then(snapshot => snapshot.forEach(doc => {
                    /* console.log(doc.data().email, doc.id, 'USUARIO ACTUAL') */
                    db.collection('usuarios').doc(doc.id).collection('owncourses').get()
                    .then( snapshot => {
                        snapshot.docs.map(doc => {
                            db.collection('Cursos').where('title', '==', doc.data().course).get()
                            .then(querySnapshot => querySnapshot.forEach(doc => {
                                this.setState({
                                    cursos:[...this.state.cursos, doc],
                                    isFetched:true
                                })
                            }))
                        })
                    })
                }))
            } else {
                db.collection('Cursos').orderBy("timestamp", "desc").get()
                .then(querySnapshot => {
                    this.setState({
                        cursos:querySnapshot.docs,
                        isFetched:true
                    })
                    console.log("SE EJECUTA IF")
                })
                .catch((error) =>{
                    console.log("Error getting documents: ", error);
                })
            }
           





            
            
                

            
        
    }
    



    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    

    render(){
        console.log(this.state.cursos,'cursos?')
        /* console.log(this.state.userCursos.map(doc => doc.data()),'USERCURSOS') */
        const menu = (
            <Menu>
              <Menu.Item>
                <a onClick = {this.props.handleLogout}>Salir</a>
              </Menu.Item>
            </Menu>
          )
        return(
            
            <Layout>
              <Header style={{ background: '#1A1A1A', padding: 0, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'nowrap' }}>
                <h2 style={{ color:'#fff', marginLeft:'1rem'}}><Link to="/cursos">INCA Capacitaciones</Link></h2>
                <div style={{ display:'flex', justifyContent: 'end', flexWrap:'nowrap', alignItems:'center' }}>
                  <Avatar size="large" icon="user" style={{ marginRight: '0.5rem' }} />
                  <Dropdown overlay={menu}  >
                    <p className="ant-dropdown-link" style={{ marginRight: '1rem', color:'#fff', cursor:'default', marginBottom:0, display:'flex', flexWrap:'nowrap', alignItems:'center' }}> 
                      {this.props.userEmail}  <Icon type="down" />
                    </p>
                  </Dropdown>
                </div>
              </Header>

              <Route exact path="/cursos" render={({match})=>{

                      return (
                        <div>
                            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                                <Menu.Item key="mail">
                                    <Icon type="appstore" />
                                    Mis Cursos
                                </Menu.Item>
                                <Menu.Item key="users">
                                        <Icon type="search" />
                                        Explorar
                                </Menu.Item>
                                <Menu.Item key="app">
                                    <Icon type="setting" />
                                    Ajustes
                                </Menu.Item>
                            </Menu>

                            <div style={{ padding: 24, background: '#fff', textAlign: 'center', display:'flex', justifyContent:'space-around', flexWrap:'wrap'}}>
                                {this.state.isFetched ? this.state.cursos.map((doc,key) => (

                                    <Link key={key} to={`/cursos/${doc.id}`}>
                                        <Card
                                            hoverable
                                            style={{ width: 240, marginBottom: '1rem', margin:'0 0.5rem 1rem 0.5rem' }}
                                            cover={<img alt="example" style={{ height:'238px', width:'238px', objectFit:'cover', objectPosition:'center' }} src={doc.data().picture ? doc.data().picture: "https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/06/Instructional-Design-Courses-and-Programs-01.jpg"} />}
                                        >
                                            <Meta title={doc.data().title} description={doc.data().subtitle} />
                                        </Card>
                                    </Link>
                                )): <Spin size="large" style={{display:'flex', justifyContent:'center', alignItems:'center'}} />}
                                
                            </div>
                        </div>
                      )
                    
                }}/>
                <Route exact path="/cursos/:idcurso" render={({match})=>{
                    
                      return (
                        <VideoPlayer match={match}/>
                      )
                    
                    
                }}/>

              
            </Layout>
        )
    }
}
export default ClientSide