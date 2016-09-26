import React from 'react'

import { Jumbotron} from 'react-bootstrap';

import {connect} from 'react-redux'
export default connect((state) => state) (
    class extends React.Component {

        render() {
            let session = this.props.session.login
            return(
            <div className="container">
                <br/>
                <Jumbotron>
                    <h1>Sign<span className="logo_highlight">in</span></h1>
                    <p>Welcome back {session.user.name}</p>
                </Jumbotron>
            </div>

            )
        }
    }
)