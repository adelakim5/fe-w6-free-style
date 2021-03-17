const createBase = (style_href, result, graph) => {
  return /*html*/ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- <script defer type="module" src="src/main.js"></script> -->
        <link rel="stylesheet" href="${style_href}">
        <title>Chatbot</title>
      </head> 
      <body>
        <section class="content">
            ${result}
            ${graph}
        </section>
      </body>
    </html>
    `;
};

module.exports = createBase;
