import React, { Component } from 'react'

class Main extends Component {
    render() {
        return (
            <div>
                <p>Hello, {this.props.name}. </p>
                <p>Do you want to see the secret area? <a href="/secret">Click Here. </a></p>

                {!this.props.auth.isAuthenticated() && 
                    <div>
                        <hr /> 
                        Please log in first. 
                        <hr /> 
                        <button onClick={this.props.auth.login}>Log In</button>
                    </div>
                }

                

            </div>
        )
    }
}

export default Main; 
