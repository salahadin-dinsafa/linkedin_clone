import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationOfUserToFeed1671966001956 implements MigrationInterface {
    name = 'RelationOfUserToFeed1671966001956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feeds" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "feeds" ADD CONSTRAINT "FK_a1a01eb30c28276a21b04b59552" FOREIGN KEY ("authorId") REFERENCES "linkedin_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feeds" DROP CONSTRAINT "FK_a1a01eb30c28276a21b04b59552"`);
        await queryRunner.query(`ALTER TABLE "feeds" DROP COLUMN "authorId"`);
    }

}
