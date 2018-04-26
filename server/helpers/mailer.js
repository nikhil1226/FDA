import nodemailer from 'nodemailer';

const options = {
  host: 'mail.novartis.com',
  port: 25,
  secure: false,
  tls: {
    rejectedUnauthorized: false
  }
};

const transporter = nodemailer.createTransport(options);

function getMailTemplate(details) {
  // console.log('getMailTemplate', details);
  let rootFolder = './public';
  if (__dirname.substr(__dirname.length - 13) === '\\dist\\helpers') {
    rootFolder = '../public';
  }

  let content = '';
  let mailSubject = '';
  if (details.isGlobalRole) {
    mailSubject = `EQARP  Notification: ${details.statusName} ${details.role} for ${details.recordId}`;
    content = `Greetings<br/><br/>
    User <b>${details.actionUser}</b> ${details.statusName} <b>${details.roleUser}</b> as ${details.role} for <b>${details.recordId}</b> with below comments<br/><br/>
    Comments  : ${details.commentsbyUser}<br/><br/>`;
  } else {
    mailSubject = `EQARP  Notification: Status changed for ${details.recordId} To ${details.statusName}`;
    content = `Greetings<br/><br/>
    User <b>${details.regards}</b> changed status of <b>${details.recordId}</b> to <b>${details.statusName}</b> with below comments<br/><br/>
    Comments  : ${details.commentsbyUser}<br/><br/>`;
  }
  return {
    from: 'EQARP.Support_ORG_GBL_GBL@dl.mgd.novartis.com',
    to: details.to,
    cc: details.cc,
    subject: mailSubject,
    html: `<p><img src="cid:GitmcBitss@novartis.com" alt="novartis_Logo"/><br/><br/>
    <b>This is an automatically generated notification to inform you about the following :</b><br/><br/>
    ${content}
    <br/><br/>
    Best Regards,<br/>
    EQARP Support Team</p>`,
    attachments: [{
      filename: 'logo.png',
      path: `${rootFolder}/logo.png`,
      cid: 'GitmcBitss@novartis.com'
    }]
  };
}
export function sendTonodemailer(message) {
  return new Promise((resolve, reject) => {
    const lcMessage = { ...message, ...getMailTemplate(message) };
    transporter.sendMail(lcMessage, (error, info) => {
      if (error || !info) {
        reject(error.message);
        console.log('sendTonodemailer --- Error', error.message);
        return;
      }
      resolve(info.response);
    });
  });
}

export function sendTestmail() {
  return new Promise((resolve, reject) => {
    let rootFolder = './public';
    if (__dirname.substr(__dirname.length - 13) === '\\dist\\helpers') {
      rootFolder = '../public';
    }
    const toUsers = ['saravanamuthu.jayaraj@novartis.com'];
    const ccUsers = ['ashwin.sadanandan@novartis.com'];
    const lcMessage = {
      from: 'EQARP.Support_ORG_GBL_GBL@dl.mgd.novartis.com',
      to: toUsers,
      cc: ccUsers,
      subject: 'EQARP  Notification : Status changed for < Record ID > To < Changed Status >',
      html: '<p><img src="cid:GitmcBitss@novartis.com" alt="novartis_Logo"/><br/><br/><b>This is an automatically generated notification to inform you about the following :</b><br/><br/>Greetings<br/><br/>User <b>Aswin</b> changed status of <b>< Record ID ></b> to <b>< Changed Status ></b> with below comments<br/><br/>Comments  : <br/><br/><br/><br/>      Best Regards,<br/>EQARP Support Team</p>',
      attachments: [{
        filename: 'logo.png',
        path: `${rootFolder}/logo.png`,
        cid: 'GitmcBitss@novartis.com'
      }]
    };
    transporter.sendMail(lcMessage, (error, info) => {
      if (error || !info) {
        reject(error.message);
        return;
      }
      resolve(info.response);
    });
  });
}
