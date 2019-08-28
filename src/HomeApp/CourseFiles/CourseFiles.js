import React, { Component } from 'react'
import { List, Avatar, Layout, PageHeader, Button, Icon, Menu } from 'antd';
import { Route, Link } from 'react-router-dom';
import Archivos from '../Archivos/Archivos'
import NewSeccionForm from '../NewSeccionForm/NewSeccionForm'
import SingleCourse from '../SingleCourse/SingleCourse'

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
                    <Link to={`/admin/cursos/${this.props.match.params.idcurso}/archivos`}>
                        <Icon type="appstore" />
                        Archivos
                      </Link>
                    </Menu.Item>
                      <Menu.Item key="users">
                        <Link to={`/admin/cursos/${this.props.match.params.idcurso}/estudiantes`}>
                            <Icon type="user" />
                            Estudiantes
                        </Link>
                      </Menu.Item>
                    <Menu.Item key="app">
                      <Link to={`/admin/cursos/${this.props.match.params.idcurso}/ajustes`}>
                        <Icon type="setting" />
                        Ajustes
                      </Link>
                    </Menu.Item>
                </Menu>

              <br/>

              <Route exact path="/admin/cursos/:idcurso/archivos" render={({match})=>{
                    if (match.url=="/admin/cursos/nuevo") {
                      return;
                    } else {
                      return (
                        <Archivos match={this.props.match} match2 = {match} />
                      )
                    }
                    
                }}/>
                 <Route path="/admin/cursos/:idcurso/archivos/nuevaseccion" render={({match})=>{
                    if (match.url=="/admin/cursos/nuevo") {
                      return;
                    } else {
                      return (
                        <NewSeccionForm  match={match} />
                      )
                    }
                    
                }}/>

                 <Route exact path="/admin/cursos/:idcurso/archivos/:idseccion/nuevoarchivo" render={({match})=>{
                  if (match.url=="/admin/cursos/nuevo") {
                    return;
                  }else{
                    return (
                      <div style={{ marginTop: '1rem' }}>                        
                        <SingleCourse match = {match} />
                      </div>
                    )
                  }
                  
                }}/>


                <Route path="/admin/cursos/:idcurso/estudiantes" render={({match})=>{
                    if (match.url=="/admin/cursos/nuevo") {
                      return;
                    } else {
                      return (
                        <PageHeader 
                            title="Estudiantes"
                            subTitle="Redireccionar maybe"
                        />
                      )
                    }
                    
                }}/>
                <Route path="/admin/cursos/:idcurso/ajustes" render={({match})=>{
                    if (match.url=="/admin/cursos/nuevo") {
                      return;
                    } else {
                      return (
                        <PageHeader 
                            title="Ajustes"
                            subTitle="nothing to see"
                        />
                      )
                    }
                    
                }}/>
         </div>
        )
    }

}
export default CourseFiles