import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1698862741412 implements MigrationInterface {
    name = 'CreateMigration1698862741412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstates" DROP CONSTRAINT "FK_d64118a1cb2b2b54747d5851fe9"`);
        await queryRunner.query(`ALTER TABLE "realEstates" RENAME COLUMN "addressesId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "realEstates" ADD CONSTRAINT "FK_c7a1c763ff260ac28674afa8c60" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstates" DROP CONSTRAINT "FK_c7a1c763ff260ac28674afa8c60"`);
        await queryRunner.query(`ALTER TABLE "realEstates" RENAME COLUMN "addressId" TO "addressesId"`);
        await queryRunner.query(`ALTER TABLE "realEstates" ADD CONSTRAINT "FK_d64118a1cb2b2b54747d5851fe9" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
