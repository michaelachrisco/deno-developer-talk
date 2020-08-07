import { Application } from "./deps/oak.js";
import { Database } from './deps/denodb.js';
import { dbconfig } from "./config/dbconfig.js";
import { queryParserAsync } from "./deps/oakAsyncQueryParser.js";
import { Snelm } from "./deps/snelm.js";
import { Session } from "./deps/session.js";
import { organ } from "./deps/organ.js";

const app = new Application();


/* Server configurations */
let port = 55555;
if (Deno.args[0]) {
    port = Number.parseInt(Deno.args[0]);
}


/* Database */
const database = new Database(dbconfig.client, dbconfig.connection);
app.use(async (context, next) => {
	context.database = database;
	await next();
});


/* Middleware */
// Logging middleware
app.use(organ());

// Query Parser Middleware
app.use(queryParserAsync());

// Security Middleware
const snelm = new Snelm("oak");

app.use(async (context, next) => {
    context.response = snelm.snelm(context.request, context.response);

    await next();
});

// Session Middleware
const session = new Session({
    framework: "oak",
    store: "memory",
});
await session.init();
app.use(session.use()(session));


/* Routers */
import main from "./applets/main/router.js";
app.use(main.routes());
app.use(main.allowedMethods());

import mainapi from "./applets/main/api/router.js";
app.use(mainapi.routes());
app.use(mainapi.allowedMethods());


// General 404 Error Page
app.use(async (context, next) => {
	context.response.status = 404;
	context.response.body = "404 - Page Not Found";

	await next();
});


// Starting the server
console.log("Starting server at port: " + port);
await app.listen({ port: port });