# ![ico-30 icon] localhost⟪localhost⟫

## ![ico-25 icon] IP⟪IP⟫

Everything connected to the Internet has an **_IP_** address, which uniquely identifies the Internet-connected device

There are two types of **_IP_** addresses: _public_ and _private_

Public addresses are accessible to everyone on the Internet

Private addresses are only accessible within a _local network_

For example, ~192.168.1.100~ is a private IP address

It will never be a public IP address,
and there are millions of IP addresses like ~192.168.1.100~ in the world

## ![ico-25 icon] Router⟪Router⟫

A device called a **router** is responsible for exchanging data packets between the local network and the public Internet

The router has a function which, for every Internet message (packet), creates a local IP address that uniquely corresponds to a public IP address, and vice versa (for returning packets)

## ![ico-25 icon] Domain Name System⟪Domain_Name_System⟫

Most public IP addresses have names known as DNS hostnames,
and so do many local IP addresses

For example, ~www.google.com~ is a DNS hostname that has an IP address

If you type [echo command](https://ab57.ru/cmdlist/ping.html) in the command-line interpreter

••ping www.google.com••

you can see that the computer has translated this hostname into an IP address, for example ~173.194.73.106~, and is sending packets to it

![](https://github.com/garevna/js-course/blob/master/images/lessons/ping.png?raw=true)

____________________________________________________


Any device connected to the Internet has the universal hostname **_localhost_**,
and the universal IP address for **_localhost_** is the private IP address **~127.0.0.1~**

This address is not recognised by the router
Only the device (computer) ‘sees’ it

____________________________________________________


The optional prefix **_www_** in a website’s hostname implies that the internet device or host is responsible for serving an application on the **World Wide Web**

There are many types of applications that run on the Internet, not just on the World Wide Web, including, for example, email and FTP (File Transfer Protocol)

## ![ico-25 icon] Port⟪Port⟫

Data packets arriving at a device from the Internet almost always have a **port** allocated to them

This is a number in the range from 0 to 64k (65536)
^^with the exception of certain reserved numbers and ranges^^

The World Wide Web uses port **80**

Email sent via the SMTP protocol uses port 25 (or 465 and 587)

**Ports** are simply identifiers on packets that indicate which application the data packets are intended for

Network software will listen on this port

When developers deploy a web application, they usually bind it to an alternative port rather than port 80

Port **8080** is often used for this purpose
^^The number could be almost any port, for example, 2018 or 12345^^
^^But 8080 is convenient because it is different from port 80, yet it is very similar to 80^^

![ico-20 warn] Only one application can listen on a specific port on a given device
^^(the port number must be unique)^^

So,

**_~localhost:8080~_** 

this means

••this computer (127.0.0.1), an application on port 8080••

or (if it is connected to a network)

••http://localhost:8080/••

How this URL is constructed:

~~~console
{scheme}://{hostname}:{port}{path}
~~~

• ~{scheme}~ - **http** 
• ~{hostname}~ - **localhost**
• ~{port}~ - **8080**
• ~{path}~ - **/**

The **HTTP** (HyperText Transfer Protocol) used by the World Wide Web requires the hostname to be included in the request as a header or passed directly to the application

^^So, **_http://127.0.0.1:8080/_**, where **localhost** is replaced by the IP address **127.0.0.1**, will reach the target application, but may not work correctly if the network application expects a request to **localhost**^^

____________________________________________________


The _Internet_ is a network infrastructure connecting millions of computers within the _Internet_ network
Any two computers connected to the Internet can communicate with one another

The _World Wide Web_ is a way of accessing information via the _Internet_
The World Wide Web uses the **HTTP** protocol to transfer data

____________________________________________________

