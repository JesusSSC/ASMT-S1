import {Selector, t} from 'testcafe'

class CartChart{
    constructor (){
        this.mainpageInventory = Selector('#inventory_filter_container')
        this.inventoryListButton = Selector('#inventory_sidebar_link');
        this.addButton = Selector('.btn_primary.btn_inventory');
    }
    // To confirm the number of products added to the cart
    async ConfirmNumProdCart(numproduct) {
        await t.click('#shopping_cart_container')   
        await t.expect(Selector('.fa-layers-counter.shopping_cart_badge').innerText).eql(numproduct)
    }
    // To Cofirm if a specific product is in the cart
    async ConfirmProductCart(productDesc) {
        await t.click('#shopping_cart_container')   
        await t.expect(Selector('#cart_contents_container').innerText).contains(productDesc)
    }


}

export default new CartChart()