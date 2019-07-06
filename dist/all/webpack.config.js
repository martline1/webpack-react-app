module.exports = (env, argv) => {
    const webpack              = require("webpack");
    const HtmlWebpackPlugin    = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const CleanWebpackPlugin   = require("clean-webpack-plugin");
    const buildMode            = argv.mode === "development" ? "development" : "production";

    const config = {
        mode  : buildMode,
        entry : {
            app : `${__dirname}/src/index.jsx`
        },
        output : {
            path       : `${__dirname}/public`,
            filename   : "js/[name].[contenthash].js",
            publicPath : "/"
        },
        devtool : buildMode === "production" ? "source-map" : "eval-source-map",
        module : {
            rules : [
                {
                    test    : /\.(css|scss)$/,
                    exclude : "/node_modules/",
                    use     : [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                {
                    test    : /\.(js|ts|jsx|tsx)$/,
                    exclude : "/node_modules/",
                    use     : {
                        loader  : "babel-loader",
                        options : {
                            presets : [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                },
                {
                    test    : /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    exclude : "/node_modules/",
                    use     : {
                        loader  : "url-loader",
                        options : {
                            limit    : 10000,
                            fallback : "file-loader",
                            name     : "media/[name].[hash].[ext]",
                        },
                    },
                },
            ],
        },
        plugins : [
            new MiniCssExtractPlugin({ filename : "css/[name].css" }),
			new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
			new HtmlWebpackPlugin({
				title    : "Generated App",
				lang     : "en",
				template : `${__dirname}/template.html`,
				favicon  : `${__dirname}/public/favicon.ico`,
				xhtml    : true,
				meta     : {
					"viewport"    : "width=device-width, initial-scale=1, shrink-to-fit=no",
					"theme-color" : "#FFF",
				},
			}),
        ],
        optimization : {
            minimize    : buildMode === "production" ? true : false,
			runtimeChunk : 'single',
			splitChunks  : {
				chunks             : 'all',
				maxInitialRequests : Infinity,
				minSize            : 0,
				cacheGroups        : {
					vendor : {
						test : /[\\/]node_modules[\\/]/,
						name : module => {
							// Get the name. E.g. node_modules/packageName/not/this/part.js
							// Or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `npm.${packageName.replace('@', '')}`;
						},
					},
				},
			},
        },
        externals : {
            // global app config object
            config : JSON.stringify({
                API_URL : 'http://localhost:8081'
            })
        }
    };

    if (buildMode === "development") {
		config.devServer = {
			contentBase : `${__dirname}/public/`,   // Serve public files
			publicPath  : `/`,						// Bundle files available here
			open        : "Chrome",                 // Open with Google Chrome
			stats       : "errors-only",            // Just show error messages
			port        : 9000,                     // Use port 9000
			before : function(app, server) {        // Custom configurtion, redirect all routes to index.html
				app.get("**", (req, res, next) => {
					console.log(`[Server] Requested url: ${req.url}`);

					next();
				});

				app.get(/^((?!\.).)*$/, (req, res) => {
					// If compiled, send file
					// res.sendFile(`${__dirname}/public/index.html`);

					// Else, request file, and respond with it
					const http = require("http");

					http.get("http://localhost:9000/index.html", response => {
						let data = "";

						response.on("data", chunk => data += chunk);
						response.on("end", () => {
							res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
							res.write(data, "utf8");
							res.end();
						});
					}).on("error", err => {
						res.write("<h1>An exception has occurred.</h1>");
						res.write(err.message);
						res.end();
					});
				});
			},
		};
    } else {
        config.plugins.push(
            new CleanWebpackPlugin(["js", "css", "media", "index.html"], { root : `${__dirname}/public` })
        );
    }

    return config;
};
