import React, { Component } from 'react';
import HomeApp from '../HomeApp/HomeApp';
import Login from '../Login/Login';
import { BrowserRouter as Router, Route, Redirect  } from 'react-router-dom';
import { db, auth,  currentTime } from '../firebase.js'
import ClientSide from '../ClientSide/ClientSide'
import uuid from 'uuid'



class App extends Component {
    constructor(){
        super();
        this.state = { 
            user:null,
            isSingIn:false,
            
        }

        this.handleOnCreateEmail = this.handleOnCreateEmail.bind(this);
        this.handleOnAuthEmail = this.handleOnAuthEmail.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        
    }
    componentDidMount () {
        

		auth.onAuthStateChanged( user => {
			if (user) {
                this.setState({ isSingIn:true, user:user })


                /* db.collection('usuarios').where('email', '==', user.email).get()
                .then(snapshot => snapshot.forEach(doc => {
                    console.log(doc.data().email, doc.id, 'USUARIO ACTUAL')
                    this.setState({
                        currentUserId:doc.id
                    })
                })) */
                
                
			} else {
                this.setState({ isSingIn:false, user:null })
			}
		})
	}
    
    handleOnCreateEmail(event) {
        event.preventDefault();
		
        let nombre = event.target.nombre.value;
        let apellidos = event.target.apellidos.value;
		let email = event.target.email.value;
        let password = event.target.password.value;
        

        /* console.log('Email y password', email,password) */
        

		auth.createUserWithEmailAndPassword(email, password)
		.then( result =>{
            db.collection("usuarios").add({
                key:uuid.v4(),
                timestamp:currentTime.FieldValue.serverTimestamp(),
                nombre,
                apellidos,
                email,
                rol:'estudiante'
                
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
			console.log(result)
		})
		.catch(function(error) {
  		let errorCode = error.code;
  		let errorMessage = error.message;
  		alert(errorMessage, errorCode)
  	
		})
    }

    handleOnAuthEmail(event) {
        event.preventDefault()

		let email = event.target.email.value;
		let password = event.target.password.value;

        auth.signInWithEmailAndPassword(email, password)

		
    }
    handleLogout () {
		auth.signOut()
			.then( () => console.log('Te has desconectado'))
			.catch( () => console.log('Un error ah ocurrido'))
	}

    render() {
        console.log('ESTADO USER:',this.state.user)
        /* EL User .. solo se usa para obtener datos o reemplazar .. no se usa para guardarlo todo */
        return(
            <Router>
                <div>
                <Route path="/admin" render={({match})=>{
                    if (this.state.isSingIn && this.state.user.uid == 'uwG06tfXmVQ3vXDYU8Ksbzyu2Wf1' ){
                        return (
                            <HomeApp
                                user = {this.state.user}
                                handleLogout = {this.handleLogout}
                            />   
                        )
                    } else {
                        return (
                            <Login
                                handleOnCreateEmail = {this.handleOnCreateEmail}
                                handleOnAuthEmail = {this.handleOnAuthEmail}
                                match = {match}

                            />
                        )
                    }
                }}/>
                <Route path="/cursos" render={({match}) => {
                    if (this.state.isSingIn){
                        return (
                            <div>
                                
                                <ClientSide
                                    userEmail={this.state.user.email}
                                    
                                    match = {match}
                                    handleLogout = {this.handleLogout}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <Login
                                handleOnCreateEmail = {this.handleOnCreateEmail}
                                handleOnAuthEmail = {this.handleOnAuthEmail}
                                match = {match}
                            />
                        )
                    }
                }}/>
                <Route exact path="/" render={({match}) => {
                    return(
                        <Redirect to="/cursos" />
                    )
                    
                }}/>
                </div>
            </Router>
        )  
    }
    
}
export default App