const { CLIENT_ORIGIN } = require('../config/info');

module.exports = {

  confirm: id => ({
    subject: 'Rapid Assessment Confirm Email',
    html: `
      <a href='${CLIENT_ORIGIN}/confirm/${id}'>
        click to confirm email
      </a>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })

}