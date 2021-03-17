import {Selector} from 'testcafe'
import { CREDENTIALS } from '../Others/Variables';
import { AVAILABLEPROD } from '../Others/Variables';
import { AVAILABLEPRODDESC } from '../Others/Variables';

import LogingPage from '../PageObjects/LogingPage'
import MainPage from '../PageObjects/MainPage'
import Checkout from '../PageObjects/CheckOut'
import CartChart from '../PageObjects/CartChart'

fixture `Page`
    .page `https://www.saucedemo.com/`;

test('7 Continue with missing information / validate error message is displayed in the user information page', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    //Acces to shop cart
    await MainPage.CartShopSel()
    await t.expect(Selector('#contents_wrapper').innerText).contains('Your Cart')
    //Go to the checkoutpage
    await t.click('.btn_action.checkout_button')
    //Checkout with missing information
    await Checkout.Checkout(CREDENTIALS.WrongUser.firstname, CREDENTIALS.WrongUser.lastname, CREDENTIALS.WrongUser.zip)
    //Check missing info error is set
    await t.expect(Selector('.checkout_info_wrapper').innerText).contains('Error')
    //Logout
    await MainPage.LogOut    
});

test('8 Fill user information / Validate the user navigates to the overview page once his data has been filled', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    //Acces to shop cart
    await MainPage.CartShopSel()
    await t.expect(Selector('#contents_wrapper').innerText).contains('Your Cart')
    //Go to the checkoutpage
    await t.click('.btn_action.checkout_button')
    //Checkout with valid information
    await Checkout.Checkout(CREDENTIALS.ValidUser.firstname, CREDENTIALS.ValidUser.lastname, CREDENTIALS.ValidUser.zip)
    //Check overview page is reached
    await t.expect(Selector('.subheader').innerText).contains('Checkout: Overview')
    //Logout
    await MainPage.LogOut    
});

test('9 order items / Validate items in the overview page match with the added items', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    //Select items
    await MainPage.addproduct(AVAILABLEPROD.Sauce_BikeLight)
    await MainPage.addproduct(AVAILABLEPROD.Sauce_FleeceJacket)
    await MainPage.addproduct(AVAILABLEPROD.Sauce_BoltTshirt)
    //Access to shop cart
    await MainPage.CartShopSel()
    await t.expect(Selector('#contents_wrapper').innerText).contains('Your Cart')
    //Cheking items are in the cart
    await CartChart.ConfirmNumProdCart('3')
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_BikeLight)
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_FleeceJacket)
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_BoltTshirt)
    //Go to the checkoutpage
    await t.click('.btn_action.checkout_button')
    //Checkout with valid information
    await Checkout.Checkout(CREDENTIALS.ValidUser.firstname, CREDENTIALS.ValidUser.lastname, CREDENTIALS.ValidUser.zip)
    //Check overview page is reached
    await t.expect(Selector('.subheader').innerText).contains('Checkout: Overview')
    // Check that requested items are in the overview
    await Checkout.ConfirmProductOver(AVAILABLEPRODDESC.Sauce_BikeLight)
    await Checkout.ConfirmProductOver(AVAILABLEPRODDESC.Sauce_FleeceJacket)
    await Checkout.ConfirmProductOver(AVAILABLEPRODDESC.Sauce_BoltTshirt)
    //Logout
    await MainPage.LogOut
});

test('10 Complete a Purchase / Validate the user navigates to the confirmation page', async t => {
    //Login
    await LogingPage.SignIn(CREDENTIALS.ValidUser.username,CREDENTIALS.ValidUser.password)
    //Select items
    await MainPage.addproduct(AVAILABLEPROD.Sauce_BikeLight)
    await MainPage.addproduct(AVAILABLEPROD.Sauce_FleeceJacket)
    await MainPage.addproduct(AVAILABLEPROD.Sauce_BoltTshirt)
    //Access to shop cart
    await MainPage.CartShopSel()
    await t.expect(Selector('#contents_wrapper').innerText).contains('Your Cart')
    //Cheking items are in the cart
    await CartChart.ConfirmNumProdCart('3')
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_BikeLight)
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_FleeceJacket)
    await CartChart.ConfirmProductCart(AVAILABLEPRODDESC.Sauce_BoltTshirt)
    //Go to the checkoutpage
    await t.click('.btn_action.checkout_button')
    //Checkout with valid information
    await Checkout.Checkout(CREDENTIALS.ValidUser.firstname, CREDENTIALS.ValidUser.lastname, CREDENTIALS.ValidUser.zip)
    //Check overview page is reached
    await t.expect(Selector('.subheader').innerText).contains('Checkout: Overview')
    // Check that requested items are in the overview
    await Checkout.ConfirmProductOver(AVAILABLEPRODDESC.Sauce_BikeLight)
    await Checkout.ConfirmProductOver(AVAILABLEPRODDESC.Sauce_FleeceJacket)
    await Checkout.ConfirmProductOver(AVAILABLEPRODDESC.Sauce_BoltTshirt)
    // Finish the purchase
    await Checkout.FinishPurchase()
    // Confirm confirmation page
    await t.expect(Selector('#checkout_complete_container').innerText).contains('THANK YOU FOR YOUR ORDER')
    //Logout
    await MainPage.LogOut
});
