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
      url: 'postgres://zofrkrziwhgdgj:xbaeK2LDV6XelAH4agzQhbfoVE@ec2-54-243-203-104.compute-1.amazonaws.com:5432/dbtnmcs37e8td6'
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
