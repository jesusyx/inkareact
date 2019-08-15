import React, { Component } from 'react'
import { Tabs, Layout } from 'antd';
import { db } from '../../firebase.js'

const { TabPane } = Tabs;

class SingleCourse extends Component {
    constructor(){
        super();
        this.state = {
            courseDoc:{}
        }
        this.callback = this.callback.bind(this)
    }
    componentDidMount(){
        let docRef = db.collection("Cursos").doc(this.props.match.params.idcurso)
        docRef.get().then(doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                this.setState({
                    courseDoc: doc.data()
                })
            } else {
                console.log("Nosuch Document!")
            }
        }).catch( error => {
            console.log("Error getting Document: ", error)
        });
    }

    callback(key) {
        console.log("tabKey: ",key);
    }
    render() {
        console.log(this.props.match,"idcurso")
        console.log(this.state.courseDoc,"State courseDoc")
        return(
            <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center'}}>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Agregar archicos" key="1">
                            <center><img src="https://firebasestorage.googleapis.com/v0/b/inkaperucourses.appspot.com/o/drop.png?alt=media&token=a7e3d82c-d011-4a21-84ce-88674befa564" alt=""/> </center>                          
                        </TabPane>
                        <TabPane tab="Informacion" key="2">
                            Informacion del curso:
                            {this.state.courseDoc.title}                            
                        </TabPane>

                        <TabPane tab="Contenido" key="3">
                            Contenido:
                            {this.state.courseDoc.subtitle}

                        </TabPane>

                        <TabPane tab="Comentarios" key="4">
                            Comentarios
                        </TabPane>
                    </Tabs>
                </div>
            </Layout.Content>
            
        )
    }
}
export default SingleCourse