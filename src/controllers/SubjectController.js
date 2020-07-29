const connection = require('../database/connection');

module.exports = {

  async index(req, res){

    const subjects = await connection('subjects').select('*')

    return res.json(subjects)
  },

  async create(req, res){
    const { name } = req.body;

    const user_id = req.headers.authorization;

    const [ id ] = await connection('subjects').insert({
      name,
      user_id
    });

    return res.json({ id });
  },

  async delete(req, res){
    const { id } = req.params;
    const user_id = req.headers.authorization;

    const subject = await connection('subjects')
    .where('id', id)
    .select('user_id')
    .first();

    if(subject.user_id != user_id){
      return res.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('subjects').where('id', id).delete();
    return res.status(204).send();

  }

}