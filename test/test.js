const should = require('chai').should();
const models = require('../models');

describe('beevers', function() {
  describe('create', function() {
    before(function(done) { //sebelum menjalankan describe findAll diatas, jalankan before
      console.log('test');
      done()
      models.Beever.destroy({
          where: {}
        })
        .then(() => {
          console.log('isi beevers sudah dihapus');
        })
        .catch((err) => {
          console.log('error');
        })
    })
    it('should create beevers without error', function(done) {
      models.Beever.create({
          name: 'test',
          email: 'test@gmail.com',
          password: '1234'
        })
        .then((beever) => {
          // console.log('selesai insert', beever);
          console.log('selesai insert');
          done();
        })
    })
  });
})

describe('beevers', function() {
  describe('findAll', function() {
    before(function(done) {
      models.Beever.destroy({
        where:{}
      })
      .then(() => {
        models.Beever.create({
            name: 'test',
            email: 'test@gmail.com',
            password: '1234'
          })
          .then(() => {
            done()
          })
      })
      .catch((err) => {
        console.log('error');
      })
    })
    it('should findAll beevers', function(done) {
      models.Beever.findAll({
        name: 'test'
      })
      .then((param) => {
        param.should.have.lengthOf(1);
        console.log('selesai menu cari');
        done()
      })
    })
  })
})

// describe
