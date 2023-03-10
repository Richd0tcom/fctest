import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('brands', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('addons', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('description');
      table.double('price').notNullable();
      table.string('category');
      table
        .integer('brand_id')
        .notNullable()
        .references('id')
        .inTable('brands');
      table.timestamps(true, true);
    })
    .createTable('addon_categories', (table) => {
      table.increments();
      table.string('name').notNullable();
      table
        .integer('brand_id')
        .notNullable()
        .references('id')
        .inTable('brands');
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE "brands" CASCADE');
  await knex.raw('DROP TABLE "addons" CASCADE');
  return await knex.raw('DROP TABLE "addon_categories" CASCADE');
}
