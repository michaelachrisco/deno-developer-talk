// You can create controllers for your applet in this folder
import Users from "../models/users.js";

async function createUser(database, firstname, lastname) {
	database.link([Users]);

	await Users.create([{
		firstname: firstname,
		lastname: lastname,
	}]);

	return {
		statusText: "User added to database",
	};
}

async function selectUserByName(database, firstname) {
	database.link([Users]);

	return await Users.where("firstname", firstname).all();
}

async function deleteUserByName(database, firstname) {
	database.link([Users]);

	Users.where("firstname", firstname).delete();

	return {
		statusText: "User deleted from the database",
	};
}

export default {
	createUser: createUser,
	selectUserByName: selectUserByName,
	deleteUserByName: deleteUserByName,
}