# WRA Webpack React App

Creates a standard configuration for developing an app with react and webpack.

## Version: 1.0.3

## Release date: 2019/04/08

# Usage

### Generate config files in dir
Running this in the root directory of your app will add and copy all structure and files needed for **webpack** and **react**.
```sh
$ webpack-react-app --copy-config   # This will copy just the configuration files
```

### Create a dir and then generate structure in that dir
```sh
$ webpack-react-app --create-with-config my-app # Create a dir and copy the configuration in there
```
This will create a dir of name *my-app* and copy all structure needed from **webpack** and **react**, it also creates a *Hello-world* app.

Type `$ webpack-react-app -h` for more details.
