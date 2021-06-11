const seedPosts = require('./seeds');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedPosts();
  process.exit(0);
};

seedDatabase();