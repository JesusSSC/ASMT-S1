import {Selector, t} from 'testcafe'

class MainPage{
    constructor (){
        this.mainpageInventory = Selector('#inventory_filter_container')
        this.inventoryListButton = Selector('#inventory_sidebar_link');
        this.addButton = Selector('.btn_primary.btn_inventory');
    }
    // To log out
    async LogOut() {
        await t.click('#react-burger-menu-btn')
        await t.click('#logout_sidebar_link')
        await t.expect(Selector('#login-button').exists).ok()
    }
    // To go to the cart shop
    async CartShopSel() {
        await t.click('#shopping_cart_container')
        await t.expect(Selector('#contents_wrapper').innerText).contains('Your Cart')
    }
    // To go to the inventory page
    async inventorylistMenu(){
        await t.click('#react-burger-menu-btn')
        await t.click('#inventory_sidebar_link')
    }
    // Add a specific product by its ID number to the cart
    async addproduct(productid){
        await this.inventorylistMenu()
        await t.navigateTo(`https://www.saucedemo.com/inventory-item.html?id=${productid}`)
        await t.click(this.addButton);
        


    }
}

export default new MainPage()