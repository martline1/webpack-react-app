module.exports = (env, argv) => {
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const CleanWebpackPlugin   = require("clean-webpack-plugin");
    const buildMode            = argv.mode === "development" ? "development" : "production";

    const config = {
        mode  : buildMode,
        entry : {
            vendor : [
                "history",
                "react",
                "react-dom",
                "react-helmet",
                "react-redux",
                "react-router",
                "react-router-dom",
                "redux",
                "redux-thunk",
            ],
            app : `${__dirname}/src/app/index.jsx`,
        },
        output : {
            path       : `${__dirname}/public`,
            filename   : "js/[name].js",
            publicPath : "/",
        },
        devtool : "eval-source-map",
        module  : {
            rules : [
                {
                    test    : /\.(css|scss)$/,
                    exclude : "/node_modules/",
                    use     : [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ],
                },
                {
                    test    : /\.(js|jsx)$/,
                    exclude : "/node_modules/",
                    use     : {
                        loader  : "babel-loader",
                        options : {
                            presets : [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                        },
                    },
                },
                {
                    test    : /\.(jpg|png|gif|svg|ttf|mp4)$/,
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
            new MiniCssExtractPlugin({ filename : "css/[name].css" })
        ],
        optimization : {
            minimize    : buildMode === "production" ? true : false,
            splitChunks : {
                cacheGroups : {
                    vendor : {
                        test   : "vendor",
                        name   : "vendor",
                        chunks : "initial",
                    }
                }
            }
        }
    };

    if (buildMode === "development") {
        config.devServer = {
			contentBase : `${__dirname}/public/`,   // Serve public files
			open        : "Chrome",                 // Open with Google Chrome
			stats       : "errors-only",            // Just show error messages
			port        : 9000,                     // Use port 9000
			before : function(app, server) {        // Custom configurtion, redirect all routes to index.html
				app.get("**", (req, res, next) => {
					console.log(`[SWR Server] Requested url: ${req.url}`);

					next();
				});

				app.get(/^((?!\.).)*$/, (req, res) => {
					res.sendFile(`${__dirname}/public/index.html`);
				});
			},
		};
    } else {
        config.plugins.push(
            new CleanWebpackPlugin(["js", "css", "media"], { root : `${__dirname}/public` })
        )
    }


    return config;
};
