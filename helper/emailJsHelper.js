export const sendEmailJs = (reciepient, subject, message, link, successCb) => Email.send({
    SecureToken: "af7ca7df-3d0f-4c1b-afae-df2ad9a4459c",
    To: reciepient,
    From: "rajib@itobuz.com",
    Subject: subject,
    Body: `<h4>${message}</h4><br/><em>${link}</em><br/><br/>Yours Truly,<br/><b>Flippy Ecom Services</b>`
}).then(
    (response) => {
        successCb();
    },
    (error) => { }
);