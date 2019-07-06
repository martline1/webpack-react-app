# WRA Webpack React App

Creates a standard configuration for developing an app with react and webpack.

## Version: 1.1.0

## Release date: 2019/07/06

# Usage

### Get help
```sh
$ webpack-react-app --help
$ wra --help    # You can use wra instead
```

### Copy configuration.
```sh
$ wra copy   # Copy just the general configuration in the current folder.
```

### Generate a project
Generate a project with the configuration needed. *You must run npm install*
```sh
$ wra generate my-project   # Create project in "my-poject" dir
$ cd my-project
$ npm install
$ npm run build-dev-server  # Run development-build with a server.
```

# Available scripts in Generated Projects

In the project directory, you can run:

### `npm run build-dev-server`

Runs the app in the development mode.<br>
Open [http://localhost:9000](http://localhost:3000) to view it.

The page will reload if you make edits.

### `npm run build-production`

Creates a production version of your app <br>
This version will compile in `/public` dir.
