const { expect } = require('chai');
const fetch = require('node-fetch');
const url = "http://localhost:3000/"

describe("Node POC 2 Test case", () => {
    it("should get all users", () => {
        fetch(url + "users")
        .then(res => res.json())
        .then(json => {
            // console.log('json',json);
            expect(json.status).equals("success");
            expect(json).to.have.property("result");
        })
        .catch(err => {
            console.log(err);
        })
    })
})