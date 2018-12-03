'use strict';

const mock = require('egg-mock');

describe('test/passport-bitrabbit.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/passport-bitrabbit-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, passportBitrabbit')
      .expect(200);
  });
});
