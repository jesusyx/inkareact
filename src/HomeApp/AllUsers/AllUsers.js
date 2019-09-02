import React, { Component } from 'react'
import { Layout, Table, Divider, Tag, Icon, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { db } from '../../firebase.js'



const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: '1',
      /* render: text => <a href="javascript:;">{text}</a>, */
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: '2',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '3',
    },
    {
      title: 'Rol',
      key: '4',
      dataIndex: 'rol',

      render: rol => {
        let color;
            if (rol === 'administrador') {
            color = 'geekblue';
            } else {
                color = 'green'
            }
        return(
                <Tag color={color} key={rol}>
                    {rol.toUpperCase()}
                </Tag>
            )
        }
    },
    {
      title: 'Acciones',
      key: '5',
      render: (data) => (
        <span>
          <Link to={`/admin/usuarios/${data.key}`}>
            <Icon type="eye" theme="twoTone" />
          </Link>
          <Divider type="vertical" />
          <Icon type="edit" theme="twoTone" twoToneColor="#52c41a"/>
          <Divider type="vertical" />
          <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
        </span>
      ),
    },
  ];
  
   /* const data = [
    { 
      key:'1',
      nombre: '2John Brown2',
      apellidos: 232,
      email: '2New York No. 1 Lake Park',
      rol: 'administrador',
    },
    {
      key:'2',
      nombre: '3John Brown',
      apellidos: 332,
      email: '3New York No. 1 Lake Park',
      rol: 'Estudiante',
    },
    {
      key:'3',
      nombre: '4John Brown',
      apellidos: 432,
      email: '4New York No. 1 Lake Park',
      rol: 'Estudiante',
    },

  ]; */ 

class AllUsers extends Component {
    constructor() {
        super();
        this.state = {
            users:[],
            isFetched:false
        }
    }
    componentDidMount() {
        db.collection('usuarios').orderBy("timestamp", "desc").get()
        .then(Snapshot => {
            this.setState({
                users:Snapshot.docs,
                isFetched:true
            })
        })
        .catch((error) =>{
            console.log("Error getting documents: ", error);
        })
    }
    render(){
        console.log(this.state.users)
        return(
            <Layout.Content style={{ margin: '24px 0 0', overflow: 'initial' }}>
                
                <div style={{ margin:'0 0.5rem',background: '#fff', textAlign: 'center', marginBottom:'1rem' }}>
                {this.state.isFetched ? 
                  <Table  columns={columns} dataSource={this.state.users.map( doc => doc.data())} scroll={{ x: 600 }}/>
                  :<Spin size="large" />}
                </div>
                
                
            </Layout.Content>
        )
    }
}
export default AllUsers