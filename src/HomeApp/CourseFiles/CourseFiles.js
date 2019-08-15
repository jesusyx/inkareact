import React, { Component } from 'react'
import { List, Avatar, Layout, PageHeader, Button, Icon, Menu } from 'antd';
import { Route, Link } from 'react-router-dom';
const { SubMenu } = Menu;


const data = [
    '1. Racing car sprays burning fuel into crowd.',
    '2. Japanese princess to wed commoner.',
    '3. Australian walks 100km after outback crash.',
    '4. Man charged over missing wedding girl.',
    '5. Los Angeles battles huge wildfires.',
  ];

const data2 = [
    '6. Racing car sprays burning fuel into crowd.',
    '7. Japanese princess to wed commoner.',
    '8. Australian walks 100km after outback crash.',
    '9. Man charged over missing wedding girl.',
    '10. Los Angeles battles huge wildfires.',
  ];
  

class CourseFiles extends Component {
    constructor() {
        super();
        this.state = {
            current: 'mail',   
        }

        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render(){
        console.log(this.props.match)
        return(
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="mail">
                        <Icon type="appstore" />
                        Archivos
                    </Menu.Item>
                    <Menu.Item key="users">
                        <Icon type="user" />
                        Estudiantes
                    </Menu.Item>
                    <Menu.Item key="app">
                        <Icon type="setting" />
                        Ajustes
                    </Menu.Item>
                </Menu>

              <br/>
            <PageHeader   title="Curriculum"
                                    /* subTitle="Lista de Cursos" */
                                extra={[
                                
                                    <Button type="default" size="small" >
                                    Nueva Seccion
                                    </Button>
                                
                                ]}
                />
                
                <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial', marginBottom:'1rem' }}>
                    <PageHeader   title="Bienvenida"
                                    style={{ background:'rgba(0,0,0,0.1)' }}
                                    /* subTitle="Lista de Cursos" */
                                    extra={[
                                        <Button type="primary" size="small" >
                                            <span style={{ fontSize:'0.8rem' }}>Nuevo Archivo</span>
                                        </Button>
                                    ]}
                    />
                    <div style={{ padding: 24, background: '#fff'}}>
                    <List
                        size="small"
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                                <div style={{ display:'flex', alignItems:'center', flexWrap:'nowrap'}}>
                                                    <Icon type="cloud-server" style={{marginRight:'0.8rem', color:'#000' }} />
                                                    <p style={{ margin:'0', fontWeith:'700'}}>{item}</p>
                                                </div>
                                                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                            </List.Item>}
                    />
                    </div>
                    <br/>
                    
    
    
                    <PageHeader   title="Segunda Seccion"
                                    style={{ background:'rgba(0,0,0,0.1)' }}
                                    /* subTitle="Lista de Cursos" */
                                    extra={[
                                        <Link to={`/admin/cursos/${this.props.match.params.idcurso}/addnewfile`}>
                                            <Button type="primary" size="small" >
                                                <span style={{ fontSize:'0.8rem' }}>Nuevo Archivo</span>
                                            </Button>
                                        </Link>
                                    ]}
                    />
                    <div style={{ padding: 24, background: '#fff'}}>
                    <List
                        size="small"
                        bordered
                        dataSource={data2}
                        renderItem={item => <List.Item style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                                <div style={{ display:'flex', alignItems:'center', flexWrap:'nowrap'}}>
                                                    <Icon type="cloud-server" style={{marginRight:'0.8rem', color:'#000' }} />
                                                    <p style={{ margin:'0', fontWeith:'700'}}>{item}</p>
                                                </div>
                                                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                            </List.Item>}
                    />
                    </div>
                </Layout.Content>
 </div>
        )
    }

}
export default CourseFiles