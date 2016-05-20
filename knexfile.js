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
      database: 'WEDDING_GUESTS_URL'
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
