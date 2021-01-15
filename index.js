const axios = require("axios");
const authorizationToken = process.env.authorizationToken;
exports.handler = (event, context, callback) => {
    return axios
        .post(
            "https://konfhub.jetbrains.space/api/http/chats/messages/send-message",
            {
                recipient: {
                    className: "MessageRecipient.Member",
                    member: "username:Srushith"
                },
                content: {
                    className: "ChatMessage.Block",
                    style: "ERROR",
                    outline: { icon: { icon: "bug" }, text: "Error Alert" },
                    sections: [
                        {
                            className: "MessageSection",
                            header: `Internal Server Error in ${event.moduleName} Lambda`,
                            elements: [],
                            footer: `Error: ${event.apiPath} \nDetails: ${event.stackTrace}`
                        }
                    ]
                }
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                }
            }
        )
        .then((response) => {
            console.log(response);
            return {
                statusCode: 200,
                message: "Message triggered successfully"
            };
        })
        .catch((error) => {
            console.log(error);
        });
};
