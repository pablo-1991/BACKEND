import supertest from "supertest";
import { expect } from "chai";
import { faker } from '@faker-js/faker'

const request = supertest("http://localhost:8080");

const newProduct = {
    title: "Playstation 5",
    description: "consola play 5",
    category: "consola",
    stock: 88,
    price: 55000,
    thumbnails: [],
    status: true,
    code: faker.string.alphanumeric(5),
    owner: "admin",
};

const owner = { email: "pablodpalumbo@gmail.com" };

const mockedAddProduct = { newProduct, owner };

describe("Probando rutas de products", function () {

    it("Probar método GET /products", async function () {
        const response = await request.get("/products");
        expect(response._body.response.products).to.not.have.lengthOf(0);
    });

    it("Probar método POST /products", async function () {
        const response = await request.post("/products").send(mockedAddProduct);
        expect(response._body.response.message).to.equal(
            "Producto creado con éxito"
        );
    });

    it("Probar método DELETE /products/:pid", async function () {
        const pid = '6466c5a4339bf20a25fc0dbd'

        const response = await request.delete(`/products/${pid}`).send({ email: 'pablodpalumbo@gmail.com' })

        expect(response.status).to.equal(200)
    })
});