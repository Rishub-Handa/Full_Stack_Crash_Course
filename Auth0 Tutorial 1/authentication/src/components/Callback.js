import React, { Component } from 'react'
import Auth from '../Auth';

class Callback extends Component {

    // Auth0 redirects to CallBack page after authentication. 
    componentDidMount() {
        const auth = new Auth(); 

        // The Auth() class handles the Authentication and redirects the User based on the success of the authentication. 
        auth.handleAuthentication(); 
    }

    render() {
        return (
            <div>
                Loading...
            </div>
        )
    }
}
export default Callback; 