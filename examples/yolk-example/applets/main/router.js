import { Router } from "../../deps/oak.js";
import path from "../../deps/path.js";
import denjucks from "../../deps/denjucks.js";
import * as utilities from "../../utilities/util.js"
import mainController from "./controllers/mainController.js";

const __dirname = utilities.crossPlatformPathConversion(new URL(".", import.meta.url).pathname);

// Setting up the template rendering engine
const renderingEngine = new denjucks.Environment(new denjucks.FileSystemLoader(path.join(__dirname, "templates")));

// Setting the path prefix for this route
const pathPrefix = "/main";

const router = new Router({ prefix: pathPrefix });

// Creating the static file route for this router
router.get("/static/:filePath", async (context) => {
	const filePath = context.params.filePath;
	let buffer;
	try {
		buffer = await Deno.readFile(path.join(__dirname, "static", filePath));
	} catch (error) {}
	
	return context.response.body = buffer;
});

// Routes
router.get("/", async (context) => {
	context.response.body = renderingEngine.render("index.html");
});

export default router;