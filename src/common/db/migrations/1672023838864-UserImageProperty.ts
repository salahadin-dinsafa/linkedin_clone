import { MigrationInterface, QueryRunner } from "typeorm";

export class UserImageProperty1672023838864 implements MigrationInterface {
    name = 'UserImageProperty1672023838864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linkedin_users" ADD "imagePath" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linkedin_users" DROP COLUMN "imagePath"`);
    }

}
