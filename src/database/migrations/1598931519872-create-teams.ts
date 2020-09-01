import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createTeams1598931519872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teams',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'avatar_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'top_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'jungle_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'mid_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'adcarry_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'support_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'coach_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'cash',
            type: 'float',
            isNullable: false,
            default: 100.0,
          },
          {
            name: 'points',
            type: 'float',
            isNullable: false,
            default: 0.0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teams');
  }
}
