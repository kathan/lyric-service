const dispatch = require('./dispatch')

describe("dispatch tests", () => {
    test('dispatch status code is 405', async () => {
        const request = {
            path: "",
            httpMethod: 'POST',
            pathParameters:{
                proxy: "echo"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
    })

    test('dispatch status code is 404', async () => {
        const request = {
            path: "",
            httpMethod: 'GET',
            pathParameters:{
                proxy: "fakeHandler"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(404);
    })

    test('dispatch status code is 500', async () => {
        const request = {
            path: "",
            httpMethod: 'PATCH',
            pathParameters:{
                proxy: "echo"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(500);
    })

    test('method not allowed on handler', async () => {
        const request = {
            path: "",
            httpMethod: 'CRAMP',
            pathParameters:{
                proxy: "echo"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
    })

    test('handler is not an object', async () => {
        const request = {
            path: "",
            httpMethod: 'GET',
            pathParameters:{
                proxy: "noObject"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(404);
    })

    test('method name is not a string', async () => {
        const request = {
            path: "",
            httpMethod: {},
            pathParameters:{
                proxy: "echo"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
    })
})