const dispatch = require('./dispatch')

describe("dispatch tests", () => {

    getInitialResponse = () => ({statusCode: 0, body :{}})

    test('POST on echo handler should return 405', async () => {
        const request = {
            path: "",
            httpMethod: 'POST',
            pathParameters:{
                proxy: "echo"
            }
        }
        const response = getInitialResponse()

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
    })

    test('GET on fakeHandler should return 404', async () => {
        const request = {
            path: "",
            httpMethod: 'GET',
            pathParameters:{
                proxy: "fakeHandler"
            }
        }
        const response = getInitialResponse()

        await dispatch(request, response)
        expect(response.statusCode).toBe(404);
    })

    test('CRAMP method on echo handler should return 405', async () => {
        const request = {
            path: "",
            httpMethod: 'CRAMP',
            pathParameters:{
                proxy: "echo"
            }
        }
        const response = getInitialResponse()

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
    })

    test('GET on noObject handler should return 404', async () => {
        const request = {
            path: "",
            httpMethod: 'GET',
            pathParameters:{
                proxy: "noObject"
            }
        }
        const response = getInitialResponse()

        await dispatch(request, response)
        expect(response.statusCode).toBe(404);
    })

    test('GET on undefined pathParameters.proxy object should go to default handler', async () => {
        const request = {
            httpMethod: 'GET',
        }
        const response = getInitialResponse()

        await dispatch(request, response)
        expect(response.statusCode).toBe(200);
    })

    test('Illegal method on echo should return 405', async () => {
        const request = {
            path: "",
            httpMethod: {},
            pathParameters:{
                proxy: "echo"
            }
        }
        const response = getInitialResponse()

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
    })
})