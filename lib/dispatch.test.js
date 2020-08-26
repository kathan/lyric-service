const dispatch = require('./dispatch')

describe("dispatch tests", () => {
    test('dispatch status code is 405', async () => {
        const request = {
            httpMethod: 'POST',
            pathParameters:{
                proxy:"echo"
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
            httpMethod: 'GET',
            pathParameters:{
                proxy: "noObject"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
    })

    test('method name is not an string', async () => {
        const request = {
            httpMethod: 0,
            pathParameters:{
                proxy: "noObject"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
    })
})