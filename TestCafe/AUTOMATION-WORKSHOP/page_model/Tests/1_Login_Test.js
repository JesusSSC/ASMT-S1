import {Selector} from 'testcafe'
import { CREDENTIALS } from '../Others/Variables';
import LogingPage from '../PageObjects/LogingPage'
import MainPage from '../PageObjects/MainPage'

fixture `Page`
    .page `https://www.saucedemo.com/`;

test('1 Login with a valid user / Validate user navigates to the products page', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    //Checking loging was sucessful
    await t.expect(Selector('#inventory_filter_container').exists).ok()
});
test('2 Login with an invalid user / validate error message is displayed', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.WrongUser.username,CREDENTIALS.WrongUser.password)
    //Checking Error message
    await t.expect(Selector('#login_button_container').innerText).contains('Username and password do not match any user in this service')
});
test('3 Logout from products page / Validate user navigates to the login page', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    await t.expect(Selector('#inventory_filter_container').exists).ok()
    //Logout
    await MainPage.LogOut()
    await t.expect(Selector('#login-button').exists).ok()
});