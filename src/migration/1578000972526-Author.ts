import {MigrationInterface, QueryRunner} from "typeorm";

export class Author1578000972526 implements MigrationInterface {
    name = 'Author1578000972526'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE INDEX "IDX_c56120106977cc14f975726af0" ON "todo" ("authorId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_c56120106977cc14f975726af0"`, undefined);
    }

}
