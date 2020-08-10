// TO RUN: deno run -A -r --unstable --inspect examples/deno-desktop-app/todo-app.ts --allow-net=jsonplaceholder.typicode.com/todos/
// Importing the webview library
import { WebView } from "https://deno.land/x/webview/mod.ts";
// Creating an HTML page
// Pull in todos from API and display in window.
// TODO: Hook into deno+oak interface in last project and make true hooks into POST, PUT/PATCH and DELETE.
const res = await fetch('https://jsonplaceholder.typicode.com/todos/');

const body = await res.json();
let todos_html = "";

if (body) {
    //TODO: LOOK FOR TEMPLATING ENGINE FOR DENO! THIS IS UGLY!!
    for (let todo of body) {
        todos_html += `<li>${todo.title}</li>`;
    }
}
let html = `
    <html>
        <body>
            <h1>List TODOS!</h1>
            <ul>
              ${todos_html}
            </ul>
        </body>
    </html>
`;

// Creating and configuring the webview
const webview = new WebView({
    title: "Deno Webview Example",
    url: "data:text/html," + html,
    width: 800,
    height: 600,
    resizable: true,
    debug: true,
    frameless: false
});
// Running the webview
webview.run();