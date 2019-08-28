import React, { Component } from 'react'
import { Layout, Table, Divider, Tag } from 'antd'
import { db } from '../../firebase.js'


const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      /* render: text => <a href="javascript:;">{text}</a>, */
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      key: 'rol',
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
      key: 'acciones',
      render: () => (
        <span>
          <a href="javascript:;">ver</a>
          <Divider type="vertical" />
          <a href="javascript:;">Eliminar</a>
        </span>
      ),
    },
  ];
  
/*   const data = [
    {
      nombre: '2John Brown2',
      apellidos: 232,
      email: '2New York No. 1 Lake Park',
      rol: 'administrador',
    },
    {
      nombre: '3John Brown',
      apellidos: 332,
      email: '3New York No. 1 Lake Park',
      rol: 'Estudiante',
    },
    {
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
        }
    }
    componentDidMount() {
        db.collection('usuarios').get()
        .then(Snapshot => {
            this.setState({
                users:Snapshot.docs
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
                   <Table columns={columns} dataSource={this.state.users.map( doc => doc.data())} scroll={{ x: 600 }}/>
                </div>
            </Layout.Content>
        )
    }
}
export default AllUsers