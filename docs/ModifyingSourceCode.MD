# Tune Mountain Input Manager
## Modifying source code and local browser testing

Here's how to modify and locally test the source code of this repository. This also works for any other node apps
 running on the browser.
 
See files and code inside [localTesting](../localTesting) and the scripts defined inside [package.json](../package.json) for the gritty details of it all.

**DON'T FORGET TO `NPM INSTALL`**

**NOTE:** it may be valuable to have browserify AND watchify installed globally. You can do that by running `npm
 install -g browserify watchify`

### Prerequisites

1. You must have an entry point like [index.js](../index.js) that exports your whole module or the relevant parts
 using `module.exports`
 
1. You must have a master client-side script like [BrowserTestScript.js](../src/BrowserTestScript.js) that runs the
 parts of the code you wish to test in the browser.
 
### Compiling

We must first compile the code into a single [bundle script](../localTesting/bundle.js) that will be mounted on our html file
 that will be
 loaded
 onto the browser.
 
 We do that by running `browserify /src/BrowserTestScript.js -o /localTesting/bundle.js`
 
 This compiles the code into a single javascript file that will be imported into the HTML file.
 
 Now you may import the file into the HTML by using the tag
 ```html
<script src="bundle.js"></script>
```

### Hot-Reloading

Hot reloading can be done by using watchify, which basically runs browserify every time a change is done to any of
 the dependencies used in your high-level script.
 
The script used in this project is `watchify ./src/BrowserTestScript.js -o ./localTesting/bundle.js -v`

This script is also bound to the shortcut `npm run hot-reload` in this project. Run this if you are making constant
 changes to the files while testing in the browser.
 
 Now, every time a change is made to any of the dependencies, you can simply reload the page and the changes have
  been applied and compiled into `bundle.js`.
  
### Statically Serving Files for Local Testing

A simple node server has been set up for development, defined inside [server.js](../localTesting/server.js). Please
 check the source code for more details.
 
This essentially serves `index.html` and `bundle.js` whenever `localhost:4545` is fetched in the browser.

To run this server, either run `node ./localTesting/server.js` or `npm start`.

### TL;DR

1. Run `npm run hot-reload` to update `js` files on the fly
1. Run `npm start` to serve static files


_Written by [Léo Gonsalves](https://github.com/lcgonsalves)_