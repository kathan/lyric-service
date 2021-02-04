jest.mock('../lib/dbConnection');
const db = require('../lib/dbConnection');
const SetlistHandler = require('./setlist');

const proxy = "setlist";
const urlPath = `/api/${proxy}`;

const SetlistModel = {
    "findByPk": jest.fn(),
    "findOne": jest.fn(),
    "findAll": jest.fn(),
    "create": jest.fn(),
};
db.models.Setlist = SetlistModel;

const setlistHandler = new SetlistHandler(SetlistModel);
setlistHandler.before({}, {}, {model: SetlistModel});

describe("setlist tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const getInitialRequest = (method) => {
        return {
            httpMethod: method,
            pathParameters:{
                proxy: proxy
            }
        };
    };
    const getInitialResponse = () => ({statusCode: 0, body :{}});

    it('should GET 1 setlist with status code of 200', async () => {
        const request = getInitialRequest('GET');
        request.path = `${urlPath}/1`;
        const response = getInitialResponse();

        const foundSetlist = {
            name: "Practice"
        };

        jest.spyOn(SetlistModel, 'findOne').mockResolvedValueOnce(foundSetlist);
        jest.spyOn(SetlistModel, 'findAll');

        await setlistHandler.get(request, response);
        expect(response.statusCode).toBe(200);
        expect(SetlistModel.findOne).toHaveBeenCalledTimes(1);
        expect(SetlistModel.findAll).toHaveBeenCalledTimes(0);
        expect(response.body.setlist).toStrictEqual(foundSetlist);
    });

    it('should GET all setlists with status code of 200', async () => {
        const request = getInitialRequest('GET');
        const response = getInitialResponse();

        const foundSetlists = [
            {name: "Practice"},
            {name: "Show 1"}
        ];
        
        jest.spyOn(SetlistModel, 'findAll').mockResolvedValueOnce(foundSetlists);
        jest.spyOn(SetlistModel, 'findByPk');

        await setlistHandler.get(request, response);
        expect(response.statusCode).toBe(200);
        expect(SetlistModel.findByPk).toHaveBeenCalledTimes(0);
        expect(SetlistModel.findAll).toHaveBeenCalledTimes(1);
        expect(response.body.setlists).toStrictEqual(foundSetlists);
    });

    it('should return 400 when POST to setlist', async () => {
        const request = getInitialRequest('POST');
        const response = getInitialResponse();
        
        await setlistHandler.post(request, response);
        expect(response.statusCode).toBe(400);
    });

    it('should return status code 201 when POST to setlist', async () => {
        const request = getInitialRequest('POST');
        const body = `{"name": "Practice"}`;

        const setlist = {
            name: "Practice",
            save: jest.fn()
        };

        request.body = body;
        
        const response = getInitialResponse();

        jest.spyOn(SetlistModel, 'create').mockResolvedValueOnce(setlist);
        jest.spyOn(setlist, 'save');

        await setlistHandler.post(request, response);
        await setlistHandler.after();

        expect(setlist.save).toBeCalled();
        expect(SetlistModel.create).toBeCalledWith(JSON.parse(body));
        expect(response.statusCode).toBe(201);
        expect(setlist.name).toBe(response.body.name);
    });

    it('Should return 500 when POST to setlist', async () => {
        const request = getInitialRequest('POST');
        const setlistName = "Practice";
        const body = `{"name": "${setlistName}"}`;
        request.body = body;

        const setlist = {
            name: setlistName,
            save: jest.fn(),
        };
        
        const response = getInitialResponse();

        jest.spyOn(SetlistModel, 'create').mockRejectedValueOnce(new Error("Test Error"));
        jest.spyOn(setlist, 'save');
        jest.spyOn(SetlistModel, 'findByPk');

        await setlistHandler.post(request, response, SetlistModel);
        await setlistHandler.after(null, null, {model: SetlistModel});
        
        expect(setlist.save).toBeCalledTimes(0);
        expect(SetlistModel.findByPk).toBeCalledTimes(0);
        expect(SetlistModel.create).toBeCalledWith(JSON.parse(body));
        expect(response.statusCode).toBe(500);
    });

    it('Returns status code 200 when PUT to setlist', async () => {
        const request = getInitialRequest('PUT');
        const setlistName = "Rehearsal";
        const body = `{"name": "${setlistName}"}`;
        const setlist = {
            name: setlistName,
            update: jest.fn()
        };
        request.body = body;
        request.path = `${urlPath}/1`;
        
        const response = getInitialResponse();
        jest.spyOn(setlist, 'update');
        jest.spyOn(SetlistModel, 'findOne').mockResolvedValueOnce(setlist);

        await setlistHandler.put(request, response);
        expect(setlist.update).toBeCalledWith(JSON.parse(body));
        expect(SetlistModel.findOne).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('Should return 405 status code when PATCH setlist', async () => {
        const request = getInitialRequest('PATCH');
        const response = getInitialResponse();

        await setlistHandler.patch(request, response);
        expect(response.statusCode).toBe(405);
    });

    it('Should throw error on db.close', async () => {
        const request = getInitialRequest('GET');
        request.path = `${urlPath}/1`;
        const response = getInitialResponse();

        const foundSetlist = {
            name: "Practice"
        };

        jest.spyOn(db, 'close').mockRejectedValueOnce(new Error("Test Error"));
        jest.spyOn(SetlistModel, 'findOne').mockResolvedValueOnce(foundSetlist);
        jest.spyOn(SetlistModel, 'findAll');
        jest.spyOn(global.console, 'log');

        await setlistHandler.get(request, response);
        expect(response.statusCode).toBe(200);
        expect(SetlistModel.findOne).toHaveBeenCalledTimes(1);
        expect(SetlistModel.findAll).toHaveBeenCalledTimes(0);
        expect(response.body.setlist).toStrictEqual(foundSetlist);
        // expect(console.log).toBeCalledWith('Error: in setlist.after db.close: Test Error');
    });
});