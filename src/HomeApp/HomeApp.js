import React, { Component }  from 'react';
import { Layout, Menu, Icon, Dropdown, PageHeader, Button, Avatar  } from 'antd';
import { Fragment } from 'react';
import './HomeApp.css'
import { Route, Link } from 'react-router-dom';
import AllCourses from './AllCourses/AllCourses'
import AllUsers from './AllUsers/AllUsers'
import NewUserForm from './NewUserForm/NewUserForm'
import CourseFiles from './CourseFiles/CourseFiles'
import NuevoCursoForm from './NuevoCursoForm/NuevoCursoForm'
import UserDetails from './UserDetails'



const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

class HomeApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }

    this.setCollapsed = this.setCollapsed.bind(this);
  }

  setCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }




  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick = {this.props.handleLogout}>Salir</a>
        </Menu.Item>
      </Menu>
    )
      return (
        <Fragment>
          <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}

                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'sticky',
                  top: 0,
                  left: 0,
                  
                }}
              >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} inlineCollapsed={this.state.collapsed}>
                <Menu.Item key="1">
                  <Link to="/admin/">
                    <Icon type="user" />
                    <span className="nav-text">DashBoard</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/admin/usuarios/">
                    <Icon type="video-camera" />
                    <span className="nav-text">Usuarios</span>
                  </Link>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>Cursos</span>
                      </span>
                    }
                  >
                  <Menu.Item key="3">
                    <Link to="/admin/cursos/">
                      <span className="nav-text">Todos los cursos</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="4">
                  <Icon type="bar-chart" />
                  <span className="nav-text">nav 4</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="cloud-o" />
                  <span className="nav-text">nav 5</span>
                </Menu.Item>
                <Menu.Item key="6">
                  <Icon type="appstore-o" />
                  <span className="nav-text">nav 6</span>
                </Menu.Item>
                <Menu.Item key="7">
                  <Icon type="team" />
                  <span className="nav-text">nav 7</span>
                </Menu.Item>
                <Menu.Item key="8">
                  <Icon type="shop" />
                  <span className="nav-text">nav 8</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'nowrap' }}>
                <Icon
                    className="trigger"
                    type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.setCollapsed}
                  />
                <div style={{ display:'flex', justifyContent: 'end', flexWrap:'nowrap', alignItems:'center' }}>
                  <Avatar size="large" icon="user" style={{ marginRight: '0.5rem' }} />
                  <Dropdown overlay={menu}  >
                    <p className="ant-dropdown-link" style={{ marginRight: '1rem', cursor:'default', marginBottom:0, display:'flex', flexWrap:'nowrap', alignItems:'center' }}> 
                      {this.props.user.email} <Icon type="down" />
                    </p>
                  </Dropdown>
                </div>
              </Header>
                
                  <Route exact path="/admin/" render={()=>{
                    return (
                      <div style={{ marginTop: '1rem' }}>
                        <PageHeader  title="Dashboard" subTitle="Resumen y estadisticas" />
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                          ...
                          <br />
                          DashBoard
                          <br />
                          content
                          </div>
                        </Content>
                      </div>
                    )
                  }}/>
                  <Route exact path="/admin/usuarios/" render={()=>{
                    return (
                      <div style={{ marginTop: '1rem' }}>
                        <PageHeader   
                                      key={'000'}
                                      title="Usuarios"
                                      subTitle="Todos los usuarios"
                                      extra={[
                                        <Link key='000' to="/admin/usuarios/nuevo">
                                          <Button type="default" size="default" >
                                            Nuevo usuario
                                          </Button>
                                        </Link>
                                      ]}
                          />
                        <AllUsers/>
                      </div>
                    )
                  }}/>
                  <Route exact path="/admin/cursos/" render={()=>{
                    return (
                      <div style={{ marginTop: '1rem' }}>
                        <PageHeader   title="Cursos (3)"
                                      /* subTitle="Lista de Cursos" */
                                      extra={[
                                        <Link key='001' to="/admin/cursos/nuevo">
                                          <Button type="primary" size="default" >
                                            Nuevo Curso
                                          </Button>
                                        </Link>
                                      ]}
                        />
                        <AllCourses/>
                      </div>
                    )
                  }}/>
                  <Route  path="/admin/cursos/:idcurso" render={({match})=>{
                    if (match.url=="/admin/cursos/nuevo") {
                      return;
                    }else{
                      return (
                        <div style={{ marginTop: '1rem' }}>
                          {/* <SingleCourse
                            match = {match}
                          /> */}
                          
                          <CourseFiles  match = {match} />
                        </div>
                        /* idPaciente = {parseInt(match.params.idPaciente)} */
                      )
                    }
                    
                  }}/>
                  
                  
                  <Route path="/admin/cursos/nuevo" render={()=>{
                    return (
                      <div style={{ marginTop: '1rem' }}>
                        <PageHeader   title="Nuevo Curso"
                        />
                        <NuevoCursoForm/>
                      </div>
                    )
                  }}/>
                  <Route path="/admin/usuarios/nuevo" render={()=>{
                    return (
                      <div style={{ marginTop: '1rem' }}>
                        <PageHeader   title="Nuevo Usuario"
                        />
                        <NewUserForm/>
                      </div>
                    )
                  }}/>

                  <Route path="/admin/usuarios/:idusuario" render={({match})=>{
                    if (match.url=="/admin/usuarios/nuevo") {
                      return;
                    }else{
                    return (
                      <UserDetails
                        match = {match}
                      />
                    )
                  }
                  }}/>
                
              <Footer style={{ textAlign: 'center', background:'#fff' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Fragment>
      );
  }
}

export default HomeApp;


