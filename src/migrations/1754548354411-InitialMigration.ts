import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754548354411 implements MigrationInterface {
    name = 'InitialMigration1754548354411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lead" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "mobile" varchar NOT NULL, "postcode" varchar NOT NULL, "services" text NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lead"`);
    }

}
