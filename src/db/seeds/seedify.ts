import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  //truncate ALL existing table
  await knex.raw('TRUNCATE TABLE "brands" CASCADE');
  await knex.raw('TRUNCATE TABLE "addons" CASCADE');
  await knex.raw('TRUNCATE TABLE "addon_categories" CASCADE');

  // Inserts seed entries
  await knex('brands').insert([
    { id: 1, name: 'Wing Kings' },
    { id: 2, name: 'Frankies' },
    { id: 3, name: 'FC Shop' },
  ]);

  await knex('addons').insert([
    {
      name: 'Grilled Chicken',
      description: 'Grilled chicken breast in a garden salad bed.',
      price: 7000,
      category: 'Chicken',
      brand_id: 1,
    },
    {
      name: 'Chicken Shawarma',
      description:
        'Chicken & mixed veg, drenched in special sauce & wrapped in toasted flat bread.',
      price: 4000,
      category: 'Chicken',
      brand_id: 1,
    },
    {
      name: 'Drinks, Wine & Liquor',
      description: 'Lets get the party started 🥂',
      price: 12000,
      category: 'Liquor',
      brand_id: 3,
    },
    {
      name: 'Snacks, Sweets & Munchies',
      description: 'A curation of all your faves. 🍬',
      price: 500,
      category: 'Snacks',
      brand_id: 3,
    },
    {
      name: 'OG Burger',
      description:
        'Premium beef patty with egg, sausage, lettuce & special sauce.',
      price: 1000,
      category: 'Junk food',
      brand_id: 2,
    },
    {
      name: 'Double Cheese Burger',
      description:
        'Double premium beef patty with cheese, tomatoes & lettuce in special sauce.',
      price: 1000,
      category: 'Junk food',
      brand_id: 2,
    },
  ]);
  return;
}
