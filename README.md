# BEST EVER ME Project 2017

This repository contains code and information for a third-year undergraduate project for the final year project of Software Development (Level 7) at [GMIT](http://www.gmit.ie) in the Department of Computer Science and Applied Physics. 
The project supervisor is [Martin Kenirons](https://github.com/mkenirons).

More information on the [wiki](https://github.com/rndmized/BEM-App/wiki).

## Project Overview
The project is a prototype requested to [GMIT](http://www.gmit.ie) by [Best Ever Me](http://www.gmit.ie). Its target is to be an app that provides a reverse auction mechanism for beauty services offered by the clients (salons) of Best Ever Me. Users will download app and register for usage. Salons will use the same app as a service provider.

## Requirements

(Document Provided)

### Purpose

To provide a reverse auction mechanism for beauty services offered by the clients of Best Ever Me.

Users will download the app to their phone and register for usage. Salons will use the same app, but be registered as a service provider offering one or many services.

#### Salon (Provider) Experience

The salon will register providing their name, location and services offered. Different salons offer different ranges of services. The request from consumers should only go to the relevant salons - so a nail bar should not get a request for teeth whitening. They then have two types of functionality available to them:

1. Accept a request for services from the consumer. For example, "nails appointment at 1 pm".
2. Inform consumers that they have a space free due possibly to cancellation. For example, "nails appointment available at 1 pm".

#### Consumer Experience

Consumers register with the same type of details used on the Best Ever Me website. They then have two types of functionality available to them:

1. Request services from several providers within a limited time frame. For example, "nails appointment at 1 pm". They would specify a time for acceptance to allow for traveling to the salon. This is based on the premise of wanting to avail of a particular service in a location some time today.
2. The user can also see a set of broadcast from salons who have appointments available for different services at short notice. They can decide at that time to accept one of these on a firs come - first serve basis.

### Chain of events for service request

##### Consumer generates a request

The details required to make the request are:
* Geographical location (possible a town) of where the service is needed.
* Service (nails, tan, hair).
* Appointment time preference.
* Acceptance time based on the consumer travel time (they will have to decide on this).

This is then broadcast to the salons in the area specified.

##### Salon accepts request for service

The salons in the area specified by the consumer are notified on the request. Any salon can accept the request within the acceptance time provided. A message is sent through the app to app to the consumer to indicate this along with the exact time of the appointment and the cost. In the event that multiple salons answer the request, then the consumer will have to choose which one they would like to use.

##### Consumer confirms appointment

When the consumer receives acceptance from the salon(s), they must then confirm the appointment. The salon will get a confirmation message through the app and at this stage, the consumer can be charged for the service using a payment service like stripe or paypal(to be decided).

<p align="center">
  <img src="https://github.com/rndmized/BEM-App/blob/master/Assets/comm_model.png">
</p>

### Chain of events for cancellations

##### Salon offers a last minute service

A salon can broadcast an available appointment. This could happen in the event of a cancellation. The details required to generate this broadcast are:
* Geographical location (possible a town) of where the service is available.
* Service (nails, tan, hair).
* Cost
* Appointment time
* Duration (may be important)

Once these are entered, consumer who are registered in the same geographical location will get notified of the appointment.

##### Consumer accepts a last minute service

When the consumer receives the notification of a last minute appointment, they can choose to accept the appointment. If they do, then the system will check if they are the first in the queue. If they are, then the salon will get a message to indicate the consumer that has taken the appointment. If they are not first in queue, they will receive a notification to this effect.

Once the salon has got notification, they will send a message of confirmation back to the consumer and the consumer will be charged.


## Architecture

This is a Client/Server architecture with a database holding the information for both the users and the salons. The requests are generated and pushed out to users based on location and service.

<p align="center">
  <img src="https://github.com/rndmized/BEM-App/blob/master/Assets/Images-logos/Meanstack-624x250.jpg">
</p>

***

The application is written using the [MEAN](http://mean.io/) stack. MEAN is a framework for an easy starting point with MongoDB, Node.js, Express, and AngularJS based applications. It is designed to give a quick and organized way to start developing MEAN based web apps with useful modules like Mongoose and Passport pre-bundled and configured. It mainly tries to take care of the connection points between existing popular frameworks and solve common integration problems. The client side is developed using the [Ionic 2](http://ionic.io/2) framework, making the client a cross-platform app that can be built either for Android, IOS or Windows Phone using the same source code.

[MEAN](http://mean.io/) stands for: [MongoDB](https://www.mongodb.com/),[Express](https://expressjs.com/), [AngularJs](https://angularjs.org/) and [NodeJs](https://nodejs.org/en/).

<p align="center">
  <img src="https://github.com/rndmized/BEM-App/blob/master/Assets/Images-logos/7-Features-of-MEAN-Stack_785.png">
</p>

***

[MongoDB](https://www.mongodb.com/) takes care of the persistence, providing a document store database where information about customers, salons and bookings will be stored.

[Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 

[AngularJs](https://angularjs.org/) lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop. It s a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature needs.

[NodeJs](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

<p align="center">
  <img src="https://github.com/rndmized/BEM-App/blob/master/Assets/Images-logos/article-061216083709.png">
</p>

***

[Ionic 2](http://ionic.io/2) is an HTML5 mobile app development framework targeted at building hybrid mobile apps. Hybrid apps are essentially small websites running in a browser shell in an app that have access to the native platform layer. Is the front-end UI framework that handles all of the look and feel and UI interactions the app needs in order to be compelling. 
Since it is an HTML5 framework, it needs a native wrapper, in this case I used [Cordova](https://cordova.apache.org/) 

## Database Design

The database for this project is [MongoDB](https://www.mongodb.com/). MongoDB is a noSQL database. Unlike the typical Relational Database, mongo is document storage database. Documents are stored in Collections and can contain sub-documents. Documents themselves do not have to share the same attributes making it very flexible and dynamic, allowing it to scale as your project scales and adapt it. Being it looser than RDBMS it puts some more strain on the developer itself to read from the database.

<p align="center">
  <img src="https://github.com/rndmized/BEM-App/blob/master/Assets/Images-logos/mongodb-logo.png">
</p>

***

MongoDB is part of the **M**EAN stack framework. For this project is very useful because it can be changed along the project and adapt it to the different needs as they come, not having to redesign the database all over again.

The database for this project has been hosted on [mLab](https://mlab.com/).

In order to store the required data, three types of documents have been created in three different collections: _**User, Salon**_ and _**Bookings**_.

<p align="center">
  <img src="https://github.com/rndmized/BEM-App/blob/master/Assets/Collections.PNG">
</p>

### User

***


The user collection will store users information.

* **username** - Username of the user. Needed to login.
* **full_name** - Full name of the user.
* **email** - User's email.
* **password** - User's password. Needed to authenticate user on login.
* **user_type** - Whether the user is a consumer(user) or a salon(admin).
* **created_at** - Date and time of user creation.

### Salon

***


The salon collection will store information about the salon.

* **name** - Salon's name.
* **location** - Salon's Location.
* **services** - Available services at the salon. (List)
* **description** - Short description about the salon.
* **imgsrc** - Image URL for the salon.
* **rating** - Average rating of the salon. (0 by Default)
* **review** - List of reviews from users along their ratings.
* **created_at** - Date and time of user creation.

### Bookings

***


The bookings collection will store the details about bookings.

* **username** - User's username who requested the booking.
* **location** - Location requested.
* **service** - Service requested.
* **date** - Booking's day to be taken place.
* **time** - Time of the day of the booking.
* **timeMargin** - Minutes of the time.
* **travelTime** - Margin of time before request expires. (From date backwards)
* **status** - Booking Status, it might be: _'new','pending','accepted','completed','reviewed','expired'._
* **candidates** - List of salons available for booking.
* **selected** - Salon selected out of candidates.
* **imgsrc** - Image URL of booking location.
* **id** - Booking id.
* **created_at** - Date and time of booking creation.
## Installation

In order to install both the application and the server there are some requirements that must be met.

### Server

The server side uses [NodeJs](https://nodejs.org/en/) and several modules. Their website provide the necessary information to install node and its package manager. Using the package manager, the required modules can be installed. [NOTE: Modules should be ready and available in this repository already]

```
npm install morgan cors express errorhandler mongoose body-parser helmet
```

More info about the server side [here](https://github.com/rndmized/BEM-App/wiki/7.-Server-Side).

### Client 

The client side is written in Ionic 2. Ionic can be installed using the node package manager (npm):

```
npm install -g ionic cordova
```

More info about the client side [here](https://github.com/rndmized/BEM-App/wiki/6.-Client-Side).

## Deployment

The server is currently deployed in the cloud using [AWS](https://aws.amazon.com). The client side is compiled and ready to install in your andorid device [here](pending) <- PENDING.

## Authors

* **Albert Rando** - *Design and Development* - [rndmized](https://github.com/rndmized)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/rndmized/BEM-App/blob/master/LICENSE) file for details

## Acknowledgments and References

* Templates and Tutorials to start developing the application were found at: [Devdactic](https://devdactic.com/)





