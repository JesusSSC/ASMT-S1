import {Selector, t} from 'testcafe'

class LogingPage{
    constructor(){
        this.usernameField = Selector('#user-name')
        this.paswordField = Selector('#password')
        this.loginButton = Selector('#login-button')
        this.errorMessage = Selector('#login_button_container')
    }
    // To Sign IN with credentials
    async SignIn(username, password) {
        await t.typeText(this.usernameField, username)
        await t.typeText(this.paswordField, password)
        await t.click(this.loginButton)    
    }
}
export default new LogingPage()