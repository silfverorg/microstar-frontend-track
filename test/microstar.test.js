import microstar from '../src/index.js';
import request from 'superagent';
import should from 'should';
import sinon from 'sinon';

describe('Microstar track suite', () => {

  var server;
  before(() => {
    server = sinon.fakeServer.create();
    server.respondWith("POST", "/track", [200, {"Content-Type": "application/json"}, JSON.stringify({status: 200})]);

    const config = {
      rootPath: '/',
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
    microstar.track('test', {value: 'testvalue'});
      setTimeout(() => {
          done();
      }, 1000);
  });

});
