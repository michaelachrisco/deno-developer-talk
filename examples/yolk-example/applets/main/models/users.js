import { Model, DATA_TYPES } from '../../../deps/denodb.js';

export default class Users extends Model {
	static table = 'mainUsers';
	static timestamps = true;

	static fields = {
		id: {
			primaryKey: true,
			autoIncrement: true,
		},
		firstname: DATA_TYPES.STRING,
		lastname: DATA_TYPES.STRING,
	};
}