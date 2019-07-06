#!/usr/bin/env node --harmony

'use strict';

const program = require('commander');
const fs      = require("fs")

const configFiles = [
    "/.babelrc",
    "/.gitignore",
    "/package.json",
    "/postcss.config.js",
    "/template.html",
    "/webpack.config.js",
];

program.version("1.1.0", "-v, --version");

program
    .command("generate <name>")
    .description("Generate a project with the configuration needed.")
    .option("-r, --only-redux", "Generates project with redux.")
    .option("-R, --only-react-router", "Generates project with react-router.")
    .action((name, { onlyReactRouter, onlyRedux }) => {
        if (onlyReactRouter && onlyRedux) {
            console.error("Error: Invalid use of command. If you want all configuration, you don't need to specify any flags.");
            process.exit(1);
        }

        try {
            const { ncp }  = require("ncp");
            const { exec } = require("child_process");

            const distPath = __dirname + "/../dist/" +
                (!(onlyReactRouter || onlyRedux) ? "all" :                      // If there's no flag, install all, else
                onlyReactRouter                 ? "react_router" : "redux");    // if there's onlyReactRouter flag, install react_router, else install redux

            const newPath  = process.cwd().replace("/", "\\") + "\\" + name;

            // Create dirs
            fs.mkdirSync(process.cwd() + "/" + name);

            console.log("Copying files...\n");

            ncp(distPath, newPath, err => {
                if (err) {
                    console.error("Error: There was an error while copying the files. \n", err);
                    process.exit(1);
                }
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
            console.log("Error: An exception has occurred while generating project. \n", err);
            process.exit(1);
        }
    });

program
    .command("copy")
    .description("Copy just the general configuration in the current folder.")
    .action(() => {
        /** Iterate and copy each staticFile */
        configFiles.map(file =>
            fs.copyFile(__dirname + "/../dist/all" + file, process.cwd() + file, err => {
                if (err) return console.log("There was an error while copying the files.", err);
                console.log(`Copying ${file} file...`);
            })
        );
    });

// error on unknown commands
program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program
    .parse(process.argv);
