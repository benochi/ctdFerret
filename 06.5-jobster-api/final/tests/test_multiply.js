const get_chai = require('../util/get_chai');
const app = require('../app'); 

describe('Test /multiply API', () => {
  it('should return the product of two numbers', async () => {
    const { expect, request } = await get_chai();

    
    const res = await request(app)
      .get('/multiply')
      .query({ first: 7, second: 6 });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('result');
    expect(res.body.result).to.equal(42);
  });
});
