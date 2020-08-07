import { Router } from "../../../deps/oak.js";
import mainController from "../controllers/mainController.js";

// Setting the path prefix for this api and creating the router
const pathPrefix = "/main/api";
const router = new Router({ prefix: pathPrefix });

/* Routes */
router.get("/", async (context) => {
	context.response.body = "Hello World!";
});

router.get("/create/:firstname/:lastname", async (context) => {
	context.response.body = await mainController.createUser(context.database, context.params.firstname, context.params.lastname);
});

router.get("/select/:firstname", async (context) => {
	context.response.body = await mainController.selectUserByName(context.database, context.params.firstname);
});

router.delete("/delete/:firstname", async (context) => {
	context.response.body = await mainController.deleteUserByName(context.database, context.params.firstname);
});

export default router;