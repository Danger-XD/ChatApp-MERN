import { getMessageService, sendMessageService } from "../services/messages.service.js";

export const sendMessage = async (req, res) => {
  let result = await sendMessageService(req, res);
  res.status(200).json(result);
};
export const getMessage = async (req, res) => {
    let result = await getMessageService(req, res);
    res.status(200).json(result);
  };
