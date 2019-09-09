import React, {Component} from 'react'
import { Layout, Card, Spin, Skeleton, Icon} from 'antd'
import { db } from '../../firebase.js'
import { Link } from 'react-router-dom'
const { Meta } = Card;




class AllCourses extends Component {
    constructor(props){
        super(props);
        this.state = {
            cursos:[],
            isFetched:false
        }
    }
    componentDidMount() {
        db.collection('Cursos').orderBy("timestamp", "desc")
        .onSnapshot(querySnapshot => {
            this.setState({
                cursos:querySnapshot.docs,
                isFetched:true
            })
        })
    }


    handleDeleteDoc(uid) {
        console.log(uid)
        db.collection('Cursos').doc(uid).delete()
      }


    render() {
        {this.state.cursos.map( doc => console.log(doc.id,'DOC.DATA() as well'))}
        return(

            
           <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center', display:'flex', justifyContent:'space-around', flexWrap:'wrap'}}>
                    {this.state.isFetched ? this.state.cursos.map((doc,key) => (

                                
                                    <Card
                                        actions={[
                                            <Icon type="edit" key="edit" theme="twoTone" />,
                                            <Icon onClick={() => this.handleDeleteDoc(doc.id)} type="delete" key="delete" theme="twoTone" twoToneColor="#eb2f96"/>,
                                            <Icon type="ellipsis" key="ellipsis" />,
                                        ]}
                                        hoverable
                                        style={{ width: 240, marginBottom: '1rem', margin:'0 0.5rem 1rem 0.5rem' }}
                                        cover={
                                            <Link key={key} to={`/admin/cursos/${doc.id}/archivos`}>
                                                <img alt="course" style={{ height:'238px', width:'238px', objectFit:'cover', objectPosition:'center' }} src={doc.data().picture ? doc.data().picture: "https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/06/Instructional-Design-Courses-and-Programs-01.jpg"} />
                                            </Link>
                                        }
                                    >
                                        <span style={{cursor:'default'}}>
                                            <Meta title={doc.data().title} description={doc.data().subtitle} />
                                        </span>
                                    </Card>
                                
                            )) :
                            <Card
                                style={{ width: 240, marginBottom: '1rem', margin:'0 0.5rem 1rem 0.5rem' }}
                                actions={[
                                    <Icon type="edit" key="edit" theme="twoTone" />,
                                    <Icon type="delete" key="delete" theme="twoTone" twoToneColor="#eb2f96"/>,
                                    <Icon type="ellipsis" key="ellipsis" />,
                                  ]}
                            >
                             <Skeleton loading={!this.state.isFetched} avatar active>
                             </Skeleton>
                            </Card>
                    }
                    
                    
                </div>
            </Layout.Content> 
        )
    }
}

export default AllCourses
