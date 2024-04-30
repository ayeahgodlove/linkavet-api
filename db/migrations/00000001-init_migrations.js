'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "category", deps: []
 * createTable "subCategory", deps: []
 * createTable "tag", deps: []
 * createTable "user", deps: []
 * createTable "role", deps: []
 * createTable "store", deps: []
 * createTable "order", deps: []
 * createTable "user-role", deps: [user, role]
 * createTable "post", deps: [user, category]
 * createTable "document", deps: [user, category]
 * createTable "comment", deps: [user, post, comment]
 * createTable "postTag", deps: [post, tag]
 * createTable "documentTag", deps: [document, tag]
 * createTable "user_doc", deps: [user]
 * createTable "branch", deps: [store]
 * createTable "product", deps: [category]
 * createTable "user-store", deps: [user, store]
 * createTable "product_review", deps: [product, user]
 * createTable "banner", deps: [user]
 * createTable "payment", deps: [user]
 * createTable "productOrder", deps: [product, order]
 * createTable "course", deps: [user]
 * createTable "lesson", deps: [course, user]
 * createTable "enrollment", deps: [user, course]
 * createTable "quiz", deps: [lesson]
 * createTable "lesson_review", deps: [lesson, user]
 * createTable "appointment", deps: [user]
 * createTable "consultation", deps: [user]
 * createTable "review", deps: [user]
 * createTable "event", deps: [user]
 * createTable "specialty", deps: [user]
 *
 **/

