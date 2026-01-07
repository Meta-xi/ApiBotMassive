import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationBetweenUserAndInstanceWhatsapp1766160638777 implements MigrationInterface {
    name = 'UpdateRelationBetweenUserAndInstanceWhatsapp1766160638777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "instance_whatsapp_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_49358b5290ae0fc65423b14afb5" UNIQUE ("instance_whatsapp_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_49358b5290ae0fc65423b14afb5" FOREIGN KEY ("instance_whatsapp_id") REFERENCES "instance_whatsapp"("instanceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_49358b5290ae0fc65423b14afb5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_49358b5290ae0fc65423b14afb5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "instance_whatsapp_id"`);
    }

}
