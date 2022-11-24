// 'use strict'



// module.exports = {
//   /**
//    * Sends an email to the recipient in the body of the request
//    */
//   send: async (ctx) => {
//     const body = ctx.request.body
//     const sendTo = body.email
//     strapi.log.debug(`Trying to send an email to ${sendTo}`)

//     try {
//       const emailOptions = {
//         to: sendTo,
//         subject: 'Welcome To Ceca',
//         html: `<html>
//         <head></head>
//         <body style="background-color:#347AF0;">
//           <h1 style="color:white; text-align: center; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">Welcome to Ceca, ${user}! </h1>
//           <div>
//               <img style="float: left; margin-right: 2rem;"
//                 src="https://i.imgur.com/IKYDWxG.png"
//                 alt="Ceca"
//                 width="180"
//                 height="180"
//               /><br /><br /><br />
//               <p style="color:white; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">Good luck on your crypto journey!</p>
//           </div>
//         </body>
//       </html>`,
//       }
//       await strapi.plugins['email'].services.email.send(emailOptions)
//       strapi.log.debug(`Email sent to ${sendTo}`)
//       ctx.send({ message: 'Email sent' })
//     } catch (err) {
//       strapi.log.error(`Error sending email to ${sendTo}`, err)
//       ctx.send({ error: 'Error sending email' })
//     }
//   },
// }
async function Email(){
const emailTemplate = {
  subject: 'Welcome <%= user.firstname %>',
  text: `Welcome to mywebsite.fr!
    Your account is now linked with: <%= user.email %>.`,
  html: `<h1>Welcome to mywebsite.fr!</h1>
    <p>Your account is now linked with: <%= user.email %>.<p>`,
};

await strapi.plugins['email'].services.email.sendTemplatedEmail(
  {
    to: user.email,
    // from: is not specified, the defaultFrom is used.
  },
    emailTemplate,
  {
    user: {firstname: "Rick", email: "riccardo.pirrello@gmail.com"},
  }
);
}
 Email()
