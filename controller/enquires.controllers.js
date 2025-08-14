const { default: mongoose } = require("mongoose");
const { successResponse, errorResponse } = require("../helper/response.helper");
const { inquiryMail, sendMailToSubscribers } = require("../mail/sendMail");
const { EnquiresSchema, NewsletterSchema } = require("./models_import");

const addenquires = async (req, res) => {
  try {
    const data = await EnquiresSchema.create(req.body);

    await inquiryMail(data);

    successResponse(res, "Sent Success");
  } catch (err) {
    console.log(err);
    errorResponse(err, "Sent Failed");
  }
};

const getenquires = async (req, res) => {
  try {
    let where = {};
    const result = await EnquiresSchema.aggregate([
      {
        $match: where,
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    successResponse(res, " ", result);
  } catch (err) {
    console.log(err);
  }
};

const getsinglnquires = async (req, res) => {
  try {
    const { _id } = JSON.parse(req.params.id);
    let where = {};
    if (_id) {
      where._id = new mongoose.Types.ObjectId(_id);
    }
    const resutl = await EnquiresSchema.aggregate([
      {
        $match: where,
      },
    ]);
    successResponse(res, "", resutl);
  } catch (err) {
    console.log(err);
  }
};

const addNewEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existing = await NewsletterSchema.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new NewsletterSchema({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendVouter = async (req, res) => {
  const { title, message, footer } = req.body;
  const file = req.file;
  try {
    if (!title || !message) {
      return res.status(400).json({ success: false, message: "Title and message are required." });
    }

    const subscribers = await NewsletterSchema.find().select("email -_id");

    if (!subscribers.length) {
      return res.status(400).json({ success: false, message: "No subscribers found." });
    }

    const attachments = file
      ? [
          {
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype,
          },
        ]
      : [];

    const batchSize = 50;
    const delayMs = 60 * 1000;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      await Promise.all(
        batch.map((subscriber) =>
          sendMailToSubscribers(subscriber.email, title, message, attachments, footer)
            .then(() => {
              console.log(`✅ Sent to ${subscriber.email}`);
            })
            .catch((err) => {
              console.error(`❌ Failed to send to ${subscriber.email}:`, err.message);
            })
        )
      );

      console.log(`✔️ Sent batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(subscribers.length / batchSize)}`);

      if (i + batchSize < subscribers.length) {
        console.log(`⏳ Waiting ${delayMs / 1000} seconds before next batch...`);
        await delay(delayMs);
      }
    }

    res.status(200).json({
      success: true,
      message: `✅ Emails sent to ${subscribers.length} subscribers with throttling.`,
      counts: subscribers.length,
    });
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    res.status(500).json({ success: false, message: "❌ Failed to send emails." });
  }
};

module.exports = {
  addenquires,
  getenquires,
  getsinglnquires,
  addNewEmail,
  sendVouter,
};
