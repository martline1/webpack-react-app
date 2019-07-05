#!/usr/bin/env node --harmony

'use strict';

const program     = require('commander');
const fs          = require("fs")

const staticFiles = [
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
    .option("-r, --with-redux", "Generates project with redux.")
    .option("-R, --with-react-router", "Generates project with react-router.")
    .option("-a, --all-configuration")
    .action((name, options) => {
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
    });

program
    .command("copy")
    .description("Copy just the general configuration in the current folder.")
    .action(() => {
        /** Iterate and copy each staticFile */
        staticFiles.map(file => {
            fs.copyFile(__dirname + "/../dist" + file, process.cwd() + file, err => {
                if (err) return console.log("There was an error while copying the files.", err);
                console.log(`Copying ${file} file...`);
            })
        });
    });

// error on unknown commands
program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program
    .parse(process.argv);
