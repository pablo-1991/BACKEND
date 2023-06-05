import './database.js';
import { expect } from 'chai';
import ProductManager from '../src/persistencia/DAO/mongoManagers/ProductManager.js';
import { productsModel } from '../src/persistencia/mongodb/models/products.model.js';

describe('TESTING PRODUCTMANAGER', () => {
    before(function () {
        this.ProductManager = new ProductManager()
    })

    it('GET ALL PRODUCTS', async function () {
        const result = await this.ProductManager.getProducts()
        console.log(result)
        expect(result.products).to.be.a('array')
    })
})