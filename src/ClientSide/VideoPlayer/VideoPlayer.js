import React, { Component } from 'react'
import { Row, Col } from 'antd';
import './VideoPlayer.css'
import { PageHeader, Icon, Spin } from 'antd';
import "video-react/dist/video-react.css";
import { Player,ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton, } from 'video-react';
import { db } from '../../firebase.js'




class VideoPlayer extends Component {
    constructor(){
        super();
        this.state = {
            /* archivos:[], */
            videos:[],
            cursoName:'',
            videourl:'',
            picture:'',
            isFetched: false
        }

        this.handleGetVideoUrl = this.handleGetVideoUrl.bind(this)
    }

    handleGetVideoUrl(video){
        console.log(video, 'Desde Video')
        this.setState({videourl:video, clicked:true})
    }

    
    componentDidMount() {
        db.collection("Cursos").doc(this.props.match.params.idcurso).get()
        .then(querySnapshotForName => {
            this.setState({
                cursoName:querySnapshotForName.data().title,
                picture:querySnapshotForName.data().picture
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
                        videos:[...this.state.videos, {doc:querySnapshotforVideos.docs, seccion: archivo.data().seccionName, id:archivo.id}],
                        isFetched:true
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
        console.log(this.state.picture,'picture')
        return(
            <div>
                <Row>
                    <Col  xs={24} md={6}>
                    <h2 style={{ textAlign:'center', padding:'1rem' }}>{this.state.cursoName}</h2>

                    {this.state.isFetched ? this.state.videos.map( (archivo, index) => {
                        return(
                            <div key={index}>
                            <PageHeader   title={archivo.seccion}
                                    style={{ background:'rgba(0,0,0,0.1)' }}
                                    /* subTitle="Lista de Cursos" */
                                    
                            />
                            <ul className="video">
                                {archivo.doc.map( (video, key) => {
                                    return( 
                                        <li key={key} onClick={() => this.handleGetVideoUrl(video.data().video)} className="video"><p className="video"><Icon type="play-circle" theme="twoTone" /> {video.data().title}</p></li>
                                    )
                                })}
                            </ul>
                            </div>
                            
                        )
                    }): <Spin size="large" style={{display:'flex', justifyContent:'center'}} />}

                    </Col>


                    <Col xs={24} md={18}>
                        {/* <video className="videoxd" controls key={this.state.videourl != '' ? this.state.videourl : null}>
                            <source src={this.state.videourl != '' ? this.state.videourl : null} type="video/mp4"/>
                        </video>  */}
                        <Player
                            className='videoplayerxd'
                            playsInline
                            /* poster={this.state.picture} */
                            src={this.state.videourl != '' ? this.state.videourl : null}
                        >
                        <ControlBar>
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={10} order={1.2} />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                        </ControlBar>
                        </Player>

                        
                    </Col>
                </Row>
            </div>
        )
    }
}
export default VideoPlayer