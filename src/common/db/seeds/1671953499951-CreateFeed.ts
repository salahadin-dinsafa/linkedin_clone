import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1671953499951 implements MigrationInterface {
    name = 'Seed1671953499951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO feeds (body)  VALUES ('Man is Man even if Man is Man')`
        );
    }

    public async down(): Promise<void> {
    }

}
