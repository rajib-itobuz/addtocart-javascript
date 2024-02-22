export const sendEmail = (
  templateId,
  recepient,
  subj,
  body,
  link,
  successCb
) => {
  return emailjs
    .send("service_m51wl4j", templateId, {
      email: recepient,
      name: "flippy",
      subject: subj,
      link: link,
      message: body,
    })
    .then(
      (response) => {
        successCb();
      },
      (error) => {
        console.log(error);
      }
    );
};
