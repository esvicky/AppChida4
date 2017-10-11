// Download the Node helper library from twilio.com/docs/node/install
// These are your accountSid and authToken from https://www.twilio.com/console
const accountSid = 'AC189fad9eef9a38b7c137caa7a4b9273b';
const authToken = 'a5cc77d84f5b391b152f79c24a07a082';

const client = require('twilio')(accountSid, authToken);

client.lookups.v1
  .phoneNumbers('+525510073148')
  .fetch()
  .then(
  	(number) => console.log(number.carrier.type, number.carrier.name)
  	).catch(function(e) {
            console.log(e); // "oh, no!"
	});