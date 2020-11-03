const dispatch = require('../lib/dispatch')

test('dispatch status code is 200', async () => {
    const request = {
        httpMethod: 'GET',
        pathParameters:{
            proxy: "echo"
        }
    }
    const response = {
        statusCode: 0
    }

    await dispatch(request, response)
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).input).toStrictEqual(request)
})