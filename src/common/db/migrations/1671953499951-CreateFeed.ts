import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFeed1671953499951 implements MigrationInterface {
    name = 'CreateFeed1671953499951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feeds" ("id" SERIAL NOT NULL, "body" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dafbf766ecbb1eb2017732153f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "feeds"`);
    }

}
