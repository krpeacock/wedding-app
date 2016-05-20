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
      url: 'postgres://btrqivpkbujwqn:MV0y2MWGcKiozt0RuNRLbmtuvN@ec2-54-243-199-137.compute-1.amazonaws.com:5432/desdaa9mnhsm7h'
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
