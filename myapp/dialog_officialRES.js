const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();
const express = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');
const project_id = 't-1-1-y9pi';
const languageCode = 'zh-TW';
// TODO: Set the `credentials` value to your GCP service account JSON key object
const credentials = {
  type: 'service_account',
  project_id: 't-1-1-y9pi',
  private_key_id: 'ab2f7222ee05f29b2ddddcd20a13adf1e7164ccf',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD1WM+dLPIRV+au\nqdS2248udZAoX+UhWzLa/8Vofs1tD22kdQjP6kjCIzcKyaES1V21v5TM0yxYgDq+\nMs37Udfw9ZrocksoHWNjcVj/KWT5XJszsnSnbWVnPLlcBHVAhiS0gegMF1p5/mX0\nKM+v1gXqFjzZKc4nQg5fG6iHKLgJDeOMtRMciXXKCqiRVLynQsMMZK3KHFu2vG4f\nYrpxDYj/MOGvJjqGvdhMLpJ0MEnlxtpZOZ2KX8RPzN/7eEsk4h6Ov+ncpyXA7KI+\npLzomvjLi/yQwDpyRNWWOMXURSfpBt0JKLdv53cdX3chZSPMoINNH0HgrewyCkpp\neTTWr99TAgMBAAECggEAB42D2qlTDGCh29ejkjuBFWOOHAgTtCqsDpzYFWbt6QEU\nFX961Xe3ZK6T17OsTzmdSGaM7J9FmrXb2RYUTDvRQ3w0GBrIoIQDFsEbBcPe9WQ5\n7OX9/Fd8SyjN5fzHJUTb5WioXZLseJvxxInrFtUmWnXzypWkYIYCjj/6OKryu2iQ\nHg4IztdOpywYjanzfztzRnkJlH1zKB4XXkO8HU+ELnz1GiYDYJDQkY1AdWXgGvrz\nG8zDrOsd0uV1+e0GTpsjcoOLAwtvScRf97foa0dTuSso2+RGCQMvfUeUZJmqqZLS\nikHKB1QQMmKUAN3G45NR/qT04SCRztj3w5Fhd5aH0QKBgQD7V0pNgcvj9fhNU/QE\ncyuUEXfDwd+0efkWXk7TdsKiRdzeqQHsippjOIQs9D/tY3NGFXR+plkd0dgOflIQ\nSijZFoddS5SJroOjpZW5PCmxYMAVFPWcPq/SfpCQ6QSC9TQIxWZ+KBH+allhSbXX\njA/796WT+UoxcnrB2ITSMhYn8QKBgQD55ROdtqRBgoNzMF78cmZs2UKO28IfZLOs\neKyQ4JSwSaXH4UQGF4W3ZMVb9srNNJl77wYXYYvalCA7E1K9FxESgQp8H5OdQHNO\nZlGM8dHnvi2K2Pmjz9GaCDsvwdDB+s3t8yRWMlB85KqMbZHDe9vkaXd0qn0t2QfP\njnZAo/dfgwKBgQDhFveQGiHC8dGBTyJFqe7pGAut4L67HlEY2zS05LLCKNb5AVqb\nwDUrjr2wlL17l4jwxt4hXlCJCBj6Qd60f/W9FRP9VWadNxDlSbGgxmSAWikruC2N\n1AYZ+Qb2//fuYDJNeJuld7VFp3CMVDrp4qGeAdbjgmoThnaxi3rH09tLwQKBgFeH\nOE62iWP0vewb1jlgLKYVly2Ipb7vO8u+XNtF/m6c7TdMnNHxbUGmR0aF89TahqQV\nPbH01dKSrZNjmkhnCvDLSAvf14lt6LVeO1Q940LjpvoKM65//S+RkIGSxncbTQP6\ndRDIAM8uHNqhCjxJZuTjWBcCHGRxrz2w7ZSImf3XAoGBAJ/fQULOiYnmvbTa/rxz\nYICJn3TuILzyayLaYTtab3ix4PyQ5t3Xsy+wJbEiyPuw5ZEwPtWRV1IXjETaBWwf\njazjmaNPYElCjn3DNoDTRXCHgvIGRZDpBxLUyeen/r7uKTLngXA5kRjjSF9TZOZq\nriLz9RLT4CPjIcDclWuRhbwv\n-----END PRIVATE KEY-----\n',
  client_email: 'rest11@t-1-1-y9pi.iam.gserviceaccount.com',
  client_id: '107336654141698630405',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/rest11%40t-1-1-y9pi.iam.gserviceaccount.com',
};

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

detectIntent('zh-TW','你好','123');

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
