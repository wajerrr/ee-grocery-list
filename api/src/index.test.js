const request = require('supertest');
const decache = require('decache');
let apiModule = require('./index.js');
let app = apiModule.app;
let server = apiModule.server;

const list = {
    '1': {
        text: 'banananas',
        id: '1',
        isCompleted: false,
    },
    '2': {
        text: 'tomatoes',
        id: '2',
        isCompleted: false,
    },
    '3': {
        text: 'milk',
        isCompleted: false,
        id: '3'
    },
    '4': {
        text: 'eggs',
        isCompleted: false,
        id: '4'
    },
    '5': {
        text: 'kale',
        isCompleted: false,
        id: '5'
    }
}

afterEach(async (done) => {
    await server.close(done);
    jest.resetModules();
    apiModule = require('./index.js');
    app = apiModule.app;
    server = apiModule.server;
});

test('get items', async () => {
   const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(list);
});

test('get item of specific id', async () => {
    const res = await request(app).get('/api/item/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(list['1']);
 });

 test('modify item', async () => {
    const text = 'new text';
    const isCompleted = false;
    const res = await request(app).put('/api/item/1').send({ text, isCompleted });
     const response = { ...list['1'], text, isCompleted };
     expect(res.status).toBe(200);
     expect(res.body).toEqual(response);
 });

 test('removed item', async () => {
    const res = await request(app).delete('/api/item/1');
      
    expect(res.status).toBe(200);
    const resGet = await request(app).get('/api/item/1');
    expect(resGet.status).toBe(404);
 });

 test('add item', async () => {
    const text = 'new text';
    const res = await request(app).post('/api/item').send({text});
    expect(res.status).toBe(200);
    const id = res.body.id;
    
    const resGet = await request(app).get(`/api/item/${id}`);
    expect(resGet.status).toBe(200);
    const response = {text, id, isCompleted: false}
    expect(res.body).toEqual(response);
 });