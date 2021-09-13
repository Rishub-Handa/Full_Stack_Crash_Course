const auth0 = require('auth0-js'); 

const LOGIN_SUCCESS_PAGE = '/secret'; 
const LOGIN_FAILURE_PAGE = '/'; 

class Auth { 
    auth0 = new auth0.WebAuth({
        domain: 'dev-744y5y-z.auth0.com', 
        clientID: 'uwagSeDiFwczVfdJYbV2bXDRmgJWXo3k', 
        redirectURI: 'http://localhost:3000/callback', 
        audience: 'https://dev-744y5y-z.auth0.com/userinfo', 
        responseType: 'token id_token', 
        scope: 'openid' 
    }) 

    constructor() {
        this.login = this.login.bind(this); 
    }

    // Sends User to Auth0 to Authenticate 
    login() {
        this.auth0.authorize(); 
    }

    // Remove Local Storage Token Data 
    logout() {
        localStorage.removeItem("access_token"); 
        localStorage.removeItem("id_token"); 
        localStorage.removeItem("expires_at"); 
        window.location.pathname = LOGIN_FAILURE_PAGE; 
    }

    // What happens after the authentication. 
    handleAuthentication() {
        this.auth0.parseHash((err, authResults) => {
            if(authResults && authResults.accessToken && authResults.idToken) {
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime()); 
                // Store Access Token in Local Storage and Clear Hash 
                localStorage.setItem("access_token", authResults.accessToken); 
                localStorage.setItem("id_token", authResults.idToken); 
                localStorage.setItem("expires_at", expiresAt); 
                window.location.hash = ""; 
                
                // Redirect User on Success 
                window.location.pathname = LOGIN_SUCCESS_PAGE; 
            } else if (err) {
                window.location.pathname = LOGIN_FAILURE_PAGE; 
                console.log(err); 
            }
        })
    }

    // Check if still authenticated. 
    isAuthenticated() {
        let expiresAt = localStorage.getItem("expires_at"); 
        return new Date().getTime() < expiresAt; 
    }

    // Use jwt-decode library to access payload information from JSON Web Token. 

}

export default Auth; 