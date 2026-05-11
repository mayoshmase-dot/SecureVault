
// import { passwordAnalyzer } from "./PasswordAnalyzer";

// export const auditVault = (credentials = []) => {

//   if (!credentials.length) {
//     return {
//       total: 0,
//       strong: 0,
//       weak: 0,
//       reused: 0
//     };
//   }

//   const passwordMap = {};

//   let strong = 0;
//   let weak = 0;
//   let reused = 0;

//   credentials.forEach((cred) => {

//     const password = String(cred.password || "").trim();

//     if (!password) return;

//     passwordMap[password] =
//       (passwordMap[password] || 0) + 1;
//   });

//   // analyze
//   credentials.forEach((cred) => {

//     const password = String(cred.password || "").trim();

//     if (!password) return;

//     const analysis = passwordAnalyzer(password);

//     const isReused =
//       passwordMap[password] > 1;

//     if (isReused) {
//       reused++;
//     }

//     if (analysis.isStrong && !isReused) {
//       strong++;
//     }

//     if (!analysis.isStrong) {
//       weak++;
//     }

//   });

//   return {
//     total: credentials.length,
//     strong,
//     weak,
//     reused
//   };
// };