'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');
const Cart = require('../server/db/models/Cart');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = [
    {
      email: 'kt@gmail.com',
      firstName: 'Katie',
      lastName: 'Assoian',
      password: '123',
      isAdmin: true,
    },
    {
      email: 'john@gmail.com',
      firstName: 'John',
      lastName: 'Bumgarner',
      password: '123',
      isAdmin: true,
    },
    {
      email: 'michelle@gmail.com',
      firstName: 'Michelle',
      lastName: 'Assoian',
      password: '123',
    },
  ];
  const [Katie, John, Michelle] = await Promise.all(
    users.map((user) => User.create(user))
  );

  // Creating Products
  const products = await Promise.all([
    Product.create({
      productName: 'Ombre Cutting board',
      price: 300,
      description:
        'The wood species in this board from left to right are Peruvian walnut, African Sapele, Brazilian Yellowheart and American white oak.',
      // category: "Cutting Boards",
      imageUrl: ['https://unsplash.com/photos/OOv2sCKwYAA'],
    }),
    Product.create({
      productName: 'Crazy Quilt',
      price: 450,
      description: 'finished with walrusoil. It came out much darker',
      // category: "Cutting Boards",
      imageUrl: ['https://unsplash.com/photos/bg20VZvrfvY'],
    }),
    Product.create({
      productName: 'Chevron Pattern',
      price: 350,
      description:
        'The board is constructed out of American cherry, African padauk, Peruvian Walnut and white oak.',
      // category: "Cutting Boards",
      imageUrl: ['https://unsplash.com/photos/uQs1802D0CQ'],
    }),
    Product.create({
      productName: 'Garden Bench',
      price: 500,
      description:
        'These benches have made great additions to the landscape and garden.',
      // category: "Furniture",
      imageUrl: ['https://unsplash.com/photos/lX-9IaYCals'],
    }),
    Product.create({
      productName: 'Bird Outhouse',
      price: 100,
      description:
        'This house is built from American Black Locus, which was reclaimed from a pallet. The rusty look of the wood made me think of an old outhouse in Blue Ridge Mountains.',
      // category: "Lawn Decor",
      imageUrl: ['https://unsplash.com/photos/F3o15IKl-kA'],
    }),
  ]);

  // Create Carts
  const [cart1, cart2, cart3] = await Cart.bulkCreate([
    {},
    {},
    {},
    { isOrder: true },
  ]);

  // Set associations between users and carts
  await cart1.setUser(Katie);
  await cart2.setUser(John);
  await cart3.setUser(Katie);

  // Set Cart-Product Associations
  await cart1.setProducts([products[0], products[1], products[2]], {
    through: { quantity: 3 },
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }
}

/*
We've separated the `seed` function from the `runSeed` function.
This way we can isolate the error handling and exit trapping.
The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
