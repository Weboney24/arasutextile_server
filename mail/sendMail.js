const nodemailer = require("nodemailer");
const { TemplateHelper } = require("./templateHelper");

const transporter = nodemailer.createTransport({
  host: "mail.weboney.in",
  secure: true,
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  logger: true,
  debug: true,
});

const sendMail = async (values) => {
  try {
    const result = await transporter.sendMail({
      from: "manikandan@weboney.in",
      to: values.email,
      subject: TemplateHelper(values)?.subject,
      html: TemplateHelper(values)?.templete,
    });

    return true;
  } catch (err) {
    console.log(err);
  }
};

const inquiryMail = async (values) => {
  try {
    const result = await transporter.sendMail({
      from: `"${values.name}" <${values.email}>`,
      to: "vijayan@sriarasutex.in",
      subject: `New Enquiry from ${values.name}, ${values.subject}`,
      html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #007BFF, #0056b3); padding: 15px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 22px;">📩 New Enquiry Received</h2>
      </div>
      
      <!-- Body -->
      <div style="padding: 20px; color: #333333; line-height: 1.6;">
        <p style="margin-bottom: 10px;"><strong>Name:</strong> ${values.name}</p>
        <p style="margin-bottom: 10px;"><strong>Email:</strong> ${values.email}</p>
        <p style="margin-bottom: 10px;"><strong>Phone:</strong> ${values.phone}</p>
        <p style="margin-bottom: 10px;"><strong>Company:</strong> ${values.company}</p>
        <p style="margin-bottom: 10px;"><strong>Message:</strong><br>${values.message}</p>
      </div>
      
      <!-- Footer -->
      <div style="background: #f8f9fa; padding: 12px; text-align: center; font-size: 13px; color: #666;">
        Thank you for reaching out! Our team will get back to you shortly.
      </div>
    </div>
  </div>
`,
    });
  } catch (err) {
    console.log("Error sending email:", err);
  }
};

const orderMail = async (values) => {
  try {
    const { subject, template } = TemplateHelper({ ...values, target: "placed order" });

    const result = await transporter.sendMail({
      from: "mlcreation806r@gmail.com",
      to: values?.delivery_address?.email,
      subject,
      html: template,
    });

    console.log("Email Sent:", result);
  } catch (err) {
    console.error("Error Sending Email:", err);
  }
};

const orderStatusMail = async (values) => {
  try {
    const { subject, template } = TemplateHelper({ ...values, target: "order status" });

    const result = await transporter.sendMail({
      from: "mlcreation806r@gmail.com",
      to: values?.delivery_address?.email,
      subject,
      html: template,
    });
  } catch (err) {
    console.log(err);
  }
};

const sendMailToSubscribers = async (email, title, message, attachments = [], footer) => {
  let imageAttachment = attachments.find((att) => att.filename?.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/));
  let pdfAttachment = attachments.find((att) => att.filename?.toLowerCase().endsWith(".pdf"));

  let pdfButtonHTML = pdfAttachment
    ? `
      <div style="margin-top: 20px; text-align: center;">
        <a href="cid:${pdfAttachment.cid || "mainPdf"}" style="display: inline-block; background-color: #994552; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
          📄 Download PDF
        </a>
      </div>
    `
    : "";

  const htmlContent = `
  <div style="background-color: #f4bcc4; padding: 40px; font-family: 'Segoe UI', sans-serif;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #994552, #b86574); color: #fff; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">${title}</h1>
      </div>

      <!-- Image -->
      ${
        imageAttachment
          ? `
      <div style="text-align:center; padding: 20px;">
        <img src="cid:${imageAttachment.cid || "mainImage"}" alt="Newsletter Image" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
      </div>`
          : ""
      }

      <!-- Body -->
      <div style="padding: 35px 30px; color: #444; line-height: 1.8; font-size: 16px;">
        <p style="margin-top: 0; white-space: pre-line;">${message}</p>
        ${pdfButtonHTML}
      </div>

      <!-- Divider -->
      <div style="height: 1px; background-color: #f4bcc4;"></div>

      <!-- Footer -->
      <div style="padding: 20px; text-align: center; background-color: #fff8f9;">
        <p style="margin: 0; font-size: 13px; color: #994552;">${footer || "Arasu Textile, Karur"}</p>
      </div>
    </div>
  </div>
`;

  // Ensure image & PDF have cid for embedding
  let finalAttachments = attachments.map((att) => {
    if (!att.cid && (att.filename?.match(/\.(jpg|jpeg|png|gif)$/) || att.filename?.endsWith(".pdf"))) {
      att.cid = att.filename.toLowerCase().endsWith(".pdf") ? "mainPdf" : "mainImage";
    }
    return att;
  });

  const mailOptions = {
    from: '"Arasu Textile" <manikandan@weboney.in>',
    to: email,
    subject: title,
    html: htmlContent,
    attachments: finalAttachments,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail, inquiryMail, orderMail, orderStatusMail, sendMailToSubscribers };
