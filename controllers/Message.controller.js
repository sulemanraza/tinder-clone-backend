const User = require("../models/User.model");
const Message = require("../models/Message.model");

exports.addMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const messageMatch = await Message.findOne({ senderId, receiverId });

    // if not both user chat exist in database
    if (!messageMatch) {
      const addMessage = new Message({
        senderId,
        receiverId,
        messages: [
          {
            message,
            timestamps: new Date().toISOString(),
          },
        ],
      });
      await addMessage.save();
      return res.status(200).json(addMessage);
    }

    // if both user chat exist in database
    messageMatch.messages.push({
      message,
      timestamps: new Date().toISOString(),
    });
    await messageMatch.save();

    return res.status(200).json(messageMatch);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getMessage = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const message = await Message.find({ senderId, receiverId });
    // .populate({ path: "senderId", select: "firstName photos" })
    // .exec();
    if (!message) return res.status(404).json({ message: "not have message" });

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateMessage = async () => {};
