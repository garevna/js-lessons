# ![ico-30 study] API

[** ♫**](sounds/eng/api.mp3)

**_Application Programming Interface_** (**API**) allows two systems to communicate with each other.

@@@@
![](illustrations/api-02.png)
Suppose there is a set of services external to your application that greatly extend the functionality of your application.
If there is some kind of API that provides you with access to these services, then this is an API.<br>That is, you do not need to include these services in your application, it does not matter to you what language they are written in, you only need to know how to activate them.
![](illustrations/api-01.png)
@@@@

_________________________

Running on the client, your code constantly uses [**client-side web APIs**](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/)<br>(e.g., **~DOM API~**, **~Audio API~**, **~Fetch API~**, **~File API~**, **~Notification API~**, **~IndexedDB API~**).

[![ico-25 link] Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/)

You can connect to many web APIs remotely (e.g., [![ico-70 firebase]](https://firebase.google.com/) or [![ico-35 google-maps]](https://developers.google.com/maps/documentation/javascript/)).
_________________________

## ![ico-25 icon] CRUD

[** ♫**](sounds/eng/api-crud.mp3)

As a rule, any application interacts with its backend API on the server.
A backend API provides an application with access to data stored on the server using **CRUD** methods.

^^^[CRUD]

**CRUD** (_create_, _read_, _update_, _delete_) are the four basic types of requests to the server.

To identify the type of request, an **access method**, or **verb**, is used to identify the operation on the resource.

| **GET** | **POST** | **PUT** | **PATCH** | **DELETE** | **HEAD** |

| ~read~   | **GET**    | retrieve the data                            |
| ~create~ | **POST**   | create new resource (new record)             |
| ~update~ | **PUT**    | update existing resource by id               |
| ~update~ | **PATCH**  | partial update of an existing resource by id |
| ~delete~ | **DELETE** | delete resource by id                        |
| ~read~   | **HEAD**   | retrieve information about the resource      |

^^You don't care whether the data is stored on the server as separate files or as records in a database.^^

^^^
____________________

## ![ico-25 icon] Request & Response

[** ♫**](sounds/eng/api-request-response.mp3)

Any API works on the principle of "request" — "response".
Your application sends a request, and if the request is valid, the API sends a response to the application.

The form of the request depends on the API.
This can be a method such as, **~setTimeout~** or **~fetch~**.
This can be an object whose properties and methods give you access to the capabilities of the browser API. All **~BOM~** and **~DOM~** objects are elements of the browser API.
This can be a constructor that you use to create objects that give you access to the capabilities of the browser API. For example, the **~XMLHttpRequest~** constructor or the **~FileReader~**.

__________________________________

### ![ico-25 icon] Resource

[** ♫**](sounds/eng/api-resource.mp3)

The main thing when interacting with the server API is to determine the concept “resource” and assign a unique identifier to each resource.

^^For example, the resource can be information about the user. Then, knowing the unique identifier of the resource, you can send a request to the server API to obtain user data by its identifier (**GET**), you can send a request to change user data (**PUT** or **PATCH**) or send a request to create a new user (**POST**).^^

Thus, when interacting with a remote API, by the term “resource” we mean a **certain piece of information that has a unique identifier**.

^^The difference between **URL** (Uniform Resource Locator) and **URI** (Uniform Resource Identifier) ​​is precisely that the **URL** specifies the exact location of the resource on the server, while the **URI** specifies only the resourceid. **URI** provides greater flexibility of the server API in terms of data placement and the form of its storage.^^

A resource can be a file stored on a server or a single record in a database.

For example, an image file may be stored on the server, but the same image may be stored in the database as a text string in the format of [**Base64**](https://www.base64encode.org/).

_____________________________________

## ![ico-25 icon] API endpoints

[** ♫**](sounds/eng/api-endpoints.mp3)

Each API has documentation and specifications that define how information is transferred.

^^^[![](icons/swagger.png)]
![](illustrations/api-endpoints-01.png)
^^^

APIs can use HTTP requests to obtain information from a web application or web server.

In the case of a REST API, the request is made over the Internet, and takes the form of a certain web address called **~endpoint~** (access point to the remote API).

^^^[![](icons/endpoint-icon.png)]
^^The term "endpoint" is used not only in the context of REST APIs, but also in a broader sense in the field of information technology and networking.^^
^^• In network protocols, endpoint can refer to any communication endpoint in a network, whether it is an IP address and port in TCP/IP, or an endpoint in message routing.^^
^^• In SOAP (Simple Object Access Protocol) API endpoint also denotes the URL to which SOAP messages are sent. This is similar to the REST API, but is used in other protocols and data formats.^^
^^• In the GraphQL API endpoint represents a single endpoint through which a client can request specific data using complex queries.^^
^^• In microservices, an endpoint can denote any entry point for interacting with an individual microservice. Each microservice can have its own endpoints for different functionality.^^
^^• More generally, an endpoint can refer to any point through which a resource or service is accessed, whether within a system or between different systems.^^
^^^

**~endpoint~** is a URI-like string that the API provides to you to access resources remotely.

Let's figure out what this line includes.
Let's start with the fact that API itself has **URL**, for example: ~https://api.example.com~. And this **URL** will be present in every endpoint.
However, to access a resource, you need to specify which resource you are interested in and what you want to do with this resource (get a resource, create a new one, delete or update an existing one).
**~endpoint~** contains all this information.

As we said earlier, each resource has a unique identifier and a number of different operations can be performed on each resource (read, create, delete, update/change).

Thus, **~endpoint~** is neither a **URL** (because it contains no information about the location of the resource) nor a **URI** (because it includes not only the resource identifier, but also information about the operation of the resource).

![ico-25 warn] If some operation on a resource is valid, then there is an **~endpoint~** for it.
![ico-25 warn] If there is no such **~endpoint~**, then this operation with the resource is impossible.

^^^[![](icons/swagger.png)]
![](illustrations/api-endpoints-02.png)
^^^

^^^[![](icons/swagger.png)]
![](illustrations/api-endpoints-04.png)
^^^

^^^[![](icons/coffee.png)]
^^Let's take the example of the ~https://api.example.com~ API.^^
^^Suppose you have a database of users stored on a server.^^
^^API allows you to get a list of all the users and gives you a **~endpoint~** to do this:^^

••https://api.example.com/users/all••

^^To get the information of a specific user with a unique identifier **iserId** the endpoint will be different:^^

••https://api.example.com/users/${iserId}••

^^To create a new user (**POST**):^^

••https://api.example.com/user/create••

^^For complete replacement of all user data (**PUT**):^^

••https://api.example.com/user/change/${iserId}••

^^For partial modification of user data (**PATCH**):^^
••https://api.example.com/user/update/${iserId}••

^^And to delete a user (**DELETE**):^^

••https://api.example.com/user/remove/${iserId}••

^^The server API parses the request address, and if this string matches one of the valid options, and if you have permissions to perform such operations, your request is executed.^^

^^^

An endpoint in a REST API is the point that the client accesses to interact with the server.
It is not just a URL, but a combination of an API address and a route, which includes a resource identifier and information about what action to perform. It's like a web address, but with extra parts that specify what exactly needs to be done with the data.
______________________________________________

## ![ico-25 icon] web service

**Terms:**

• ^^![ico-20 pin] **SOA** is a service-oriented architecture of web applications (a set of architectural principles).^^
• ^^![ico-20 pin] **RPC** is a remote procedure call.^^
• ^^![ico-20 pin] **Service** is a set of operations that accept a Request and issue a Response.^^
• ^^![ico-20 pin] **Web service**  is a software system identified by a web address with standardized interfaces.^^

Web services can communicate with each other and with other applications using notifications based on specific protocols.

The most widely used protocols for implementing web services are:

![ico-20 green-ok] **SOAP**    (_Simple Object Access Protocol_)
![ico-20 green-ok] **REST**    (_Representational State Transfer_)
![ico-20 green-ok] **XML-RPC** (_XML Remote Procedure Call_)

_________________________________________

### ![ico-20 icon] REST API

The basic principle of **REST** is to limit the set of operations — only **CRUD** (~Create~ ~Read~ ~Update~ ~Delete~) operations are used.

The architectural style of **REST** in most cases involves the use of the **HTTP** protocol.

Therefore, **CRUD** commands have been converted to **~POST~** — **~GET~** — **~PUT~** — **~DELETE~** **HTTP** methods.

^^^[![](icons/postman.png)]
![](illustrations/api-rest-postman.png)
^^^

___________________________________________

### ![ico-20 icon] SOAP vs REST

APIs are typically classified as **SOAP** or **REST**, and both are used to access web services.

![ico-20 green-ok] **SOAP**: XML is used for messaging.
![ico-20 green-ok] **REST**: URLs are used to receive or send information.

**REST** uses four different HTTP 1.1 verbs (~GET~, ~POST~, ~PUT~ и ~DELETE~).

Unlike SOAP, REST doesn't have to use XML to provide a response.

There are REST-based web services that output data in the following format:

| ^^• Command Separated Value (CSV)^^ |
| ^^• JavaScript Object Notation (JSON)^^ |
| ^^• Really Simple Syndication (RSS)^^ |

^^You can get the result in a format that is easier to parse in the language of your application.^^

_____________________________________
