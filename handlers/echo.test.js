jest.mock('../lib/dbConnection');
const Dispatcher = require('../lib/dispatcher');
const dispatcher = new Dispatcher();

describe("dispatch tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 status code', async () => {
        const httpMethod = 'GET';
        const handlerName = "echo";
        const request = {
            httpMethod: httpMethod,
            pathParameters:{
                proxy: handlerName
            }
        };
        const response = {
            statusCode: 0
        };

        await dispatcher.dispatch(handlerName, httpMethod, request, response);
        expect(response.statusCode).toBe(200);
        expect(response.body.input).toStrictEqual(request);
    });
});