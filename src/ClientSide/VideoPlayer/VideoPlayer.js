import React, { Component } from 'react'
import { Row, Col } from 'antd';
import './VideoPlayer.css'
import { List,  Layout, PageHeader, Button, Icon, Menu } from 'antd';
import { db } from '../../firebase.js'


class VideoPlayer extends Component {
    constructor(){
        super();
        this.state = {
            /* archivos:[], */
            videos:[],
            cursoName:''
        }
    }
    componentDidMount() {
        db.collection("Cursos").doc(this.props.match.params.idcurso).get()
        .then(querySnapshotForName => {
            this.setState({
                cursoName:querySnapshotForName.data().title
            })
        })
        .catch((error) =>{
            console.log("Error getting documentoforName: ", error);
        })

        /*-----------------------------------------------------------------------*/

        db.collection("Cursos").doc(this.props.match.params.idcurso).collection('Archivos').orderBy("timestamp", "asc").get()
        .then(querySnapshot => {
/*             this.setState({
                archivos:querySnapshot.docs
            }) */

            querySnapshot.docs.map( archivo => {
                db.collection("Cursos").doc(this.props.match.params.idcurso).collection('Archivos').doc(archivo.id).collection('videos').orderBy("timestamp", "asc").get()
                .then( querySnapshotforVideos =>{
                    this.setState({
                        videos:[...this.state.videos, {doc:querySnapshotforVideos.docs, seccion: archivo.data().seccionName, id:archivo.id}]
                    })
                    
                })
            })
        })
        .catch((error) =>{
            console.log("Error getting documents: ", error);
        })
        /*-----------------------------------------------------------------------*/
    }
    render(){
        console.log(this.props.match)
        return(
            <div>
                <Row>
                    <Col  xs={24} md={8}>
                    <h2 style={{ textAlign:'center', padding:'1rem' }}>{this.state.cursoName}</h2>

                    {this.state.videos.map( (archivo, index) => {
                        return(
                            <div key={index}>
                            <PageHeader   title={archivo.seccion}
                                    style={{ background:'rgba(0,0,0,0.1)' }}
                                    /* subTitle="Lista de Cursos" */
                                    
                            />
                            <ul className="video">
                                {archivo.doc.map( (video, key) => {
                                    return(
                                        <li key={key} className="video"><p className="video">{video.data().title}</p></li>
                                    )
                                })}
                            </ul>
                            </div>
                            
                        )
                    })}

                    </Col>
                    <Col xs={24} md={16}>
                        loremdskajdsajdsjjda
                    </Col>
                </Row>
            </div>
        )
    }
}
export default VideoPlayer