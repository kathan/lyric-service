jest.mock('../lib/dbConnection.js')
const db = require('../lib/dbConnection.js')

const proxy = "song"
const urlPath = `/api/${proxy}`

const SongModel = {
    "findByPk": jest.fn(),
    "findAll": jest.fn(),
    "create": jest.fn(),
}

const SongHandler = require('./song.js')
const songHandler = new SongHandler(SongModel)
songHandler.before({}, {}, {model: SongModel})

describe("song tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    getInitialRequest = (method) => {
        return {
            httpMethod: method,
            pathParameters:{
                proxy: proxy
            }
        }
    }
    getInitialResponse = () => ({statusCode: 0, body :{}})

    it('Should call close on songHandler.model when `after` is called on songHandler', async () =>{
        jest.spyOn(db, 'close')

        songHandler.after()

        expect(db.close).toHaveBeenCalledTimes(1)
    })

    it('should GET 1 song with status code of 200', async () => {
        const request = getInitialRequest('GET')
        request.path = `${urlPath}/1`
        const response = getInitialResponse()

        const foundSong = {
            name: "The Long And Winding Road"
        }

        jest.spyOn(SongModel, 'findByPk').mockResolvedValueOnce(foundSong)
        jest.spyOn(SongModel, 'findAll')

        await songHandler.get(request, response)
        expect(response.statusCode).toBe(200)
        expect(SongModel.findByPk).toHaveBeenCalledTimes(1)
        expect(SongModel.findAll).toHaveBeenCalledTimes(0)
        expect(response.body.song).toStrictEqual(foundSong)
    })

    it('should GET all songs with status code of 200', async () => {
        const request = getInitialRequest('GET')
        const response = getInitialResponse()

        const foundSongs = [
            {name: "The Long And Winding Road"},
            {name: "Get Back"}
        ]
        
        jest.spyOn(SongModel, 'findAll').mockResolvedValueOnce(foundSongs)
        jest.spyOn(SongModel, 'findByPk')

        await songHandler.get(request, response)
        expect(response.statusCode).toBe(200)
        expect(SongModel.findByPk).toHaveBeenCalledTimes(0)
        expect(SongModel.findAll).toHaveBeenCalledTimes(1)
        expect(response.body.songs).toStrictEqual(foundSongs)
    })

    it('should return 400 when POST to song', async () => {
        const request = getInitialRequest('POST')
        const response = getInitialResponse()
        
        await songHandler.post(request, response)
        expect(response.statusCode).toBe(400);
    })

    it('should return status code 201 when POST to song', async () => {
        const request = getInitialRequest('POST')
        const body = `{"name": "The Long And Winding Road"}`

        const song = {
            name: "The Long And Winding Road",
            save: jest.fn()
        }

        request.body = body
        
        const response = getInitialResponse()

        jest.spyOn(SongModel, 'create').mockResolvedValueOnce(song)
        jest.spyOn(song, 'save')

        await songHandler.post(request, response)
        await songHandler.after()

        expect(song.save).toBeCalled()
        expect(SongModel.create).toBeCalledWith(JSON.parse(body));
        expect(response.statusCode).toBe(201);
        expect(song.name).toBe(response.body.name)
    })

    it('Should return 500 when POST to song', async () => {
        const request = getInitialRequest('POST')
        const songName = "The Long And Winding Road"
        const body = `{"name": "${songName}"}`
        request.body = body

        const song = {
            name: songName,
            save: jest.fn(),
        }
        
        const response = getInitialResponse()

        jest.spyOn(SongModel, 'create').mockRejectedValueOnce(new Error("Test Error"))
        jest.spyOn(song, 'save')
        jest.spyOn(SongModel, 'findByPk')

        await songHandler.post(request, response, SongModel)
        await songHandler.after(null, null, {model: SongModel})
        
        expect(song.save).toBeCalledTimes(0)
        expect(SongModel.findByPk).toBeCalledTimes(0)
        expect(SongModel.create).toBeCalledWith(JSON.parse(body));
        expect(response.statusCode).toBe(500);
    })

    it('Returns status code 405 when PUT to song', async () => {
        const request = getInitialRequest('PUT')
        const response = getInitialResponse()

        await songHandler.put(request, response)
        expect(response.statusCode).toBe(405);
    })

    it('Should return 405 status code when PATCH song', async () => {
        const request = getInitialRequest('PATCH')
        const response = getInitialResponse()

        await songHandler.patch(request, response)
        expect(response.statusCode).toBe(405);
    })
})