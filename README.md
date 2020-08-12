# Introduction to Deno
Presentation is in google sides, PDF and PowerPoint formats. 

https://docs.google.com/presentation/d/1_xaA8NMsMDVFT5Qd6vfTE6TxFH1s0ngapf5nNf8hvew/edit?usp=sharing

## Install
https://deno.land/manual/getting_started/installation

## Debug
https://deno.land/manual/tools/debugger

## Example projects
All examples projects are in the `examples` folders.
There you will find:

### Intro Hello world
Example taken from Deno deocumentation, showing an example web app:
To run: `deno run --allow-net examples/intro/intro_world_server.ts`

### REST API: oak-todo
Basic TODO app that interfaces with deno + oak + postgres. This example project was created using two tutorials and trying out different ORMs (not yet implemented).

Based on previous work here:
https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/
https://github.com/adeelibr/deno-playground

To be sure this works, I went through each of the patterns/code above.

Postgres repository and service pulled from: https://blog.logrocket.com/creating-your-first-rest-api-with-deno-and-postgres/
and modified to suit our needs.

to run: `deno run --allow-net examples/oak-todo/server.ts`

### WebAssembly
Example from Webassembly was based on prevous talks I gave on the subject here: https://github.com/michaelachrisco/ToyLisp
I am not including this code as its used as a reference on what webassembly can do for the web.

### Deno Desktop App
Example web based desktop app (kind of like electron) using Rust and Deno.

To run: `deno run -A -r --unstable examples/deno-desktop-app/desktop_app.ts`
If there are errors, you may need additional dependencies here: https://github.com/webview/webview_deno#building