const info = {
    "revision": 1,
    "name": "init-migrations",
    "created": "2024-04-30T21:48:41.977Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":1,"tables":{"category":{"tableName":"category","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"subCategory":{"tableName":"subCategory","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"tag":{"tableName":"tag","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user":{"tableName":"user","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"authStrategy":{"seqType":"Sequelize.STRING(10)","allowNull":false},"firstname":{"seqType":"Sequelize.STRING(50)","allowNull":true},"lastname":{"seqType":"Sequelize.STRING(50)","allowNull":true},"username":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"avatar":{"seqType":"Sequelize.STRING(255)","allowNull":true},"email":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"phoneNumber":{"seqType":"Sequelize.STRING(13)"},"city":{"seqType":"Sequelize.STRING(30)","allowNull":true},"country":{"seqType":"Sequelize.STRING(30)","allowNull":true},"address":{"seqType":"Sequelize.STRING(255)","allowNull":true},"password":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":true},"verified":{"seqType":"Sequelize.BOOLEAN"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"role":{"tableName":"role","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user-role":{"tableName":"user-role","schema":{"userId":{"seqType":"Sequelize.STRING(50)","unique":"user-role_roleId_userId_unique","primaryKey":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"roleId":{"seqType":"Sequelize.STRING(20)","unique":"user-role_roleId_userId_unique","primaryKey":true,"references":{"model":"role","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"post":{"tableName":"post","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(128)","allowNull":false},"summary":{"seqType":"Sequelize.STRING(255)","allowNull":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"content":{"seqType":"Sequelize.TEXT","allowNull":false},"imageUrl":{"seqType":"Sequelize.STRING(128)","allowNull":false},"publishedAt":{"seqType":"Sequelize.DATE"},"authorId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"categoryId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"tags":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"document":{"tableName":"document","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(128)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"fileUrl":{"seqType":"Sequelize.STRING(128)","allowNull":false},"uploadDate":{"seqType":"Sequelize.DATE","allowNull":false},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"categoryId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"comment":{"tableName":"comment","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"content":{"seqType":"Sequelize.TEXT","allowNull":false},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"postId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"post","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"publishedAt":{"seqType":"Sequelize.DATE"},"parent_id":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"comment","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"postTag":{"tableName":"postTag","schema":{"postId":{"seqType":"Sequelize.STRING(20)","primaryKey":true,"references":{"model":"post","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"tagId":{"seqType":"Sequelize.STRING(20)","primaryKey":true,"references":{"model":"tag","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"documentTag":{"tableName":"documentTag","schema":{"documentId":{"seqType":"Sequelize.STRING(20)","unique":"documentTag_documentId_tagId_unique","primaryKey":true,"references":{"model":"document","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"tagId":{"seqType":"Sequelize.STRING(20)","unique":"documentTag_documentId_tagId_unique","primaryKey":true,"references":{"model":"tag","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user_doc":{"tableName":"user_doc","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"scannedIdCard":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"scannedLiscence":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"branch":{"tableName":"branch","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"storeId":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"store","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"town":{"seqType":"Sequelize.STRING(128)","allowNull":false},"address":{"seqType":"Sequelize.STRING(255)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"store":{"tableName":"store","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"location":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":false},"imageBannerUrl":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"product":{"tableName":"product","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"categoryId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"amount":{"seqType":"Sequelize.DECIMAL","allowNull":false,"unique":false},"shortDescription":{"seqType":"Sequelize.TEXT","allowNull":false},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"qtty":{"seqType":"Sequelize.DECIMAL","allowNull":false},"productImages":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"tags":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user-store":{"tableName":"user-store","schema":{"userId":{"seqType":"Sequelize.STRING(50)","unique":"user-store_storeId_userId_unique","primaryKey":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"storeId":{"seqType":"Sequelize.STRING(20)","unique":"user-store_storeId_userId_unique","primaryKey":true,"references":{"model":"store","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"product_review":{"tableName":"product_review","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"productId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"comment":{"seqType":"Sequelize.TEXT","allowNull":false},"rating":{"seqType":"Sequelize.INTEGER","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"banner":{"tableName":"banner","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"subTitle":{"seqType":"Sequelize.TEXT","allowNull":false},"image":{"seqType":"Sequelize.STRING(255)","allowNull":false},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"order":{"tableName":"order","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":true},"totalQtty":{"seqType":"Sequelize.INTEGER","allowNull":false},"discount":{"seqType":"Sequelize.INTEGER"},"totalAmount":{"seqType":"Sequelize.DECIMAL","allowNull":false},"orderNo":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"username":{"seqType":"Sequelize.STRING(255)","allowNull":false},"address":{"seqType":"Sequelize.STRING(255)","allowNull":false},"email":{"seqType":"Sequelize.STRING(255)","allowNull":false},"cellPhone":{"seqType":"Sequelize.STRING(255)","allowNull":false},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"payment":{"tableName":"payment","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"orderNo":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"amount":{"seqType":"Sequelize.DECIMAL","allowNull":false},"address":{"seqType":"Sequelize.STRING(255)","allowNull":false},"email":{"seqType":"Sequelize.STRING(255)","allowNull":false},"cellPhone":{"seqType":"Sequelize.STRING(255)","allowNull":false},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"productOrder":{"tableName":"productOrder","schema":{"productId":{"seqType":"Sequelize.STRING(20)","unique":"productOrder_orderId_productId_unique","primaryKey":true,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"orderId":{"seqType":"Sequelize.STRING(50)","unique":"productOrder_orderId_productId_unique","primaryKey":true,"references":{"model":"order","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"qtty":{"seqType":"Sequelize.INTEGER","allowNull":false},"amount":{"seqType":"Sequelize.DECIMAL","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"course":{"tableName":"course","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"price":{"seqType":"Sequelize.DECIMAL"},"courseImage":{"seqType":"Sequelize.STRING(255)","allowNull":false},"authorId":{"seqType":"Sequelize.STRING(20)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"startDate":{"seqType":"Sequelize.DATE","allowNull":false},"completionDate":{"seqType":"Sequelize.DATE","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"lesson":{"tableName":"lesson","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"url":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":false},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"content":{"seqType":"Sequelize.TEXT","allowNull":false},"duration":{"seqType":"Sequelize.INTEGER","allowNull":false},"difficulty":{"seqType":"Sequelize.STRING(50)","allowNull":false},"prerequisites":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"objectives":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"keywords":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"author":{"seqType":"Sequelize.STRING(20)","allowNull":false},"category":{"seqType":"Sequelize.STRING(20)","allowNull":true},"language":{"seqType":"Sequelize.STRING(50)","allowNull":true},"targetAudience":{"seqType":"Sequelize.STRING(255)","allowNull":true},"rating":{"seqType":"Sequelize.INTEGER","allowNull":true},"authorId":{"seqType":"Sequelize.STRING(128)","allowNull":false},"courseId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"course","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"enrollment":{"tableName":"enrollment","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"enrollmentDate":{"seqType":"Sequelize.DATE","allowNull":false},"completionDate":{"seqType":"Sequelize.DATE","allowNull":false},"userId":{"seqType":"Sequelize.STRING(20)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"courseId":{"seqType":"Sequelize.STRING(20)","allowNull":false,"references":{"model":"course","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"quiz":{"tableName":"quiz","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"question":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"answers":{"seqType":"Sequelize.ARRAY(Sequelize.STRING)","allowNull":false},"correctAnswerIndex":{"seqType":"Sequelize.INTEGER","allowNull":false},"lessonId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"lesson","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"lesson_review":{"tableName":"lesson_review","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"lessonId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"lesson","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"comment":{"seqType":"Sequelize.TEXT","allowNull":false},"rating":{"seqType":"Sequelize.INTEGER","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"appointment":{"tableName":"appointment","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"doctorId":{"seqType":"Sequelize.STRING(128)","allowNull":false},"appointmentDate":{"seqType":"Sequelize.DATE"},"appointmentTime":{"seqType":"Sequelize.DATE"},"isConfirmed":{"seqType":"Sequelize.BOOLEAN"},"fullName":{"seqType":"Sequelize.STRING(255)","allowNull":false},"email":{"seqType":"Sequelize.STRING(255)","allowNull":false},"contact":{"seqType":"Sequelize.STRING(128)","allowNull":false},"status":{"seqType":"Sequelize.ENUM(\'APPROVED\', \'PENDING\', \'CANCELED\')","allowNull":false},"symptoms":{"seqType":"Sequelize.TEXT","allowNull":false},"roomId":{"seqType":"Sequelize.STRING(255)","allowNull":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"consultation":{"tableName":"consultation","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"startDate":{"seqType":"Sequelize.DATE"},"endDate":{"seqType":"Sequelize.DATE"},"diagnosis":{"seqType":"Sequelize.STRING"},"petOwnerId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"vetDoctorId":{"seqType":"Sequelize.STRING(128)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"review":{"tableName":"review","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"},"comment":{"seqType":"Sequelize.TEXT","allowNull":false},"rating":{"seqType":"Sequelize.INTEGER","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"event":{"tableName":"event","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":true},"start":{"seqType":"Sequelize.DATE"},"end":{"seqType":"Sequelize.DATE"},"allDay":{"seqType":"Sequelize.BOOLEAN"},"display":{"seqType":"Sequelize.STRING(50)"},"extendedProps":{"seqType":"Sequelize.JSONB"},"userId":{"seqType":"Sequelize.STRING(128)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"specialty":{"tableName":"specialty","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"fullname":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":false},"specialty":{"seqType":"Sequelize.STRING(255)","allowNull":false,"unique":false},"facebook":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":false},"title":{"seqType":"Sequelize.STRING(20)","allowNull":true,"unique":false},"website":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":false},"twitter":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":false},"linkedin":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "category",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "subCategory",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "tag",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "user",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "authStrategy": {
                    "allowNull": false,
                    "type": Sequelize.STRING(10)
                },
                "firstname": {
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                },
                "lastname": {
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                },
                "username": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "avatar": {
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "email": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "phoneNumber": {
                    "type": Sequelize.STRING(13)
                },
                "city": {
                    "allowNull": true,
                    "type": Sequelize.STRING(30)
                },
                "country": {
                    "allowNull": true,
                    "type": Sequelize.STRING(30)
                },
                "address": {
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "password": {
                    "unique": true,
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "verified": {
                    "type": Sequelize.BOOLEAN
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "role",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "store",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "userId": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "location": {
                    "unique": false,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "imageBannerUrl": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "order",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                },
                "totalQtty": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "discount": {
                    "type": Sequelize.INTEGER
                },
                "totalAmount": {
                    "allowNull": false,
                    "type": Sequelize.DECIMAL
                },
                "orderNo": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "username": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "address": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "email": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "cellPhone": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.STRING(10)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "user-role",
            {
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "user-role_roleId_userId_unique",
                    "type": Sequelize.STRING(50)
                },
                "roleId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "role",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "user-role_roleId_userId_unique",
                    "type": Sequelize.STRING(20)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "post",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "summary": {
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "content": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "imageUrl": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "publishedAt": {
                    "type": Sequelize.DATE
                },
                "authorId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "category",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "tags": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "document",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "fileUrl": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "uploadDate": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "category",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "comment",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "content": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "postId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "post",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "publishedAt": {
                    "type": Sequelize.DATE
                },
                "parent_id": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "comment",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "postTag",
            {
                "postId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "post",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "type": Sequelize.STRING(20)
                },
                "tagId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "tag",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "type": Sequelize.STRING(20)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "documentTag",
            {
                "documentId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "document",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "documentTag_documentId_tagId_unique",
                    "type": Sequelize.STRING(20)
                },
                "tagId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "tag",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "documentTag_documentId_tagId_unique",
                    "type": Sequelize.STRING(20)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "user_doc",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "scannedIdCard": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "scannedLiscence": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "branch",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "storeId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "store",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "town": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "address": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "product",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "category",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "amount": {
                    "unique": false,
                    "allowNull": false,
                    "type": Sequelize.DECIMAL
                },
                "shortDescription": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "qtty": {
                    "allowNull": false,
                    "type": Sequelize.DECIMAL
                },
                "productImages": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "tags": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "user-store",
            {
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "user-store_storeId_userId_unique",
                    "type": Sequelize.STRING(50)
                },
                "storeId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "store",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "user-store_storeId_userId_unique",
                    "type": Sequelize.STRING(20)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "product_review",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "productId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "product",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "comment": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "rating": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "banner",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "subTitle": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "image": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "payment",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                },
                "orderNo": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "amount": {
                    "allowNull": false,
                    "type": Sequelize.DECIMAL
                },
                "address": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "email": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "cellPhone": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.STRING(10)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "productOrder",
            {
                "productId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "product",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "productOrder_orderId_productId_unique",
                    "type": Sequelize.STRING(20)
                },
                "orderId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "order",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "productOrder_orderId_productId_unique",
                    "type": Sequelize.STRING(50)
                },
                "qtty": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "amount": {
                    "allowNull": false,
                    "type": Sequelize.DECIMAL
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "course",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "price": {
                    "type": Sequelize.DECIMAL
                },
                "courseImage": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "authorId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "startDate": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "completionDate": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "lesson",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "url": {
                    "unique": false,
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "content": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "duration": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "difficulty": {
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "prerequisites": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "objectives": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "keywords": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "author": {
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "category": {
                    "allowNull": true,
                    "type": Sequelize.STRING(20)
                },
                "language": {
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                },
                "targetAudience": {
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "rating": {
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "authorId": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "courseId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "course",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "enrollment",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "enrollmentDate": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "completionDate": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "courseId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "course",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "quiz",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "question": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "answers": {
                    "allowNull": false,
                    "type": Sequelize.ARRAY(Sequelize.STRING)
                },
                "correctAnswerIndex": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "lessonId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "lesson",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "lesson_review",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "lessonId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "lesson",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "comment": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "rating": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "appointment",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "doctorId": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "appointmentDate": {
                    "type": Sequelize.DATE
                },
                "appointmentTime": {
                    "type": Sequelize.DATE
                },
                "isConfirmed": {
                    "type": Sequelize.BOOLEAN
                },
                "fullName": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "email": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "contact": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.ENUM('APPROVED', 'PENDING', 'CANCELED')
                },
                "symptoms": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "roomId": {
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "consultation",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "startDate": {
                    "type": Sequelize.DATE
                },
                "endDate": {
                    "type": Sequelize.DATE
                },
                "diagnosis": {
                    "type": Sequelize.STRING
                },
                "petOwnerId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "vetDoctorId": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "review",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING(50)
                },
                "comment": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "rating": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "event",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "start": {
                    "type": Sequelize.DATE
                },
                "end": {
                    "type": Sequelize.DATE
                },
                "allDay": {
                    "type": Sequelize.BOOLEAN
                },
                "display": {
                    "type": Sequelize.STRING(50)
                },
                "extendedProps": {
                    "type": Sequelize.JSONB
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "specialty",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "fullname": {
                    "unique": false,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "specialty": {
                    "unique": false,
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "facebook": {
                    "unique": false,
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "title": {
                    "unique": false,
                    "allowNull": true,
                    "type": Sequelize.STRING(20)
                },
                "website": {
                    "unique": false,
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "twitter": {
                    "unique": false,
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "linkedin": {
                    "unique": false,
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "dropTable",
        params: ["user-role"]
    },
    {
        fn: "dropTable",
        params: ["post"]
    },
    {
        fn: "dropTable",
        params: ["document"]
    },
    {
        fn: "dropTable",
        params: ["comment"]
    },
    {
        fn: "dropTable",
        params: ["postTag"]
    },
    {
        fn: "dropTable",
        params: ["documentTag"]
    },
    {
        fn: "dropTable",
        params: ["user_doc"]
    },
    {
        fn: "dropTable",
        params: ["branch"]
    },
    {
        fn: "dropTable",
        params: ["product"]
    },
    {
        fn: "dropTable",
        params: ["user-store"]
    },
    {
        fn: "dropTable",
        params: ["product_review"]
    },
    {
        fn: "dropTable",
        params: ["banner"]
    },
    {
        fn: "dropTable",
        params: ["payment"]
    },
    {
        fn: "dropTable",
        params: ["productOrder"]
    },
    {
        fn: "dropTable",
        params: ["course"]
    },
    {
        fn: "dropTable",
        params: ["lesson"]
    },
    {
        fn: "dropTable",
        params: ["enrollment"]
    },
    {
        fn: "dropTable",
        params: ["quiz"]
    },
    {
        fn: "dropTable",
        params: ["lesson_review"]
    },
    {
        fn: "dropTable",
        params: ["appointment"]
    },
    {
        fn: "dropTable",
        params: ["consultation"]
    },
    {
        fn: "dropTable",
        params: ["review"]
    },
    {
        fn: "dropTable",
        params: ["event"]
    },
    {
        fn: "dropTable",
        params: ["specialty"]
    },
    {
        fn: "dropTable",
        params: ["category"]
    },
    {
        fn: "dropTable",
        params: ["subCategory"]
    },
    {
        fn: "dropTable",
        params: ["tag"]
    },
    {
        fn: "dropTable",
        params: ["user"]
    },
    {
        fn: "dropTable",
        params: ["role"]
    },
    {
        fn: "dropTable",
        params: ["store"]
    },
    {
        fn: "dropTable",
        params: ["order"]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
