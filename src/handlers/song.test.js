const models = require('../lib/models.js')
const SequelizeMock = require('sequelize-mock');
const sequelize = new SequelizeMock();

const proxy = "song"
const urlPath = `/api/${proxy}`

models.forEach(model => {
    let newModel = sequelize.define(model.name, model.attributes, model.options)
    if(typeof sequelize.models !== 'object'){
        sequelize.models = {}
    }
    sequelize.models[model.name] = newModel
})
const Song = sequelize.models.Song
const songConstructor = require('./song.js')
const songHandler = new songConstructor()
songHandler.model = Song

describe("song tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    getInitialResponse = () => ({statusCode: 0, body :{}})

    test('song GET 1 song status code is 200', async () => {

        const request = {
            path: `${urlPath}/1`,
            httpMethod: 'GET',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = getInitialResponse()

        const foundSong = await Song.create(
            {name: "The Long And Winding Road"}
        )
        jest.spyOn(Song, 'findAll')
        jest.spyOn(Song, 'findOne').mockResolvedValueOnce(foundSong)

        await songHandler.get(request, response)
        expect(response.statusCode).toBe(200)
        expect(Song.findOne).toHaveBeenCalledTimes(1)
        expect(Song.findAll).toHaveBeenCalledTimes(0)
        expect(response.body.song).toStrictEqual(foundSong)
    })

    test('song GET all songs status code is 200', async () => {

        const request = {
            //path: urlPath,
            httpMethod: 'GET',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = getInitialResponse()

        const foundSongs = await Song.bulkCreate(
            [
                {name: "The Long And Winding Road"},
                {name: "Get Back"}
            ]
        )
        jest.spyOn(Song, 'findAll').mockResolvedValueOnce(foundSongs)
        jest.spyOn(Song, 'findOne')

        await songHandler.get(request, response)
        expect(response.statusCode).toBe(200)
        expect(Song.findOne).toHaveBeenCalledTimes(0)
        expect(Song.findAll).toHaveBeenCalledTimes(1)
        expect(response.body.songs).toStrictEqual(foundSongs)
    })

    test('song POST status code is 400', async () => {
        const request = {
            httpMethod: 'POST',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = getInitialResponse()
        
        await songHandler.post(request, response)
        expect(response.statusCode).toBe(400);
    })

    test('song POST status code is 201', async () => {
        
        const body = {
            name: "The Long And Winding Road"
        }

        const song = await Song.create(body)

        const request = {
            httpMethod: 'POST',
            pathParameters:{
                proxy: proxy
            },
            body: body
        }
        const response = getInitialResponse()

        jest.spyOn(Song, 'create').mockResolvedValueOnce(song)
        jest.spyOn(song, 'save')
        jest.spyOn(Song, 'findOne').mockResolvedValueOnce(song)

        await songHandler.post(request, response, Song)

        expect(song.save).toBeCalled()
        expect(Song.findOne).toBeCalled()
        expect(Song.create).toBeCalledWith(body);
        expect(response.statusCode).toBe(201);
        expect(song.name).toBe(response.body.name)
    })

    test('song POST status code is 500', async () => {
        
        const body = {
            name: "The Long And Winding Road"
        }

        const song = await Song.create(body)

        const request = {
            httpMethod: 'POST',
            pathParameters:{
                proxy: proxy
            },
            body: body
        }
        const response = getInitialResponse()

        jest.spyOn(Song, 'create').mockRejectedValueOnce(new Error("Test Error"))
        jest.spyOn(song, 'save')
        jest.spyOn(Song, 'findOne')

        await songHandler.post(request, response, Song)

        expect(song.save).toBeCalledTimes(0)
        expect(Song.findOne).toBeCalledTimes(0)
        expect(Song.create).toBeCalledWith(body);
        expect(response.statusCode).toBe(500);
    })

    test('song PUT status code is 405', async () => {
        const request = {
            httpMethod: 'PUT',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = getInitialResponse()

        await songHandler.put(request, response)
        expect(response.statusCode).toBe(405);
    })

    test('song PATCH status code is 405', async () => {
        const request = {
            httpMethod: 'PATCH',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = getInitialResponse()

        await songHandler.patch(request, response)
        expect(response.statusCode).toBe(405);
    })
})