import { Client } from "https://deno.land/x/postgres/mod.ts";

class Database {
  client!: Client;
  constructor() {
    this.connect();
  }

  async connect() {
   this.client = new Client({
      user: "postgres",
      database: "todo_deno",
      hostname: "localhost",
      password: "admin1234",
      port: 5432
    });

    await this.client.connect();
  }
}

export default new Database().client;