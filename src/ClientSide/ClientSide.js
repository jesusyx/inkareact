import React, { Component } from 'react'
import { Card, Avatar, Layout, PageHeader, Button, Icon, Menu, Dropdown } from 'antd';
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
            cursos:[]
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        db.collection('Cursos').get()
        .then(querySnapshot => {
            this.setState({
                cursos:querySnapshot.docs
            })
        })
        .catch((error) =>{
            console.log("Error getting documents: ", error);
        })
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    

    render(){
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
                <h2 style={{ color:'#fff', marginLeft:'1rem'}}>INCA Capacitaciones</h2>
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
                                {this.state.cursos.map((doc,key) => (

                                    <Link key={key} to={`/cursos/${doc.id}`}>
                                        <Card
                                            hoverable
                                            style={{ width: 240, marginBottom: '1rem', margin:'0 0.5rem 1rem 0.5rem' }}
                                            cover={<img alt="example" src={doc.data().picture ? doc.data().picture: "https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/06/Instructional-Design-Courses-and-Programs-01.jpg"} />}
                                        >
                                            <Meta title={doc.data().title} description={doc.data().subtitle} />
                                        </Card>
                                    </Link>
                                ))}
                                
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