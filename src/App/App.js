import React, { Component } from 'react';
import HomeApp from '../HomeApp/HomeApp';
import Login from '../Login/Login';
import { BrowserRouter as Router, Route, Redirect  } from 'react-router-dom';
import { db, auth, localauth } from '../firebase.js'
import ClientSide from '../ClientSide/ClientSide'



class App extends Component {
    constructor(){
        super();
        this.state = { 
            user:null,
            isSingIn:false
        }

        this.handleOnCreateEmail = this.handleOnCreateEmail.bind(this);
        this.handleOnAuthEmail = this.handleOnAuthEmail.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        
    }
    componentDidMount () {
        

		auth.onAuthStateChanged( user => {
			if (user) {
                this.setState({ isSingIn:true, user:user })
                
                
			} else {
                this.setState({ isSingIn:false, user:null })
			}
		})

        
        //crear una referencia a una coleccion
        /*
            const usuariosref = db.collection("usuarios").doc();
            usuariosref.set(data)
        */


		/* const usersRef = firebase.database().ref().child('users');

		usersRef.on('child_added', snapshot => {

			this.setState({
				users:this.state.users.concat(snapshot.val()),
			})
		}) */

	}
    
    handleOnCreateEmail(event) {
        event.preventDefault();
		
		let nombre = event.target.nombre.value;
		let email = event.target.email.value;
        let password = event.target.password.value;
        

        /* console.log('Email y password', email,password) */
        

		auth.createUserWithEmailAndPassword(email, password)
		.then( result =>{
            db.collection("usuarios").add({
                nombre,
                email,
                uA:0
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
        //console.log("emila y password", email,password)
        
        auth.setPersistence(localauth.Auth.Persistence.LOCAL)
        .then(function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return auth.signInWithEmailAndPassword(email, password)
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });

		
    }
    handleLogout () {
		auth.signOut()
			.then( () => console.log('Te has desconectado'))
			.catch( () => console.log('Un error ah ocurrido'))
	}

    render() {
        console.log('ESTADO USER:',this.state.user)
        /*REDIRECT TO LOGIN. CRETE ROUTE TO LOGIN AND... IS STATEUSER = NULL .. USE REDIRECT TO /LOGIN*/
        return(
            <Router>
                <div>
                <Route path="/admin" render={({match})=>{
                    if (this.state.isSingIn && this.state.user.email == 'jesusyx22@gmail.com' ){
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