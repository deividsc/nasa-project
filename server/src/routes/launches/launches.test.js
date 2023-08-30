const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const { loadPlanetsData } = require('../../models/planets.model');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsData();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
        test('it should responde with 200 success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200)
    
        })
    
    })
    
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'Test Mission',
            rocket: ' Test Rocket',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2030',
        };
        const { launchDate, ...launchDataWithoutDate } = completeLaunchData;
        test('It should respond with 201 success', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);
    
            const requestDate = new Date(launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(launchDataWithoutDate);
        })
    
        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property',
            })
        });
    
        test('It should catch invalid dates', async () => {
            const launchDataInvalidDate = { ...launchDataWithoutDate, ...{ launchDate: "invalid date" } }
            const response = await request(app)
                .post('/launches')
                .send(launchDataInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);
            
                expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            })
        });
    
    });

});


