const Dispatcher = require('./dispatcher');
let dispatcher;

describe("dispatcher tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.mock('../lib/dbConnection.js');
        jest.mock('../handlers/init.js');

        dispatcher = new Dispatcher();
    });

    const getInitialResponse = () => ({statusCode: 0, body :{}});

    const getRequest = (methodName, handlerName) => {
        return {
            path: "",
            httpMethod: methodName,
            pathParameters:{
                proxy: handlerName
            }
        };
    };

    const mockConstructor = (name) => {
        jest.mock(`../handlers/${name}.js`);
        return require(`../handlers/${name}.js`);
    };

    it('should return 405 on echo POST ', async () => {
        const methodName = 'POST';
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();

        await dispatcher.dispatch(request, response);
        expect(response.statusCode).toBe(405);
    });

    it('should return 404 on fakeHandler GET', async () => {
        const methodName = 'GET';
        const handlerName = "fakeHandler";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();

        await dispatcher.dispatch(request, response);
        expect(response.statusCode).toBe(404);
    });

    it('should return 405 on echo CRAMP handler (not a real method)', async () => {
        const methodName = 'CRAMP';
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();

        await dispatcher.dispatch(request, response);
        expect(response.statusCode).toBe(405);
    });

    it('should return 404 on GET noObject handler', async () => {
        const methodName = 'GET';
        const handlerName = "noObject";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();

        await dispatcher.dispatch(request, response);
        expect(response.statusCode).toBe(404);
    });

    it('should go to default handler on GET with undefined pathParameters.proxy object ', async () => {
        const methodName = 'GET';
        const handlerName = null;
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();

        await dispatcher.dispatch(request, response);
        expect(response.statusCode).toBe(200);
    });

    it('should return 405 on echo with object as method', async () => {
        const methodName = {};
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();

        await dispatcher.dispatch(request, response);
        expect(response.statusCode).toBe(405);
    });

    it('Should throw error when echo constructor is called', async () => {
        const EchoConstructor = mockConstructor('echo');
        const methodName = 'GET';
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();

        EchoConstructor.mockImplementation(() => {
             throw new Error("EchoConstructor Error");
        });
        await dispatcher.dispatch(request, response);
        expect(response.statusCode).toBe(404);

    });

    it('Should return 405 when getMethod is called', async () => {
        const EchoConstructor = mockConstructor('echo');
        const methodName = 'GET';
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const echo = {};
        const response = getInitialResponse();
        EchoConstructor.mockImplementation(() => echo);
        
        await dispatcher.dispatch(request, response);

        expect(EchoConstructor).toBeCalledTimes(1);
        expect(EchoConstructor.mock.instances.length).toBe(1);
        expect(response.statusCode).toBe(405);
    });

    it('Should throw error and return 500 when echo.before is called', async () => {
        const EchoConstructor = mockConstructor('echo');
        const methodName = 'GET';
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();
        const echo = {
            before: jest.fn(() => {
                throw new Error('echo.before error');
            }),
            get: jest.fn()
        };
        jest.spyOn(echo, 'before');
        EchoConstructor.mockImplementation(() => echo);
        
        await dispatcher.dispatch(request, response);

        expect(EchoConstructor).toBeCalledTimes(1);
        expect(EchoConstructor.mock.instances.length).toBe(1);
        expect(echo.before).toBeCalledWith(request, response, {});
        expect(response.statusCode).toBe(500);
    });

    it('Should throw error and return 500 when method.call is called', async () => {
        const EchoConstructor = mockConstructor('echo');
        const method = jest.fn(() => {
            throw new Error('echo.get error');
        });
        const echo = {
            before: jest.fn(),
            get: method
        };
        const methodName = 'GET';
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();
        jest.spyOn(echo, 'before');
        jest.spyOn(method, 'call');
        EchoConstructor.mockImplementation(() => echo);
        
        await dispatcher.dispatch(request, response);

        expect(EchoConstructor).toBeCalledTimes(1);
        expect(EchoConstructor.mock.instances.length).toBe(1);
        expect(echo.before).toBeCalledWith(request, response, {});
        expect(method.call).toBeCalledWith(echo, request, response);

        expect(response.statusCode).toBe(500);
    });

    it('Should throw error and return 500 when echo.after is called', async () => {
        const EchoConstructor = mockConstructor('echo');
        const method = jest.fn();
        const echo = {
            before: jest.fn(),
            get: method,
            after: jest.fn(() => {
                throw new Error('echo.after error');
            })
        };
        const methodName = 'GET';
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();
        jest.spyOn(echo, 'before');
        jest.spyOn(echo, 'after');
        jest.spyOn(method, 'call');
        EchoConstructor.mockImplementation(() => echo);
        
        await dispatcher.dispatch(request, response);

        expect(EchoConstructor).toBeCalledTimes(1);
        expect(EchoConstructor.mock.instances.length).toBe(1);
        expect(echo.before).toBeCalledWith(request, response, {});
        expect(method.call).toBeCalledWith(echo, request, response);
        expect(echo.after).toBeCalledWith(request, response, {});

        expect(response.statusCode).toBe(500);
    });

    it('Should throw error and skip when runInit is called', async () => {
        const EchoConstructor = mockConstructor('echo');
        const InitConstructor = require('../handlers/init.js');
        const method = jest.fn((request, response) => {
            response.statusCode = 200;
        });
        const echo = {
            get: method,
        };
        const methodName = 'GET';
        const handlerName = "echo";
        const request = getRequest(methodName, handlerName);
        const response = getInitialResponse();
        EchoConstructor.mockImplementation(() => echo);
        InitConstructor.mockImplementation(() => {
            throw new Error("InitConstructor Error");
        });
        jest.spyOn(method, 'call');
        await dispatcher.dispatch(request, response);

        expect(EchoConstructor).toBeCalledTimes(1);
        expect(InitConstructor).toBeCalledTimes(1);
        expect(method.call).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });
});