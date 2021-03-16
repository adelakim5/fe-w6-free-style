const createBase = (result, graph, people) => {
  return /*html*/ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- <script defer type="module" src="src/main.js"></script> -->
        <title>Chatbot</title>
      </head> 
      <body>
        <section class="content">
            ${result}
            ${graph}
        </section>
        <section class="people">
            ${people}
        </section>
      </body>
    </html>
    `;
};

module.exports = createBase;
