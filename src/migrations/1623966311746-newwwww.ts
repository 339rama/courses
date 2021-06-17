import {MigrationInterface, QueryRunner} from "typeorm";

export class newwwww1623966311746 implements MigrationInterface {
    name = 'newwwww1623966311746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_level" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fab4dc4ff554cd78d16012c6d41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_review" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "course_id" integer NOT NULL, "review_text" text NOT NULL, "is_like" boolean NOT NULL, "accountId" integer, "courseId" integer, CONSTRAINT "PK_6778f8a83352215ea3268869658" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favourite_course" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "course_id" integer NOT NULL, "accountId" integer, "courseId" integer, CONSTRAINT "PK_c16b12da1b231f4d70c6287a86c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_lesson_time_code" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_id" integer NOT NULL, "time_code" integer NOT NULL, "accountId" integer, "lessonId" integer, CONSTRAINT "PK_acd643c4bfd78f0cc637883b237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homework_answer_free" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_homework_id" integer NOT NULL, "answer" text NOT NULL, "accountId" integer, "lessonHomeworkId" integer, CONSTRAINT "PK_282e938867f61a0f5f43783dde9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homework_is_done" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_homework_id" integer NOT NULL, "accountId" integer, "lessonHomeworkId" integer, CONSTRAINT "PK_23d6efed9e6b9d45f5497ee14d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_variant" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "answer" character varying NOT NULL, "is_right" boolean NOT NULL, "homeworkQuestionId" integer, CONSTRAINT "PK_2f6daa32adef76e5013048981f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homework_question" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "question" character varying NOT NULL, "testVariantsId" integer, CONSTRAINT "PK_21a7299281ba209a82e9f16d586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "homework_result_result_enum" AS ENUM('bad', 'middle', 'GOOD')`);
        await queryRunner.query(`CREATE TABLE "homework_result" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "total_answers" integer NOT NULL, "right_answers" integer NOT NULL, "result" "homework_result_result_enum" NOT NULL, "homeworkId" integer, "accountId" integer, CONSTRAINT "PK_e581ea1aacd852130cce71ad772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "lesson_homework_homework_type_enum" AS ENUM('free', 'test')`);
        await queryRunner.query(`CREATE TABLE "lesson_homework" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "homework_type" "lesson_homework_homework_type_enum" NOT NULL, "is_required" boolean NOT NULL DEFAULT false, "lessonId" integer, "questionId" integer, CONSTRAINT "REL_846b9383cb3cf8dfd3cf550087" UNIQUE ("questionId"), CONSTRAINT "PK_31208f69c2ba8a6d95792db6da3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson_is_done" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_id" integer NOT NULL, "accountId" integer, "lessonId" integer, CONSTRAINT "PK_b5108f6cc407f5aefffd76ab58f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "photo_link" character varying NOT NULL, "description" character varying NOT NULL, "duration" integer NOT NULL, "m3u8_file_link" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "photo_link" character varying NOT NULL, "description" character varying NOT NULL, "cost" integer NOT NULL, "is_published" boolean NOT NULL DEFAULT false, "levelId" integer, "authorId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_confirm_code" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, CONSTRAINT "PK_738e1dc7503bb85c76350fd71a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "is_email_confirmed" boolean NOT NULL DEFAULT false, "hash_password" character varying NOT NULL, "photo_link" character varying NOT NULL, "phone_number" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "description" character varying NOT NULL, "telegram" character varying NOT NULL, "vk_link" character varying NOT NULL, "instagram_link" character varying NOT NULL, "facebook_link" character varying NOT NULL, "site_link" character varying NOT NULL, "wallet" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "UQ_5eea76fd43120cb5689eacd3a95" UNIQUE ("phone_number"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_bought_courses_course" ("accountId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_c0acd0fa878274e3b5f8e76dbb8" PRIMARY KEY ("accountId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b861a12547b9dd7704573f886b" ON "account_bought_courses_course" ("accountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1c6070e31833de575acb26cc2" ON "account_bought_courses_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "course_review" ADD CONSTRAINT "FK_2e7d69883be0ff1c7849cf48152" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_review" ADD CONSTRAINT "FK_9fac4258c1f8b81a63bc5fd46b8" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourite_course" ADD CONSTRAINT "FK_38d44116d12634895c1e5ad4501" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourite_course" ADD CONSTRAINT "FK_cda70411d682e090f46da85de1a" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_lesson_time_code" ADD CONSTRAINT "FK_e3d5c5fd910eba1e8f8d51bc21f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_lesson_time_code" ADD CONSTRAINT "FK_424d40d249dfcaa3fa60a238df5" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homework_answer_free" ADD CONSTRAINT "FK_2ece2f574cb3aa2087564efacc5" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homework_answer_free" ADD CONSTRAINT "FK_f69756c2ebfccde71f48e749252" FOREIGN KEY ("lessonHomeworkId") REFERENCES "lesson_homework"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homework_is_done" ADD CONSTRAINT "FK_0ff3adc428e7572335c1bf8978f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homework_is_done" ADD CONSTRAINT "FK_ba46e11273cb3802f3d08ae68c4" FOREIGN KEY ("lessonHomeworkId") REFERENCES "lesson_homework"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_variant" ADD CONSTRAINT "FK_df5d3cd50eb76f3acb8b6503a65" FOREIGN KEY ("homeworkQuestionId") REFERENCES "homework_question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homework_question" ADD CONSTRAINT "FK_a19d8f1d5ceaa633ba4de770e5c" FOREIGN KEY ("testVariantsId") REFERENCES "test_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homework_result" ADD CONSTRAINT "FK_bcecd1a49806606595f6dcb6528" FOREIGN KEY ("homeworkId") REFERENCES "lesson_homework"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homework_result" ADD CONSTRAINT "FK_2505453f85fe0c0246a3a1e9d6f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_homework" ADD CONSTRAINT "FK_3458cfcc6ba5069763bb13f4a35" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_homework" ADD CONSTRAINT "FK_846b9383cb3cf8dfd3cf5500879" FOREIGN KEY ("questionId") REFERENCES "homework_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_is_done" ADD CONSTRAINT "FK_c2ded73cbd59fea65c0684f17a2" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_is_done" ADD CONSTRAINT "FK_3921597faf498587d342bdff721" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_9679d37e8ce033b56d27e271609" FOREIGN KEY ("levelId") REFERENCES "course_level"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_98522d97c4ecc30c636f5f5115e" FOREIGN KEY ("authorId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_confirm_code" ADD CONSTRAINT "FK_34b6de720754be96b5a370eef05" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_bought_courses_course" ADD CONSTRAINT "FK_b861a12547b9dd7704573f886b8" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "account_bought_courses_course" ADD CONSTRAINT "FK_a1c6070e31833de575acb26cc2f" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_bought_courses_course" DROP CONSTRAINT "FK_a1c6070e31833de575acb26cc2f"`);
        await queryRunner.query(`ALTER TABLE "account_bought_courses_course" DROP CONSTRAINT "FK_b861a12547b9dd7704573f886b8"`);
        await queryRunner.query(`ALTER TABLE "account_confirm_code" DROP CONSTRAINT "FK_34b6de720754be96b5a370eef05"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_98522d97c4ecc30c636f5f5115e"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_9679d37e8ce033b56d27e271609"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf"`);
        await queryRunner.query(`ALTER TABLE "lesson_is_done" DROP CONSTRAINT "FK_3921597faf498587d342bdff721"`);
        await queryRunner.query(`ALTER TABLE "lesson_is_done" DROP CONSTRAINT "FK_c2ded73cbd59fea65c0684f17a2"`);
        await queryRunner.query(`ALTER TABLE "lesson_homework" DROP CONSTRAINT "FK_846b9383cb3cf8dfd3cf5500879"`);
        await queryRunner.query(`ALTER TABLE "lesson_homework" DROP CONSTRAINT "FK_3458cfcc6ba5069763bb13f4a35"`);
        await queryRunner.query(`ALTER TABLE "homework_result" DROP CONSTRAINT "FK_2505453f85fe0c0246a3a1e9d6f"`);
        await queryRunner.query(`ALTER TABLE "homework_result" DROP CONSTRAINT "FK_bcecd1a49806606595f6dcb6528"`);
        await queryRunner.query(`ALTER TABLE "homework_question" DROP CONSTRAINT "FK_a19d8f1d5ceaa633ba4de770e5c"`);
        await queryRunner.query(`ALTER TABLE "test_variant" DROP CONSTRAINT "FK_df5d3cd50eb76f3acb8b6503a65"`);
        await queryRunner.query(`ALTER TABLE "homework_is_done" DROP CONSTRAINT "FK_ba46e11273cb3802f3d08ae68c4"`);
        await queryRunner.query(`ALTER TABLE "homework_is_done" DROP CONSTRAINT "FK_0ff3adc428e7572335c1bf8978f"`);
        await queryRunner.query(`ALTER TABLE "homework_answer_free" DROP CONSTRAINT "FK_f69756c2ebfccde71f48e749252"`);
        await queryRunner.query(`ALTER TABLE "homework_answer_free" DROP CONSTRAINT "FK_2ece2f574cb3aa2087564efacc5"`);
        await queryRunner.query(`ALTER TABLE "account_lesson_time_code" DROP CONSTRAINT "FK_424d40d249dfcaa3fa60a238df5"`);
        await queryRunner.query(`ALTER TABLE "account_lesson_time_code" DROP CONSTRAINT "FK_e3d5c5fd910eba1e8f8d51bc21f"`);
        await queryRunner.query(`ALTER TABLE "favourite_course" DROP CONSTRAINT "FK_cda70411d682e090f46da85de1a"`);
        await queryRunner.query(`ALTER TABLE "favourite_course" DROP CONSTRAINT "FK_38d44116d12634895c1e5ad4501"`);
        await queryRunner.query(`ALTER TABLE "course_review" DROP CONSTRAINT "FK_9fac4258c1f8b81a63bc5fd46b8"`);
        await queryRunner.query(`ALTER TABLE "course_review" DROP CONSTRAINT "FK_2e7d69883be0ff1c7849cf48152"`);
        await queryRunner.query(`DROP INDEX "IDX_a1c6070e31833de575acb26cc2"`);
        await queryRunner.query(`DROP INDEX "IDX_b861a12547b9dd7704573f886b"`);
        await queryRunner.query(`DROP TABLE "account_bought_courses_course"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "account_confirm_code"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TABLE "lesson_is_done"`);
        await queryRunner.query(`DROP TABLE "lesson_homework"`);
        await queryRunner.query(`DROP TYPE "lesson_homework_homework_type_enum"`);
        await queryRunner.query(`DROP TABLE "homework_result"`);
        await queryRunner.query(`DROP TYPE "homework_result_result_enum"`);
        await queryRunner.query(`DROP TABLE "homework_question"`);
        await queryRunner.query(`DROP TABLE "test_variant"`);
        await queryRunner.query(`DROP TABLE "homework_is_done"`);
        await queryRunner.query(`DROP TABLE "homework_answer_free"`);
        await queryRunner.query(`DROP TABLE "account_lesson_time_code"`);
        await queryRunner.query(`DROP TABLE "favourite_course"`);
        await queryRunner.query(`DROP TABLE "course_review"`);
        await queryRunner.query(`DROP TABLE "course_level"`);
    }

}
