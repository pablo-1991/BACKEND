import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

const user = { email: "pablodpalumbo@gmail.com" };

const mockedProduct = { user };

describe("Probando rutas de carts", function () {
    it("Probar método GET /carts", async function () {
        const response = await request.get("/carts");
        expect(response._body.message).to.not.have.lengthOf(0);
    });

    it("Probar método POST /carts/:cid/product/:pid", async function () {
        const cid = "6467914ca0ad7f3229f019d8";
        const pid = "6466c5a4339bf20a25fc0dbd";

        const response = await request
            .post(`/carts/${cid}/product/${pid}`)
            .send(mockedProduct);

        expect(
            response._body.message.products.find((el) => el.id === pid).id
        ).to.equal(pid);
    });

    it("Probar método DELETE /carts/:cid", async function () {
        const cid = '6467914ca0ad7f3229f019d8'

        const response = await request.delete(`/carts/${cid}`).send({ email: 'pablodpalumbo@gmail.com' })

        expect(response.status).to.equal(200)
    })


});