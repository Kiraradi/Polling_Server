const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const routers = require('./routers/message');

const app = new Koa();

app.use(koaBody({
    urlencoded: true,
    multipart: true,
}));

app.use((ctx, next) => {
    const origin = ctx.request.get('Origin');
    if (!origin) {
        return next();
    }

    const headers = { 'Access-Control-Allow-Origin': '*', };

    if (ctx.request.method !== 'OPTIONS') {
        ctx.response.set({ ...headers });
        try {
            return next();
        } catch (e) {
            e.headers = { ...e.headers, ...headers };
            throw e;
        }
    }

    if (ctx.request.get('Access-Control-Request-Method')) {
        ctx.response.set({
            ...headers,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        });

        if (ctx.request.get('Access-Control-Request-Headers')) {
            ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
        }

        ctx.response.status = 204;
    }

});

app.use(routers());
const port = process.env.PORT || 7075;
const server = http.createServer(app.callback());

server.listen(port, (err) => {
    if (err) {
        console.log(err);

        return
    }

    console.log('server is listening to ' + port);
});