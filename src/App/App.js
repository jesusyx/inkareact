import React, { Component } from 'react';
import HomeApp from '../HomeApp/HomeApp';
import Login from '../Login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css'
import { db, auth } from '../firebase.js'



class App extends Component {
    constructor(){
        super();
        this.state = { 
            user:null
        }

        this.handleOnCreateEmail = this.handleOnCreateEmail.bind(this);
        this.handleOnAuthEmail = this.handleOnAuthEmail.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        
    }
    componentDidMount () {

		auth.onAuthStateChanged( user => {
			if (user) {
				this.setState({ user:user })
			} else {
				this.setState({user:null})
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
                email
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
		auth.signInWithEmailAndPassword(email, password)
		.then( result => {console.log("resultado:",result)})

		.catch( error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Un error ah ocurrido", errorCode, errorMessage)
            alert("Email o contraseña incorrectos.")
		});
    }
    handleLogout () {
		auth.signOut()
			.then( () => console.log('Te has desconectado'))
			.catch( () => console.log('Un error ah ocurrido'))
	}

    render() {
        console.log('ESTADO USER:',this.state.user)
        return(
            <Router>
                <div>
                <Route path="/admin" render={()=>{
                    if (this.state.user){
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

                            />
                        )
                    }
                }}/>
                <Route exact path="/" render={() => {
                    if (this.state.user){
                        return (
                            <div>
                                <h1>Client Side</h1>
                            </div>
                        )
                    } else {
                        return (
                            <Login
                                handleOnCreateEmail = {this.handleOnCreateEmail}
                                handleOnAuthEmail = {this.handleOnAuthEmail}
                            />
                        )
                    }
                }}/>
                </div>
            </Router>
        )  
    }
    
}
export default App