const connection = require('../database/connection');

const crypto = require('crypto');
const md5 = require('md5')

module.exports = {

  async index(req, res){


    const users = await connection('users').select('*');

    return res.json(users)
  
  },

   async create(req, res){
    const { name, email, passworld, category } = req.body;
    
    const id = crypto.randomBytes(4).toString('HEX');
    const passwd = md5(passworld);

    const user = await connection('users').insert({
      id, 
      name,
      email,
      passworld: passwd,
      category,
    });

    return res.json({ id });

  }

}