import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationBetweenUserAndInstanceWhatsappChange1766161616870 implements MigrationInterface {
    name = 'UpdateRelationBetweenUserAndInstanceWhatsappChange1766161616870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_49358b5290ae0fc65423b14afb5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_49358b5290ae0fc65423b14afb5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "instance_whatsapp_id"`);
        await queryRunner.query(`ALTER TABLE "instance_whatsapp" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "instance_whatsapp" ADD CONSTRAINT "UQ_c4a0597f682bef819febca84be0" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "instance_whatsapp" ADD CONSTRAINT "FK_c4a0597f682bef819febca84be0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instance_whatsapp" DROP CONSTRAINT "FK_c4a0597f682bef819febca84be0"`);
        await queryRunner.query(`ALTER TABLE "instance_whatsapp" DROP CONSTRAINT "UQ_c4a0597f682bef819febca84be0"`);
        await queryRunner.query(`ALTER TABLE "instance_whatsapp" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "instance_whatsapp_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_49358b5290ae0fc65423b14afb5" UNIQUE ("instance_whatsapp_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_49358b5290ae0fc65423b14afb5" FOREIGN KEY ("instance_whatsapp_id") REFERENCES "instance_whatsapp"("instanceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
