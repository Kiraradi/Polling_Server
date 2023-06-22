const { faker } = require('@faker-js/faker');
const Message = require('../models/Message').Message;


module.exports.createRandomMessages = () => {
    return faker.helpers.multiple(this.createRandomMessage, {
        count: faker.number.int(10),
    });
}

module.exports.createRandomMessage = () => {
    const message = new Message();
    message.id = faker.string.uuid();
    message.from = faker.internet.email();
    message.subject = faker.helpers.fake('Hello from {{person.firstName}} {{person.lastName}}');
    message.body = faker.word.words({ count: { min: 5, max: 25 } });
    message.received = faker.date.anytime().getTime();

    return message;
}