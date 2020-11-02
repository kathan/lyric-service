const models = require('../lib/models.js')
const SequelizeMock = require('sequelize-mock');
const sequelize = new SequelizeMock();

const proxy = "song"

models.forEach(model => {
    let newModel = sequelize.define(model.name, model.attributes, model.options)
    if(typeof sequelize.models !== 'object'){
        sequelize.models = {}
    }
    sequelize.models[model.name] = newModel
})
const Song = sequelize.models.Song
const songHandler = require('./song.js')

describe("song tests", () => {

    test('song GET status code is 200', async () => {
        const request = {
            httpMethod: 'GET',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = {
            statusCode: 0
        }

        await songHandler.get(request, response)
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).input).toStrictEqual(request)
    })

    test('song POST status code is 400', async () => {
        const request = {
            httpMethod: 'POST',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = {
            statusCode: 0
        }
        
        await songHandler.post(request, response)
        expect(response.statusCode).toBe(400);
    })

    test('song POST status code is 201', async () => {
        const song = await Song.create({
            name: "The Long And Winding Road"
        })
        console.log('song', song)
        const foundSong = await Song.create({
            name: "The Long And Winding Road"
        })
        
        const body = {
            name: "The Long And Winding Road"
        }

        const request = {
            httpMethod: 'POST',
            pathParameters:{
                proxy: proxy
            },
            body: body
        }
        const response = {
            statusCode: 0
        }
        jest.spyOn(Song, 'create').mockResolvedValue(song)
        jest.spyOn(song, 'save')
        jest.spyOn(Song, 'findOne').mockResolvedValue(foundSong)

        await songHandler.post(request, response, Song)

        expect(song.save).toBeCalled()
        expect(Song.findOne).toBeCalled()
        expect(Song.create).toBeCalledWith(body);
        expect(response.statusCode).toBe(201);
        expect(song.name).toBe(response.body.name)
    })

    test('song PUT status code is 405', async () => {
        const request = {
            httpMethod: 'PUT',
            pathParameters:{
                proxy: proxy
            }
        }
        const response = {
            statusCode: 0
        }

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
        const response = {
            statusCode: 0
        }

        await songHandler.patch(request, response)
        expect(response.statusCode).toBe(405);
    })
})