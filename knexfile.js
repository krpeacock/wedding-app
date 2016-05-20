// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'wedding_guests'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'wedding_guests'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      url: '127.0.0.1:5432'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
