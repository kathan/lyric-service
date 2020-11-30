const HandlerInterface = require("./HandlerInterface");

class TestClass extends HandlerInterface{}
let testClass;

describe("HanlderInterface tests", () => {
    beforeEach(()=>{
        testClass = new TestClass();
    });

    it('should return status code 405 from GET', async () => {
        const response = {};
        await testClass.get({}, response);
        expect(response.statusCode).toBe(405);
    });

    it('should return status code 405 from POST', async () => {
        const response = {};
        await testClass.post({}, response);
        expect(response.statusCode).toBe(405);
    });

    it('should return status code 405 from PUT', async () => {
        const response = {};
        await testClass.put({}, response);
        expect(response.statusCode).toBe(405);
    });

    it('should return status code 405 from DELETE', async () => {
        const response = {};
        await testClass.delete({}, response);
        expect(response.statusCode).toBe(405);
    });

    it('should return status code 405 from PATCH', async () => {
        const response = {};
        await testClass.patch({}, response);
        expect(response.statusCode).toBe(405);
    });

    it('should return status code 405 from PATCH', async () => {
        const response = {};
        await testClass.patch({}, response);
        expect(response.statusCode).toBe(405);
    });
});