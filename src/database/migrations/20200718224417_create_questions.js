exports.up = function(knex) {
  return knex.schema.createTable('questions' , function(table){
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('answer').notNullable();
    table.string('option_a').notNullable();
    table.string('option_b').notNullable();
    table.string('option_c').notNullable();
    table.string('option_d').notNullable();

    
    table.string('subject_id').notNullable();
    table.foreign('subject_id').references('id').inTable('subjects');

    table.string('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
  })
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('questions')
};
