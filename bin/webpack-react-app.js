#!/usr/bin/env node

'use strict';

const program     = require('commander');
const fs          = require("fs");
const staticFiles = [
    "/webpack.config.js",
    "/postcss.config.js",
    "/.babelrc",
    "/package.json"
];

/**
 * webpack-react-app
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @version 1.0.4
 */
program
    .version("1.0.2", "-v, --version")
    .option("-c, --copy-config", "Copy just the configuration in the current folder.")
    .option("-C, --create-with-config <dir>", "Create a dir and copy the configuration in there.")
    .action(() => {
        if (program.copyConfig) {
            /** Iterate and copy each staticFile */
            staticFiles.map(file => {
                fs.copyFile(__dirname + "/../dist" + file, process.cwd() + file, err => {
                    if (err) return console.log("There was an error while copying the files.", err);
                    console.log(`Copying ${file} file...`);
                })
            });
        }
        else if (program.createWithConfig) {
            try {
                const { ncp }  = require("ncp");
                const { exec } = require("child_process");

                const distPath = __dirname + "/../dist";
                const newPath  = process.cwd().replace("/", "\\") + "\\" + program.createWithConfig;

                // Create dirs
                fs.mkdirSync(process.cwd() + "/" + program.createWithConfig);
                // fs.mkdirSync(`${newPath}/node_modules/`);

                console.log("Copying files...");
                ncp(distPath, newPath, err => {
                    if (err) return console.log("There was an error while copying the files.", err);
                    console.log("Copying files complete.");

                    // TODO: Be able to install node dependencies
                    // console.log("Installing dependencies...");
                    // exec(`npm install --prefix ${newPath}`, (err, stdout, stderr) => {
                    //     if (err) return console.log("There was an error while creating the dir. ", err); 

                    //     console.log(stdout);
                    //     console.log(stderr);        
                    // });
                });
            } catch(err) {
                console.log("An exception has occurred. \n", err);
            }
        }
    })
    .parse(process.argv);
