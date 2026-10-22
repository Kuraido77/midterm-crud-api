import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneNumberToUser1792683510414 implements MigrationInterface {
    name = 'AddPhoneNumberToUser1792683510414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`tasks_ibfk_1\``);
        await queryRunner.query(`DROP INDEX \`userId\` ON \`tasks\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phoneNumber\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`status\` \`status\` enum ('pending', 'in-progress', 'completed') NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`priority\` \`priority\` enum ('low', 'medium', 'high') NOT NULL DEFAULT 'medium'`);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`CREATE INDEX \`IDX_166bd96559cb38595d392f75a3\` ON \`tasks\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_166bd96559cb38595d392f75a35\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_166bd96559cb38595d392f75a35\``);
        await queryRunner.query(`DROP INDEX \`IDX_166bd96559cb38595d392f75a3\` ON \`tasks\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isActive\` \`isActive\` tinyint NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`updatedAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`createdAt\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`priority\` \`priority\` enum ('low', 'medium', 'high') NULL DEFAULT 'medium'`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`status\` \`status\` enum ('pending', 'in-progress', 'completed') NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`users\` (\`email\`)`);
        await queryRunner.query(`CREATE INDEX \`userId\` ON \`tasks\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`tasks_ibfk_1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
