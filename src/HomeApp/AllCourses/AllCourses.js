import React, {Component} from 'react'
import { Layout, Card, Spin } from 'antd'
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
        db.collection('Cursos').orderBy("timestamp", "desc").get()
        .then(querySnapshot => {
            this.setState({
                cursos:querySnapshot.docs,
                isFetched:true
            })
        })
        .catch((error) =>{
            console.log("Error getting documents: ", error);
        })
    }
    render() {
        {this.state.cursos.map( doc => console.log(doc.id,'DOC.DATA() as well'))}
        return(

            
           <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center', display:'flex', justifyContent:'space-around', flexWrap:'wrap'}}>
                    {this.state.isFetched ? this.state.cursos.map((doc,key) => (

                                <Link key={key} to={`/admin/cursos/${doc.id}/archivos`}>
                                    <Card
                                        hoverable
                                        style={{ width: 240, marginBottom: '1rem', margin:'0 0.5rem 1rem 0.5rem' }}
                                        cover={<img alt="course" style={{ height:'238px', width:'238px', objectFit:'cover', objectPosition:'center' }} src={doc.data().picture ? doc.data().picture: "https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/06/Instructional-Design-Courses-and-Programs-01.jpg"} />}
                                    >
                                        <Meta title={doc.data().title} description={doc.data().subtitle} />
                                    </Card>
                                </Link>
                            )) :
                            <Spin size="large" />
                    }
                    
                    
                </div>
            </Layout.Content> 
        )
    }
}

export default AllCourses
