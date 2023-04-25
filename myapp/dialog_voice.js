const fs = require('fs');
const util = require('util');
const {Transform, pipeline} = require('stream');
const projectId = 't-1-1-y9pi';
const sessionId = '123';
const pump = util.promisify(pipeline);
// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');
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

// The path to the local file on which to perform speech recognition, e.g.
 const filename = '/Users/acer/audio.m4a';

// The encoding of the audio file, e.g. 'AUDIO_ENCODING_LINEAR_16'
 const encoding = 'AUDIO_ENCODING_LINEAR_16';

// The sample rate of the audio file in hertz, e.g. 16000
// const sampleRateHertz = 16000;

// The BCP-47 language code to use, e.g. 'en-US'
 const languageCode = 'zh-TW';
const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  sessionId
);

const initialStreamRequest = {
  session: sessionPath,
  queryInput: {
    audioConfig: {
      audioEncoding: encoding,
      languageCode: languageCode,
    },
  },
};

// Create a stream for the streaming request.
const detectStream = sessionClient
  .streamingDetectIntent()
  .on('error', console.error)
  .on('data', data => {
    if (data.recognitionResult) {
      console.log(
        `Intermediate transcript: ${data.recognitionResult.transcript}`
      );
    } else {
      console.log('Detected intent:');

      const result = data.queryResult;
      // Instantiates a context client
      const contextClient = new dialogflow.ContextsClient();

      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log('  No intent matched.');
      }
      const parameters = JSON.stringify(struct.decode(result.parameters));
      console.log(`  Parameters: ${parameters}`);
      if (result.outputContexts && result.outputContexts.length) {
        console.log('  Output contexts:');
        result.outputContexts.forEach(context => {
          const contextId =
            contextClient.matchContextFromProjectAgentSessionContextName(
              context.name
            );
          const contextParameters = JSON.stringify(
            struct.decode(context.parameters)
          );
          console.log(`    ${contextId}`);
          console.log(`      lifespan: ${context.lifespanCount}`);
          console.log(`      parameters: ${contextParameters}`);
        });
      }
    }
  });

// Write the initial stream request to config for audio input.
detectStream.write(initialStreamRequest);

// Stream an audio file from disk to the Conversation API, e.g.
// "./resources/audio.raw"
pump(
  fs.createReadStream(filename),
  // Format the audio stream into the request format.
  new Transform({
    objectMode: true,
    transform: (obj, _, next) => {
      next(null, {inputAudio: obj});
    },
  }),
  detectStream
);