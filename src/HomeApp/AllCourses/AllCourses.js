import React, {Component} from 'react'
import { Layout, Card } from 'antd'
import { db } from '../../firebase.js'
import { Link } from 'react-router-dom'
const { Meta } = Card;

class AllCourses extends Component {
    constructor(props){
        super(props);
        this.state = {
            cursos:[]
        }
    }
    componentDidMount() {
        db.collection('Cursos').get()
        .then(querySnapshot => {
            this.setState({
                cursos:querySnapshot.docs
            })
        })
        .catch((error) =>{
            console.log("Error getting documents: ", error);
        })
    }
    render() {
        {this.state.cursos.map( doc => console.log(doc.data()))}
        return(
           <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center', display:'flex', justifyContent:'space-around', flexWrap:'wrap'}}>
                    {this.state.cursos.map(doc => (

                        <Link to={`/admin/cursos/${doc.id}`}>
                            <Card
                                hoverable
                                style={{ width: 240, marginBottom: '1rem', margin:'0 0.5rem 1rem 0.5rem' }}
                                cover={<img alt="example" src={doc.data().picture ? doc.data().picture: "https://olc-wordpress-assets.s3.amazonaws.com/uploads/2018/06/Instructional-Design-Courses-and-Programs-01.jpg"} />}
                            >
                                <Meta title={doc.data().title} description={doc.data().subtitle} />
                            </Card>
                        </Link>
                    ))}
                    
                </div>
            </Layout.Content> 
        )
    }
}

export default AllCourses
