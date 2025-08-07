import { DataSource } from 'typeorm';
import { Lead } from './leads/lead.entity';

export default new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Lead],
  synchronize: false, // Disable synchronize for migrations
  migrations: ['dist/migrations/*.js'],
});