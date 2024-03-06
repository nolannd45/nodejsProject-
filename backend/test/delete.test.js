// import supertest from "supertest";
// import { app } from "../index.js";
// import mock from "mock-fs";
// import nock from "nock";
// describe("DELETE /", function () {

//     // it("Delete Ticket => code 200", function (done) {
//     //     var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4";
        
//     //     mock({
//     //         '/ticket/delete/65e8702239160be39d0bb2e1': {} // Création d'un fichier factice
//     //     });

//     //     supertest(app)
//     //         .delete("/ticket/delete/65e8702239160be39d0bb2e1")
//     //         .set('Authorization', 'Bearer ' + tokenTest)
//     //         .expect(200)
//     //         .end(function (err, res) {
//     //             if (err) done(err);
//     //             done();
//     //         });
//     // });
//     it("Delete Ticket => code 200", function (done) {
//         var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4";

//         // Définir l'URL à laquelle la requête DELETE est adressée
//         const deleteUrl = '/ticket/delete/65e87729f33225e0a1d81999';

//         // Interception de la demande DELETE et simulation de la réponse
//         nock('http://localhost:3001')
//             .intercept(deleteUrl, 'DELETE')
//             .reply(200, { success: true });

//         supertest(app)
//             .delete(deleteUrl)
//             .set('Authorization', 'Bearer ' + tokenTest)
//             .expect(200)
//             .end(function (err, res) {
//                 if (err) done(err);
//                 done();
//             });
//     });
// });

