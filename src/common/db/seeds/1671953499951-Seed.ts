import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1671953499951 implements MigrationInterface {
    name = 'Seed1671953499951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO linkedin_users ("firstName","lastName", email, password, role)  
            VALUES 
            ('user1firstname','user1lastname','user1@gmail.com','$2a$15$tCw5wWLFltDBlpXTNRH8KunYmNpjnS9qSjK7BdG5plvVQOwo83TIC', 'USER'),
            ('user2firstname','user2lastname','user2@gmail.com','$2a$15$tCw5wWLFltDBlpXTNRH8KunYmNpjnS9qSjK7BdG5plvVQOwo83TIC', 'USER'),
            ('user2firstname','user3lastname','user3@gmail.com','$2a$15$tCw5wWLFltDBlpXTNRH8KunYmNpjnS9qSjK7BdG5plvVQOwo83TIC', 'USER'),
            ('admin','admin','admin@gmail.com','$2a$15$tCw5wWLFltDBlpXTNRH8KunYmNpjnS9qSjK7BdG5plvVQOwo83TIC', 'ADMIN')
            `
        );
        await queryRunner.query(
            `INSERT INTO feeds (body, "authorId")  VALUES
             ('Man is Man even if Man is Man', '1')`
        );

        await queryRunner.query(
            `INSERT INTO friend_request (status, "senderId", "reciverId")  
            VALUES 
            ('PENDING', '1', '2'),
            ('ACCEPTED', '1', '3'),
            ('DECLINED', '1', '4')
            `
        );
    }

    public async down(): Promise<void> {
    }

}
