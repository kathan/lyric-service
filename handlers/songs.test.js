const dispatch = require('../lib/dispatch')

describe("songs tests", () => {
    const proxy = "songs"
    test('songs get status code is 200', async () => {
        const request = {
            httpMethod: 'GET',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).input).toStrictEqual(request)
    })

    test('songs post status code is 405', async () => {
        const request = {
            httpMethod: 'POST',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
        // expect(JSON.parse(response.body).input).toStrictEqual(request)
    })

    test('songs put status code is 405', async () => {
        const request = {
            httpMethod: 'PUT',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
        // expect(JSON.parse(response.body).input).toStrictEqual(request)
    })
    test('songs patch status code is 405', async () => {
        const request = {
            httpMethod: 'PATCH',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatch(request, response)
        expect(response.statusCode).toBe(405);
        // expect(JSON.parse(response.body).input).toStrictEqual(request)
    })
})