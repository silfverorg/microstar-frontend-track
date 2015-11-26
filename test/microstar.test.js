import microstar from '../src/index.js';
import request from 'superagent';
import should from 'should';
import sinon from 'sinon';

describe('Microstar track suite', () => {

  var server;
  before(() => {
    server = sinon.fakeServer.create();
    server.autoRespond = true;

    const config = {
      rootPath: 'localhost:3000',
      sessionVariables: {
          user_id: 1,
      },
    };
    microstar.init(config);
  });

  after(() => {
    server.restore();
  });

  it('Can peform tracking', (done) => {
    server.respondWith([200, {"Content-Type": "application/json"}, JSON.stringify({status: 200})]);
    microstar.track('test', {value: 'testvalue'});
    console.log('requests are', server.requests);
    server.respond();
      setTimeout(() => {
          done();
      }, 500);
  });

});
