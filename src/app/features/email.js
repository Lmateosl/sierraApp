import emailjs from '@emailjs/browser';

export const sendEmail = (template, templateParams) => {
    emailjs
      .send(process.env.REACT_APP_EMAILJS_SERVICEID, template, templateParams, {
        publicKey: process.env.REACT_APP_EMAILJS_USERID,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          return 1;
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
  };