const connection = require('../database/connection');
const { response } = require('express');

module.exports = {

  async show(req,res){

    const { subject_id }  = req.params;

    const subjectQuestions = await connection('questions')
    .where('subject_id' , subject_id)
    .join('subjects', 'subjects.id', '=', 'questions.subject_id')
    .select([
      'questions.*',
      'subjects.name'
    ]);
    
      if (!subjectQuestions){
        return response.status(400).json({message: 'Questions not found'});
      } 


    return res.json(subjectQuestions);
  },

  async showQuestionsByUser(req, res){
    
    const { user_id } = req.params;

    const questionsByUser = await connection('questions')
      .select('*')
      .where('user_id' , user_id);

      return res.json(questionsByUser);
  },

  async index(req, res){

    const [count] = await connection('questions').count();

    const questions = await connection('questions')
    .join('subjects', 'subjects.id', '=', 'questions.subject_id')
    .select([
      'questions.*',
      'subjects.name'
    ]);

    res.header('X-Ttoal-Count' , count['count(*)']);
    return res.json(questions)
  
  },
  
  async create(req, res){
    const { 
      title, 
      answer,
      option_a,
      option_b,
      option_c,
      option_d,
    } = req.body;

    const user_id = req.headers.authorization;
    const subject_id = req.headers.subject_id;

    const [ id ] = await connection('questions').insert({
      title, 
      answer,
      option_a,
      option_b,
      option_c,
      option_d,
      subject_id,
      user_id,
    });

    return res.json({ id })
  },

  async delete(req, res){
    
    const { id } = req.params;
    const user_id = req.headers.authorization;

    const question = await connection('questions')
    .where('id', id)
    .select('user_id')
    .first();

    if (question.user_id != user_id ){
      return res.status(401).json({ error: "Operation not permitted" });
    }

    await connection('questions').where('id' , id).delete();
    return res.status(204).send();

  }

}