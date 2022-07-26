const mail = (req, res) => {
  const email_user = process.env.EMAIL_USER
  const email_pass = process.env.EMAIL_PASS
  
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: email_user,
      pass: email_pass,
    },
    secure: true,
  })

  const messageData = {
    from: email_user,
    to: 'ryannmagdaleno@icloud.com',
    subject: `New Message from ${req.body.name} RE: ${req.body.formatSubject}`,
    text: `${req.body.message}`,
    html: `<div>${req.body.message}</div>`
  }

  transporter.sendMail(messageData, function (err, info) {
    if (err) {
      res.json({
        status: err
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })

  res.status(200)
}

export default mail