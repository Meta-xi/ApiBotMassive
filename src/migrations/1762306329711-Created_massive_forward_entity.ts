import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedMassiveForwardEntity1762306329711 implements MigrationInterface {
    name = 'CreatedMassiveForwardEntity1762306329711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "configuracion_mensaje" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mensaje" json NOT NULL, "ids_destino" json NOT NULL, "intervalo" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "enabled" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_618fd9a26e7461e5736be2ee9aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instance_whatsapp" ("instanceId" uuid NOT NULL, "instanceName" character varying NOT NULL, "phoneNumber" character varying, "userIdTelegram" bigint NOT NULL, CONSTRAINT "PK_7de3a659c0a5f5dc90f05aafa79" PRIMARY KEY ("instanceId"))`);
        await queryRunner.query(`CREATE TABLE "massive_forward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "caption" character varying NOT NULL, "url" text, "ids_destino" json NOT NULL, "interval" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "enabled" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_1b7e1eaa8cd70dcee9ef155ad23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "idUserTelegram" bigint NOT NULL, "sesionToken" character varying NOT NULL, CONSTRAINT "UQ_b8d2022eea7da091b6c121d0335" UNIQUE ("idUserTelegram"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "configuracion_mensaje" ADD CONSTRAINT "FK_6fabe174de0c1710ffef791abb0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "massive_forward" ADD CONSTRAINT "FK_ae9aa409fd26cbfbc6e6820c45d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "massive_forward" DROP CONSTRAINT "FK_ae9aa409fd26cbfbc6e6820c45d"`);
        await queryRunner.query(`ALTER TABLE "configuracion_mensaje" DROP CONSTRAINT "FK_6fabe174de0c1710ffef791abb0"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "massive_forward"`);
        await queryRunner.query(`DROP TABLE "instance_whatsapp"`);
        await queryRunner.query(`DROP TABLE "configuracion_mensaje"`);
    }

}
