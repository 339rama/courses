import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1623878377167 implements MigrationInterface {
  name = 'init1623878377167';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE "account_subscription_sub_type_enum"`);
    await queryRunner.query(
      `CREATE TABLE "purchase" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "course_id" integer NOT NULL, "amount" integer NOT NULL, "purchase_type" integer NOT NULL, "purchase_status" integer NOT NULL, "subscription_type" character varying NOT NULL, "order_id" character varying NOT NULL, "accountId" integer, "courseId" integer, CONSTRAINT "UQ_ad3e1c7b862f4043b103a6c8c60" UNIQUE ("order_id"), CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_level" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_fab4dc4ff554cd78d16012c6d41" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_purchase" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "course_id" integer NOT NULL, "accountId" integer, "courseId" integer, CONSTRAINT "PK_80eebff7166650425394e9d50bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_review" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "course_id" integer NOT NULL, "review_text" text NOT NULL, "is_like" boolean NOT NULL, "accountId" integer, "courseId" integer, CONSTRAINT "PK_6778f8a83352215ea3268869658" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favourite_course" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "course_id" integer NOT NULL, "accountId" integer, "courseId" integer, CONSTRAINT "PK_c16b12da1b231f4d70c6287a86c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_lesson_time_code" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_id" integer NOT NULL, "time_code" integer NOT NULL, "accountId" integer, "lessonId" integer, CONSTRAINT "PK_acd643c4bfd78f0cc637883b237" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_file" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "file_link" character varying NOT NULL, "lessonId" integer, CONSTRAINT "PK_3dd351487c75e3c195b6e7cd9a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "homework_answer_free" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_homework_id" integer NOT NULL, "answer" text NOT NULL, "accountId" integer, "lessonHomeworkId" integer, CONSTRAINT "PK_282e938867f61a0f5f43783dde9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "homework_is_done" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_homework_id" integer NOT NULL, "accountId" integer, "lessonHomeworkId" integer, CONSTRAINT "PK_23d6efed9e6b9d45f5497ee14d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "test_variant" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "answer" character varying NOT NULL, "is_right" boolean NOT NULL, "homeworkQuestionId" integer, CONSTRAINT "PK_2f6daa32adef76e5013048981f8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "homework_question" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "question" character varying NOT NULL, "lessonHomeworkId" integer, "testVariantsId" integer, CONSTRAINT "PK_21a7299281ba209a82e9f16d586" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "homework_result_result_enum" AS ENUM('bad', 'middle', 'GOOD')`,
    );
    await queryRunner.query(
      `CREATE TABLE "homework_result" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "total_answers" integer NOT NULL, "right_answers" integer NOT NULL, "result" "homework_result_result_enum" NOT NULL, "homeworkId" integer, "accountId" integer, CONSTRAINT "PK_e581ea1aacd852130cce71ad772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "lesson_homework_homework_type_enum" AS ENUM('free', 'test')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_homework" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "homework_type" "lesson_homework_homework_type_enum" NOT NULL, "is_required" boolean NOT NULL DEFAULT false, "lessonId" integer, CONSTRAINT "PK_31208f69c2ba8a6d95792db6da3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_is_done" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_id" integer NOT NULL, "accountId" integer, "lessonId" integer, CONSTRAINT "PK_b5108f6cc407f5aefffd76ab58f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_viewed" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_id" integer NOT NULL, "accountId" integer, "lessonId" integer, CONSTRAINT "PK_c77c4d6960edbafed80561b1780" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "photo_link" character varying NOT NULL, "description" character varying NOT NULL, "duration" integer NOT NULL, "m3u8_file_link" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "photo_link" character varying NOT NULL, "description" character varying NOT NULL, "cost" integer NOT NULL, "is_published" boolean NOT NULL DEFAULT false, "accountId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_confirm_code" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, CONSTRAINT "PK_738e1dc7503bb85c76350fd71a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "account_subscription_sub_type_enum" AS ENUM('month', 'year')`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_subscription" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "is_test" boolean NOT NULL DEFAULT true, "is_canceled" boolean NOT NULL DEFAULT false, "sub_type" "account_subscription_sub_type_enum" NOT NULL DEFAULT 'month', "expires_at" TIMESTAMP NOT NULL, "accountId" integer, CONSTRAINT "PK_08568b4f059808520495b7544f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "is_email_confirmed" boolean NOT NULL DEFAULT false, "hash_password" character varying NOT NULL, "photo_link" character varying NOT NULL, "photo_number" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "description" character varying NOT NULL, "telegram" character varying NOT NULL, "vk_link" character varying NOT NULL, "instagram_link" character varying NOT NULL, "facebook_link" character varying NOT NULL, "site_link" character varying NOT NULL, "is_test_period_subscription_available" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "UQ_e79b003cbdd16d9245493e89354" UNIQUE ("photo_number"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_session" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "device_registration_id" character varying NOT NULL, "accountId" integer, CONSTRAINT "PK_5c3e060425fa96014c285fc6c1e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_comment_answer_review" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_comment_answer_id" integer NOT NULL, "is_like" boolean NOT NULL, "accountId" integer, "lessonCommentAnswerId" integer, CONSTRAINT "PK_ec93d410aacfaba317ca97f57d4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_comment_answer" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_comment_id" integer NOT NULL, "message" text NOT NULL, "accountId" integer, "lessonCommentId" integer, CONSTRAINT "PK_e4f5a790173d71bf171bf39ad52" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_comment_review" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_comment_id" integer NOT NULL, "is_like" boolean NOT NULL, "accountId" integer, "lessonCommentId" integer, CONSTRAINT "PK_e38440177c8cc3d2225c01e0799" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_comment" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "lesson_id" integer NOT NULL, "message" text NOT NULL, "accountId" integer, "lessonId" integer, CONSTRAINT "PK_9782f9648111c3a0284035af0ec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_bought_courses_course" ("accountId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_c0acd0fa878274e3b5f8e76dbb8" PRIMARY KEY ("accountId", "courseId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b861a12547b9dd7704573f886b" ON "account_bought_courses_course" ("accountId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1c6070e31833de575acb26cc2" ON "account_bought_courses_course" ("courseId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD "is_subscription_actual" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_9915d38573248ff94a6e1aa143c" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_de02d16582b8f768a0a9cf3cb00" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_level" ADD CONSTRAINT "FK_8c38fc72fb4d73495a21a42d079" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_purchase" ADD CONSTRAINT "FK_6b7102500a90e58a94f82d48f98" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_purchase" ADD CONSTRAINT "FK_f1fa0a77f6f6e170121ed836318" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_review" ADD CONSTRAINT "FK_2e7d69883be0ff1c7849cf48152" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_review" ADD CONSTRAINT "FK_9fac4258c1f8b81a63bc5fd46b8" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_course" ADD CONSTRAINT "FK_38d44116d12634895c1e5ad4501" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_course" ADD CONSTRAINT "FK_cda70411d682e090f46da85de1a" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_lesson_time_code" ADD CONSTRAINT "FK_e3d5c5fd910eba1e8f8d51bc21f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_lesson_time_code" ADD CONSTRAINT "FK_424d40d249dfcaa3fa60a238df5" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_file" ADD CONSTRAINT "FK_ba6194860db206343b57e4745d7" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_answer_free" ADD CONSTRAINT "FK_2ece2f574cb3aa2087564efacc5" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_answer_free" ADD CONSTRAINT "FK_f69756c2ebfccde71f48e749252" FOREIGN KEY ("lessonHomeworkId") REFERENCES "lesson_homework"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_is_done" ADD CONSTRAINT "FK_0ff3adc428e7572335c1bf8978f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_is_done" ADD CONSTRAINT "FK_ba46e11273cb3802f3d08ae68c4" FOREIGN KEY ("lessonHomeworkId") REFERENCES "lesson_homework"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_variant" ADD CONSTRAINT "FK_df5d3cd50eb76f3acb8b6503a65" FOREIGN KEY ("homeworkQuestionId") REFERENCES "homework_question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_question" ADD CONSTRAINT "FK_92c44baf8552e41c1e4cef9202d" FOREIGN KEY ("lessonHomeworkId") REFERENCES "lesson_homework"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_question" ADD CONSTRAINT "FK_a19d8f1d5ceaa633ba4de770e5c" FOREIGN KEY ("testVariantsId") REFERENCES "test_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_result" ADD CONSTRAINT "FK_bcecd1a49806606595f6dcb6528" FOREIGN KEY ("homeworkId") REFERENCES "lesson_homework"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_result" ADD CONSTRAINT "FK_2505453f85fe0c0246a3a1e9d6f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_homework" ADD CONSTRAINT "FK_3458cfcc6ba5069763bb13f4a35" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_is_done" ADD CONSTRAINT "FK_c2ded73cbd59fea65c0684f17a2" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_is_done" ADD CONSTRAINT "FK_3921597faf498587d342bdff721" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_viewed" ADD CONSTRAINT "FK_6c3d60b0556acbeb4249bd99ed3" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_viewed" ADD CONSTRAINT "FK_dd41e60b05062e1f5fe99201ebc" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson" ADD CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_7170da49e8918cb5514bb57608e" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_confirm_code" ADD CONSTRAINT "FK_34b6de720754be96b5a370eef05" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_subscription" ADD CONSTRAINT "FK_01f361d5959a46c93b141606240" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_session" ADD CONSTRAINT "FK_77f718c8630c5140506409841fd" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_answer_review" ADD CONSTRAINT "FK_553d8acbf64463bd587e28c9d57" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_answer_review" ADD CONSTRAINT "FK_5872654a1e0d321c6f68b7ddb1f" FOREIGN KEY ("lessonCommentAnswerId") REFERENCES "lesson_comment_answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_answer" ADD CONSTRAINT "FK_1ea9c247b958f54254f307b8db3" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_answer" ADD CONSTRAINT "FK_8bf6c40511ed92f2c17f9bb85e1" FOREIGN KEY ("lessonCommentId") REFERENCES "lesson_comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_review" ADD CONSTRAINT "FK_87f6c607a24b1e6d5d4082398ea" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_review" ADD CONSTRAINT "FK_c65e01f6c2ac868a0b5eacbe00d" FOREIGN KEY ("lessonCommentId") REFERENCES "lesson_comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment" ADD CONSTRAINT "FK_09c7be0fc5c868b51925eed6b6f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment" ADD CONSTRAINT "FK_d3620957c3d3f7ffda238ecd2e5" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_bought_courses_course" ADD CONSTRAINT "FK_b861a12547b9dd7704573f886b8" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_bought_courses_course" ADD CONSTRAINT "FK_a1c6070e31833de575acb26cc2f" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_bought_courses_course" DROP CONSTRAINT "FK_a1c6070e31833de575acb26cc2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_bought_courses_course" DROP CONSTRAINT "FK_b861a12547b9dd7704573f886b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment" DROP CONSTRAINT "FK_d3620957c3d3f7ffda238ecd2e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment" DROP CONSTRAINT "FK_09c7be0fc5c868b51925eed6b6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_review" DROP CONSTRAINT "FK_c65e01f6c2ac868a0b5eacbe00d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_review" DROP CONSTRAINT "FK_87f6c607a24b1e6d5d4082398ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_answer" DROP CONSTRAINT "FK_8bf6c40511ed92f2c17f9bb85e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_answer" DROP CONSTRAINT "FK_1ea9c247b958f54254f307b8db3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_answer_review" DROP CONSTRAINT "FK_5872654a1e0d321c6f68b7ddb1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_comment_answer_review" DROP CONSTRAINT "FK_553d8acbf64463bd587e28c9d57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_session" DROP CONSTRAINT "FK_77f718c8630c5140506409841fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_subscription" DROP CONSTRAINT "FK_01f361d5959a46c93b141606240"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_confirm_code" DROP CONSTRAINT "FK_34b6de720754be96b5a370eef05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" DROP CONSTRAINT "FK_7170da49e8918cb5514bb57608e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson" DROP CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_viewed" DROP CONSTRAINT "FK_dd41e60b05062e1f5fe99201ebc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_viewed" DROP CONSTRAINT "FK_6c3d60b0556acbeb4249bd99ed3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_is_done" DROP CONSTRAINT "FK_3921597faf498587d342bdff721"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_is_done" DROP CONSTRAINT "FK_c2ded73cbd59fea65c0684f17a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_homework" DROP CONSTRAINT "FK_3458cfcc6ba5069763bb13f4a35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_result" DROP CONSTRAINT "FK_2505453f85fe0c0246a3a1e9d6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_result" DROP CONSTRAINT "FK_bcecd1a49806606595f6dcb6528"`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_question" DROP CONSTRAINT "FK_a19d8f1d5ceaa633ba4de770e5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_question" DROP CONSTRAINT "FK_92c44baf8552e41c1e4cef9202d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "test_variant" DROP CONSTRAINT "FK_df5d3cd50eb76f3acb8b6503a65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_is_done" DROP CONSTRAINT "FK_ba46e11273cb3802f3d08ae68c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_is_done" DROP CONSTRAINT "FK_0ff3adc428e7572335c1bf8978f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_answer_free" DROP CONSTRAINT "FK_f69756c2ebfccde71f48e749252"`,
    );
    await queryRunner.query(
      `ALTER TABLE "homework_answer_free" DROP CONSTRAINT "FK_2ece2f574cb3aa2087564efacc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_file" DROP CONSTRAINT "FK_ba6194860db206343b57e4745d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_lesson_time_code" DROP CONSTRAINT "FK_424d40d249dfcaa3fa60a238df5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_lesson_time_code" DROP CONSTRAINT "FK_e3d5c5fd910eba1e8f8d51bc21f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_course" DROP CONSTRAINT "FK_cda70411d682e090f46da85de1a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favourite_course" DROP CONSTRAINT "FK_38d44116d12634895c1e5ad4501"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_review" DROP CONSTRAINT "FK_9fac4258c1f8b81a63bc5fd46b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_review" DROP CONSTRAINT "FK_2e7d69883be0ff1c7849cf48152"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_purchase" DROP CONSTRAINT "FK_f1fa0a77f6f6e170121ed836318"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_purchase" DROP CONSTRAINT "FK_6b7102500a90e58a94f82d48f98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_level" DROP CONSTRAINT "FK_8c38fc72fb4d73495a21a42d079"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_de02d16582b8f768a0a9cf3cb00"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_9915d38573248ff94a6e1aa143c"`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "is_subscription_actual"`);
    await queryRunner.query(`DROP INDEX "IDX_a1c6070e31833de575acb26cc2"`);
    await queryRunner.query(`DROP INDEX "IDX_b861a12547b9dd7704573f886b"`);
    await queryRunner.query(`DROP TABLE "account_bought_courses_course"`);
    await queryRunner.query(`DROP TABLE "lesson_comment"`);
    await queryRunner.query(`DROP TABLE "lesson_comment_review"`);
    await queryRunner.query(`DROP TABLE "lesson_comment_answer"`);
    await queryRunner.query(`DROP TABLE "lesson_comment_answer_review"`);
    await queryRunner.query(`DROP TABLE "account_session"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "account_subscription"`);
    await queryRunner.query(`DROP TYPE "account_subscription_sub_type_enum"`);
    await queryRunner.query(`DROP TABLE "account_confirm_code"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "lesson"`);
    await queryRunner.query(`DROP TABLE "lesson_viewed"`);
    await queryRunner.query(`DROP TABLE "lesson_is_done"`);
    await queryRunner.query(`DROP TABLE "lesson_homework"`);
    await queryRunner.query(`DROP TYPE "lesson_homework_homework_type_enum"`);
    await queryRunner.query(`DROP TABLE "homework_result"`);
    await queryRunner.query(`DROP TYPE "homework_result_result_enum"`);
    await queryRunner.query(`DROP TABLE "homework_question"`);
    await queryRunner.query(`DROP TABLE "test_variant"`);
    await queryRunner.query(`DROP TABLE "homework_is_done"`);
    await queryRunner.query(`DROP TABLE "homework_answer_free"`);
    await queryRunner.query(`DROP TABLE "lesson_file"`);
    await queryRunner.query(`DROP TABLE "account_lesson_time_code"`);
    await queryRunner.query(`DROP TABLE "favourite_course"`);
    await queryRunner.query(`DROP TABLE "course_review"`);
    await queryRunner.query(`DROP TABLE "course_purchase"`);
    await queryRunner.query(`DROP TABLE "course_level"`);
    await queryRunner.query(`DROP TABLE "purchase"`);
  }
}
