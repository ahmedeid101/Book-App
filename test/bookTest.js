var chai = require('chai');
const request = require('supertest');
const app = require('../server');

var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

describe('GET /books', function() {
  it('return list of books', (done)=> {
     request(app)
      .get('/api/v1/books')
      .expect(200)
      .expect((result) =>{
        console.log('book list >> '+ JSON.stringify(result));
      }).end(done)
  })
})