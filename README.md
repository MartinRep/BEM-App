# BEST EVER ME Project 2017

This repository contains code and information for a third-year undergraduate project for the final year project of Software Development (Level 7) at [GMIT](http://www.gmit.ie) in the Department of Computer Science and Applied Physics. 
The project supervisor is [Martin Kenirons](https://github.com/mkenirons).

TODO: REFORMULATE INTRODUCTION

## Project Overview
The project is a prototype requested to [GMIT](http://www.gmit.ie) by [Best Ever Me](http://www.gmit.ie). Its target is to be an app that provides a reverse auction mechanism for beauty services offered by the clients (salons) of Best Ever Me. Users will download app and register for usage. Salons will use the same app as a service provider.

## Architecture

This is a Client/Server architecture with a database holding the information for both the users and the salons. The requests are generated and pushed out to users based on location and service.

The application is written using the [MEAN](http://mean.io/) stack. MEAN is a framework for an easy starting point with MongoDB, Node.js, Express, and AngularJS based applications. It is designed to give a quick and organized way to start developing MEAN based web apps with useful modules like Mongoose and Passport pre-bundled and configured. It mainly tries to take care of the connection points between existing popular frameworks and solve common integration problems. The client side is developed using the [Ionic 2](http://ionic.io/2) framework, making the client a cross-platform app that can be built either for Android, IOS or Windows Phone using the same source code.

[MEAN](http://mean.io/) stands for: [MongoDB](https://www.mongodb.com/),[Express](https://expressjs.com/), [AngularJs](https://angularjs.org/) and [NodeJs](https://nodejs.org/en/).

[MongoDB](https://www.mongodb.com/) takes care of the persistence, providing a document store database where information about customers, salons and bookings will be stored.

[Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 

[AngularJs](https://angularjs.org/) lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop. It s a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature needs.

[NodeJs](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

[Ionic 2](http://ionic.io/2) is an HTML5 mobile app development framework targeted at building hybrid mobile apps. Hybrid apps are essentially small websites running in a browser shell in an app that have access to the native platform layer. Is the front-end UI framework that handles all of the look and feel and UI interactions the app needs in order to be compelling. 
Since it is an HTML5 framework, it needs a native wrapper, in this case I used [Cordova](https://cordova.apache.org/) 

## Installation

In order to install both the application there are some requirements that must be met.

### Server

The server side uses [NodeJs](https://nodejs.org/en/) and several modules. Their website provide the necessary information to install node and its package manager. Using the package manager, the required modules can be installed. [NOTE: Modules should be ready and available in this repository already]

```
npm install morgan cors express errorhandler mongoose body-parser helmet
```
### Client 

The client side is written in Ionic 2. Ionic can be installed using the node package manager (npm):

```
npm install -g ionic cordova
```

The application can be compiled in the target instalation package. 

[TODO: Explain how and provide links or create small tutorial in wiki]

## Authors

* **Albert Rando** - *Design and Development* - [rndmized](https://github.com/rndmized)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments and References

* Templates and Tutorials to start developing the application were found at: [Devdactic](https://devdactic.com/)





