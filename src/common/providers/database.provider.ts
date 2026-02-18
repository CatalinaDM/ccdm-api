import { Client } from 'pg';

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'ccdm_db',
      });
      await client.connect();
      return client;
    },
  },
];
