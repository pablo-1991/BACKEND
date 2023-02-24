import { messagesModel } from "../models/messages.model.js";


export default class ChatManager {

    async saveMessage(message) {
        try {
            const SaveMessage = await messagesModel.create(message);
            return "Mensaje guardado correctamente";
        }
        catch (error) {
            return error;
        }
    }

    async getMessages() {
        try {
            const GetMessage = await messagesModel.find();
            return GetMessage;
        } catch (error) {
            return error;
        }
    }
}