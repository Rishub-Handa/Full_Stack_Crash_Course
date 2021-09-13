import React, { Component } from 'react'

class Secret extends Component {
    render() {
        return (
            <div>
                This is a super secret area. 
                <br /> 
                <button onClick={this.props.auth.logout}>Log Out</button> 
            </div>
        )
    }
}
export default Secret; 