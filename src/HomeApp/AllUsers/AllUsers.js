import React, { Component } from 'react'
import { Layout, Table, Divider, Tag, Icon, Spin, Button } from 'antd'
import { Link } from 'react-router-dom'
import { db } from '../../firebase.js'

const { Column, ColumnGroup } = Table;

/* const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: '1',
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
          <Button onClick={console.log("xdxd")}>xd</Button>
        </span>
      ),
    },
  ]; */
  
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

        this.handleDeleteDoc = this.handleDeleteDoc.bind(this)
    }
    componentDidMount() {

        db.collection('usuarios').orderBy("timestamp", "desc")
        .onSnapshot( Snapshot => {
            this.setState({
                users:Snapshot.docs,
                isFetched:true
            })
        })
    }

    handleDeleteDoc(uid) {
      console.log(uid)
      db.collection('usuarios').where('key', '==', uid).get()
      .then( querySnapshot => {
        querySnapshot.forEach( doc => {
          doc.ref.delete()
        })
      })
    }

    render(){
        console.log(this.state.users)

        return(
            <Layout.Content style={{ margin: '24px 0 0', overflow: 'initial' }}>
                
                <div style={{ margin:'0 0.5rem',background: '#fff', textAlign: 'center', marginBottom:'1rem' }}>

                {this.state.isFetched ? 
                  <Table dataSource={this.state.users.map( doc => doc.data())} scroll={{ x: 600 }}>
                  <ColumnGroup title="Name">
                    <Column title="Nombres" dataIndex="nombre" key="firstName" />
                    <Column title="Apellidos" dataIndex="apellidos" key="lastName" />
                  </ColumnGroup>
                  <Column title="Email" dataIndex="email" key="address" />
                  <Column
                    title="Rol"
                    dataIndex="rol"
                    key="somekey99"
                    render={rol => (
                      <span>
                        
                        <Tag color={rol.toUpperCase() == 'ADMINISTRADOR' ? 'geekblue': 'green'} key={rol}>
                          {rol.toUpperCase()}
                        </Tag>
                        
                      </span>
                    )}
                  />
                  <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                      <span>
                        <Link to={`/admin/usuarios/${record.key}`}><Icon type="eye" theme="twoTone" /></Link>
                        <Divider type="vertical" />
                        <Icon type="edit" theme="twoTone" twoToneColor="#52c41a"/>
                        <Divider type="vertical" />
                        
                        {record.key == '1' ? 
                        <Icon  type="delete" theme="twoTone" twoToneColor="#ccc"/>
                        :<Icon onClick={() => this.handleDeleteDoc(record.key) } type="delete" theme="twoTone" twoToneColor="#eb2f96"/>}
                        
                      </span>
                    )}
                  />
                </Table>
                  :<Spin size="large" />}




                </div>
                
                
            </Layout.Content>
        )
    }
}
export default AllUsers