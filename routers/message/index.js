const Router = require('koa-router');
const combineRouters = require('koa-combine-routers');
const createRandomMessages = require('../../services/message-service').createRandomMessages;
const router = new Router();

router.get('/messages/unread', (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    
    if (Math.random() > 0.5) {
        ctx.response.status = 500;
        return;
    }

    const messages = createRandomMessages();

    ctx.response.body = {
        status: "ok",
        timestamp: new Date().getTime(),
        messages: messages
    }
});


const routers = combineRouters(
    router
);

module.exports = routers;