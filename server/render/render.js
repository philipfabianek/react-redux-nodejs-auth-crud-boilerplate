import fs from "fs";
import path from "path";

import React from "react";
import ReactDOM from  "react-dom";
import ReactDOMServer from  "react-dom/server";

import { App } from "./../../source/routes/App";
import { StaticRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import configureStore from "./../../source/store/configureStore";

import Memory from "./../mongodb/memory-model";

const renderPage = (req, res) => {
    const context = {};

    let htmlFilePath = "/index.html";

    switch (req.url) {
        case "/":
            htmlFilePath = "/index.html";
            break;
        default:
    }

    fs.readFile(path.join(__dirname, "..", "html", "index.html"), "utf8", (error, data) => {
        if (error) {
            console.log("Error :( ", error);
        };

        let document;

        let clientUser = false, userId = "none";

        if (req.user) {
            clientUser = {
                id: req.user._id,
                username: req.user.username
            };
            userId = req.user.id;
        }

        Memory.find({ userId }, (err, memories) => {
            if (err) {
                console.log(err);
            }

            const store = configureStore({
                user: clientUser,
                memories
            });

            const html = ReactDOMServer.renderToStaticMarkup(
                <Provider store={store}>
                    <StaticRouter
                        location={req.url}
                        context={context}
                    >
                        <App
                            url={req.url}
                        />
                    </StaticRouter>
                </Provider>
            );

            document = data.replace(
                /<div id="app"><\/div>/,
                `<div id="app">${html}</div>
    <script>window.__USER__ = ${JSON.stringify(clientUser)}</script>
    <script>window.__MEMORIES__ = ${JSON.stringify(memories)}</script>`
            );

            res.send(document);
        });

        // res.send(data);
    });
};

export default renderPage;
