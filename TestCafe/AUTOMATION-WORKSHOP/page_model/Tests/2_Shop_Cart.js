import {Selector} from 'testcafe'
import { CREDENTIALS } from '../Others/Variables';
import { AVAILABLEPROD } from '../Others/Variables';
import { AVAILABLEPRODDESC } from '../Others/Variables';

import LogingPage from '../PageObjects/LogingPage'
import MainPage from '../PageObjects/MainPage'
import CartChart from '../PageObjects/CartChart'


fixture `Page`
    .page `https://www.saucedemo.com/`;

test('4 Navigate to the shopping cart / Validate user navigates to the shopping cart page', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    //Acces to shop cart
    await MainPage.CartShopSel()
    await t.expect(Selector('#contents_wrapper').innerText).contains('Your Cart')
    //Logout
    await MainPage.LogOut    
});


test('5 Add a single item to the shopping cart', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    //Select item
    await MainPage.addproduct(AVAILABLEPROD.Sauce_BikeLight)
    //Cheking item is in the cart
    await CartChart.ConfirmNumProdCart('1')
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_BikeLight)
    //Logout
    await MainPage.LogOut 
});


test('6 Add multiple items to the cart / Validate all the items were added to the cart', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    //Select items
    await MainPage.addproduct(AVAILABLEPROD.Sauce_BikeLight)
    await MainPage.addproduct(AVAILABLEPROD.Sauce_FleeceJacket)
    await MainPage.addproduct(AVAILABLEPROD.Sauce_BoltTshirt)
    await MainPage.addproduct(AVAILABLEPROD.Sauce_Backpack)
    await MainPage.addproduct(AVAILABLEPROD.Sauce_Onessie)
    //Cheking items are in the cart
    await CartChart.ConfirmNumProdCart('5')
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_BikeLight)
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_FleeceJacket)
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_BoltTshirt)
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_Backpack)
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_Onessie)
    //Logout
    await MainPage.LogOut 
});