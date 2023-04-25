const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();
const express = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');
const project_id = 'y--cllo';
const languageCode = 'zh-TW';
// TODO: Set the `credentials` value to your GCP service account JSON key object
const credentials = {
    type: "service_account",
    project_id: "y--cllo",
    private_key_id: "1e684d4d398edd001de3c64d230178ac2c450476",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxEDy6EWQCrPBu\nBYWCfeMrAzZb6h3mgqFN16GM7WIxhJ2VfPgM3+66mKZYgUMCsqoj1qc42rm30Zta\nfkVVX9SY8Vu74PvRgAYm1zL8fYA+RrhXYH2MrtvFDA6RcYktdZcQNxeaJNBZ1duT\nZFmAqdcXuVW7O2narfT44MhKox0MQn0Cdu/SR8dlSDt8VZrv4iuz8ihefICa4UEh\nqztIcVOgIm2hyQt5+oQs53Cr1czAVkTVv78UraDLwEOab8lzSWUbYGEoHJGF/DG5\nnzO7cvaoE4J1rtmAuzN7uv0Z7nri85SOHtKyuh/Cfw1T3Ev5UALLaddDvUamocmx\nJTzkAWdnAgMBAAECggEABvNAtvsMxnAcZe0wju07GAqhvRzk/JHfHAudS0dcJd5z\nQxVrNTIrEEcCrJGyXC5AMHTyDnDDfnwrUXOIbC/9S92ZgLf1moUgeLDUzwVsHcWv\n4bonY3jPpp3xCnN+83pcqiXHduUACq6y1kfHnZ3NFCDRxS4xWwSeC5DjO87ISp1W\nwuJW0SHklR8hgpx2Csyn0b8DfsM62wdkAA8x4p5PvoMb/+AshJuJReSelgyTJ6Qq\nqM/0egFzfpnpU8J3go3yvJHLlSf/sKxHdtS3YPYem60Lqmlqi0eElpzsJlo1urpD\nnERHYAf6zeVe8hk7gOoVk1NngBqA6LZ1VztGEdsdgQKBgQDkCzTNYcD5GLlcghp/\nSM0fCJLae5JHmS30Aha1wkvCBe271LEh6iteLOFx4eTUrgOP7mh0hsr4q3T2iPkE\nMi7tFpH+Pf+EIpIXwmwpcUVcfwXDOP6HF8e0P373j/cGsLPEITY+sCcXb36ct6uV\nmS02bRT3WewaLN3vFbrmtzFAgQKBgQDGxRfe7A1tUjWLQxP71P0BSOtyIbxVvY75\nyQiCwZY7fY9zQg4SL2ykMOVB2DSeSdHnzqZtCi+IBxOhSjUdOP9FwyxpfL1JB6pf\ntsu5RIGJEHVbYQDVTSF8VhtnlS0Iui+oxBgIQuy2Cddn9JdAYxAXNkd1Ikp668WK\nVIAM63az5wKBgGGkPraV3YeKw4tNlcTcSh+4jxCHiomnl9p7rneiusdXvIQJPNLV\nrj4Dn4Aghddert3I6ebC9FNnLoyE94KJbjhLyrT+nNJZ7w3HTIKuIlHJfZEqbSkw\n0GxoJ5geh1nQ/RfEVLKgwAwzzBWUOx6x2H8OU8TZNtO6VEiTmFRDKg6BAoGAPVUH\nfpObuQXK28PA4M3hm4nijH74XAR3n392jtIpBwZBQzE4okfb3/XuZ5jM86KXkE1l\ncPPZosF8PyJkrTWvHtmQVKRWy7f/zDTdO7d1uNNJQv71gNuh33m6TwXqtWyt1Add\n2v67h5gVzU/dc9KdXmwzNGN2U+N4OqzELjhhkjUCgYAssFHP4nbnNfsoUagINwML\nlcBxWiYxrbWdWNHCrai0EQYFSAG/fEDhkUweunRXVUw+Kh+rHe77/3c8KBc2doky\nb56xzMFNXqP1H/B7d5/3BZJrD8XB5TrEM60o7oF9rmxWIFfUHvDmSbQxyqaPMWhc\nhzYLvyWUsRbHRVOlWfTwgQ==\n-----END PRIVATE KEY-----\n",
    client_email: "mrt-33@y--cllo.iam.gserviceaccount.com",
    client_id: "118411261575758306117",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/mrt-33%40y--cllo.iam.gserviceaccount.com"
  }
  ;

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient({ credentials });

// The rest of your code here

const detectIntent = async (languageCode, queryText, sessionId) => {

    let sessionPath = sessionClient.projectAgentSessionPath(project_id, sessionId);

    // The text query request.
    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: queryText,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log(responses);
    const result = responses[0].queryResult;
    console.log(result);

    return {
        response: result.fulfillmentText
    };
}

detectIntent('zh-TW','到雙連要買多少錢的票呢','123');

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(express.urlencoded({
    extended: true
}));
webApp.use(express.json());

// Server Port
const PORT = process.env.PORT || 5000;

// Home route
webApp.get('/', (req, res) => {
    res.send(`Hello World.!`);
});

// Dialogflow route
webApp.post('/dialogflow', async (req, res) => {

    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;
    let responseData = await detectIntent(languageCode, queryText, sessionId);

    res.send(responseData);
});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
