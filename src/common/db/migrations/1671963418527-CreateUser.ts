import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1671963418527 implements MigrationInterface {
    name = 'CreateUser1671963418527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER', 'PRIMIUM')`);
        await queryRunner.query(`CREATE TABLE "linkedin_users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "linkedin_users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
