const express = require("express");
const path = require("path");

const getTranslatedServer = (lang) => {
    const distFolder = path.join(process.cwd(), `dist/stanleybet/server/${lang}`);
    const server = require(`${distFolder}/main.js`);
    return server.app(lang);
};

function run() {
    const port = process.env.PORT || 4000;
    const server = express();

    let languages = ["en", "ro"];
    let defaultLang = "ro";

    // Start up the Node server
    languages.forEach((lang) => {
        server.use(`/${lang}`, getTranslatedServer(lang));
    });

    server.use("", getTranslatedServer(defaultLang));

    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

run();
