const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();
const express = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');
const project_id = 'y--qo9y';
const languageCode = 'zh-TW';
// TODO: Set the `credentials` value to your GCP service account JSON key object
const credentials = {
    type: "service_account",
  project_id: "y--qo9y",
  private_key_id: "56da3b3ae3b52008afd51c10c15cb5e6845fc9a6",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCyasaObMC35vgW\nB1SBMHuj7tST8xIF5aKCHU8iAixRSNpytWpk+5lsbJDQUtvPrguOpwrTXeYKj0Hz\nniriJ3qHUylkS7YfYamehgr1JUNE+LFI/1ConrSmFRYijnfEb/qRStHNpHo6pJfR\n4RPqVq8m4QVCUM9SHoEXf8Kr+Bf2EHyQVVak9rlIlcUH3BfZacf1nGJ1n1ebYgL5\nLIMsDQVFqPBtQBZOPZ6BLhts6rYJnh1IzsJLObPNT0aG1L0sWWSyl/kb0Jz3IktU\nDoig+td95GsuTW1wDQH81BolttKVyKTXjt4GpEd619iauqa6PLWAfSqnLQ1UUsw8\ntcC0AiVBAgMBAAECggEAATfgbjWI5ViS5hebuJwbpAVr9yyoOVkVkHzhvvIz2kQ8\nlZ7ugI0FQavGG14NeTAPjSRP2xyfhv/ua9rvIQcy+3ySYkhwEGvKzDXPGlhsSqrG\nDyELLHOU+TNYqNi/MZywIdDYeOaAHSlljf3S9H0uCf5sWkUR/VYO/JmXOzRg+YGl\nYl67DqhBf/6trkAPAp1yPkJAa1WtkkcjlddMeA/pPjkvoXkF3opwcUfuouw/pY4d\n7TV08IdQCjIf8riOzdCIonE+twtRzWjvizp7uv9bqyBDNeyehnCyWSiqVhcVHW2r\nYWiGRUrrwiYxyxrHnoUWCuSGskA9cBiEY8tfGEQSgQKBgQDoIhxKXfcZOGfbPd+U\nr7suT4PlEIwTCTdoAnTir0pELm/5MNmBKqDiqi8cOSaBiMGvttv55SfbjUhBdv/T\nKIERGs7gB0/NJPuPDhoLi9OE0G/sASi+S93seFBNhDaw54CJcYByMj9QvUiGCls0\n9njEXgjW52DuG3wwjGnXBZ5X8QKBgQDEwtKwhlGgfeoF3HEQpmrkL65E/zERrqZA\nBDoquJxATHceVOlj56ec0n3Byba4w1smu8amFUOTT6pDOCi1K/uJqruQegZ6KmZC\n5rC43+aVnlWy1245QvLaGvXt81pB/xEDCpR38pq1fBXKhuRSamfNrbai0m0NAoSG\nWAx6DK9yUQKBgCmJiQRpogCaTkM15B8H/vd/dPt1JYt2d7qdzeqOMTzYDmNJsXHi\nfd1xVHK5a0F8hiP6FYy2y5YGxuon8AkJ02aLJH+D72ym9HiZrmFoiNXYMl7Jqk+6\n5aAdu0jTorGvCxoM/E3y3c+Fv0d07PMiM2P3658A0iBpPKS3S20VbUsRAoGBAJQH\nIm0t0FFXCW45Z1KocPiVKp28A5WS+H5m77/ePadeH6vRI/lGeeJQtc3KTM56IqRk\nVtHyY3F7WNPTd0S9/zKWISBTvXXBWkfwuHmN8TMU+NJgowsvY/dUmzrWf0vxckIA\nfqwy99Obs+U3UKT0an3ht+qNNv+3qi5MJa7YxlHRAoGBALWRUElSYOiXU44jyYqg\nLQg6tD/2RlVHsOElgz/NL0HTqpDk1CwcVsTgwxkPoBmtCZsHKabw8udqwLiye+Kf\n/GQiCjTY1fRkeCLR7QAjDjTzcBlUlxImc1+aEw06EMDl6iGEbclvlltLgw6/GGoe\n+ombNBn5OViz/YOKpTGRhKz8\n-----END PRIVATE KEY-----\n",
  client_email: "sup-686@y--qo9y.iam.gserviceaccount.com",
  client_id: "111571679543093803393",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/sup-686%40y--qo9y.iam.gserviceaccount.com"
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

detectIntent('zh-TW','付現','123');

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
