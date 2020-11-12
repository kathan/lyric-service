jest.mock('../lib/dbConnection.js')
const Dispatcher = require('../lib/dispatcher')
const dispatcher = new Dispatcher()

describe("dispatch tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should return 200 status code', async () => {
        const request = {
            httpMethod: 'GET',
            pathParameters:{
                proxy: "echo"
            }
        }
        const response = {
            statusCode: 0
        }

        await dispatcher.dispatch(request, response)
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).input).toStrictEqual(request)
    })
})