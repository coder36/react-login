import React from 'react'
import '../app.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Jumbotron, Table, Button , Input, Modal, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import ReactDOM from 'react-dom'
import graphQL from '../graphql'
import {saveLoginSession} from '../store_helpers'
import { browserHistory, Link } from 'react-router'

const token_query = `
  query _($username: String!, $password: String! ) {
    token( username: $username password: $password) {
        token
        errors
    }
   }`;

const user_query = `
    query _($token: String!) {
        viewer( token: $token ) {
           username
           name
        }
    }
`

import {connect} from 'react-redux'
export default connect((state) => state) (
    class Signin extends React.Component {

        constructor(props) {
            super(props)
            this.state = {error: null};
        }

        onLogin() {
            let password = ReactDOM.findDOMNode(this.refs.password).value
            let username = ReactDOM.findDOMNode(this.refs.username).value
            if ( password.length === 0 || username.length === 0) {
                this.setState( {error: "You must provide a username and password"})
            }
            else {
                graphQL.query( token_query, {username, password}).then( (res) => {
                    let token = res.token;

                    if ( token.errors ) {
                        this.setState( {error: "Incorrect username and or password"})
                    }
                    else {
                        saveLoginSession(this.props.dispatch, {token: token.token})
                        graphQL.query( user_query, {token: token.token}).then( (res) => {
                            saveLoginSession(this.props.dispatch, {token: token.token, user: res.viewer})
                            browserHistory.push("/loggedin");
                        })

                    }
                })
            }
        }


        render() {
            return(
                <div className="container">
                    <br/>
                    <Jumbotron>
                        <h1>Sign<span className="logo_highlight">in</span></h1>
                        <p>Try marky/password</p>

                        <FormGroup bsSize="large" validationState={this.state.error ? "error" : null}>
                            {this.state.error? <ControlLabel>{this.state.error}</ControlLabel> : null}
                            <FormControl ref="username" type="text" placeholder="Username"/>
                            <FormControl ref="password" type="password" placeholder="Password"/>
                            <br/>
                            <Button bsStyle="primary" bsSize="large" block onClick={()=>this.onLogin()}>Login</Button>
                        </FormGroup>

                    </Jumbotron>
                </div>
            )
        }
    }
)
