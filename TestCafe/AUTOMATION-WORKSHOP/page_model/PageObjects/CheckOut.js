import {Selector, t} from 'testcafe'

class Checkout{
    constructor(){
        this.firstnameField = Selector('#first-name')
        this.lastnameField = Selector('#last-name')
        this.zipField = Selector('#postal-code')
        this.errorMessage = Selector('#checkout_info_container')
        this.continueButton = Selector('.btn_primary.cart_button')
    }
    // To fill up the checkout page
    async Checkout(firstname, lastname, zip) {
        if (firstname === "") {
            await t.click(this.continueButton)
        }
        else if (lastname === "") {
            await t.click(this.continueButton)
        }
        else if
        (zip === "") {
            await t.click(this.continueButton)
        }        
        else{
        await t.typeText(this.firstnameField, firstname)
        await t.typeText(this.lastnameField, lastname)
        await t.typeText(this.zipField, zip)
        await t.click(this.continueButton)
        }
    }
    async ConfirmProductOver(productDesc) {
        await t.expect(Selector('.cart_list').innerText).contains(productDesc)
    }
    async FinishPurchase(productDesc){
        await t.click('.btn_action.cart_button')
    }


}
export default new Checkout()