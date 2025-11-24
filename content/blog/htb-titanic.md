+++
title = 'Hack the Box - Titanic'
date = 2025-03-05T15:01:00+01:00
draft = false 
[params]
  difficulty = "easy"
  shortdesc = ""
+++

This is my first writeup which will be added to the Hack The Box series.

```
[fuzzywood] nmap 10.10.11.55 -sV
Starting Nmap 7.95 ( https://nmap.org ) at 2025-03-05 02:26 CET
Nmap scan report for titanic.htb (10.10.11.55)
Host is up (0.13s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.10 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.52
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 21.88 seconds
```

So nothing particularly catches the eye right now. The Version guess also doesn't seem to show any exploitable versions. So let start with looking at the webpage

![Overview of the webpage](/images/htb-titanic/webpage.png)

So it looks like a booking system. I could now deepdive a bit more, try to look for subdomains or anything further but since it is a easy system I am trying to look at the Booking System first, because at first sight it is the only endpoint for user input.

I try to curl a request to the enpoint which is

> <http://titanic.htb/book>

Lets try a normal looking request and look at the response.

```
[fuzzywood] curl -X Post -d "name=marc" -d "email=test@user.net" -d "phone=12345678" -d "date=2027-01-01" -d "cabin=standard" http://titanic.htb/book
<!doctype html>
<html lang=en>
<title>Redirecting...</title>
<h1>Redirecting...</h1>
<p>You should be redirected automatically to the target URL: <a href="/download?ticket=0286bb31-401f-4623-a6a3-3723ac643090.json">/download?ticket=0286bb31-401f-4623-a6a3-3723ac643090.json</a>. If not, click the link.
```

The server responses with a download link. Lets look at the ticket, which is a json file:

```
[fuzzywood] curl -X GET "http://titanic.htb/download?ticket=ff65997a-fa6f-489d-a2a4-e3164e86e09b.json"
{"name": "marc", "email": "test@user.net", "phone": "12345678", "date": "2027-01-01", "cabin": "standard"}
```

This looks nothing special for now. We are just getting the exact same response, as we requested.
Lets try and spice things up an try to manipulate the user input with known special characters.

```
[fuzzywood] curl -X Post -d 'name=";\marc' -d "email=test@user.net" -d "phone=12345678" -d "date=2027-01-01" -d "cabin=standard" http://titanic.htb/book
[fuzzywood] curl -X GET "http://titanic.htb/download?ticket=c046e336-20bb-45fb-8e5b-1da04b246a96.json"
{"name": "\";\\marc", "email": "test@user.net", "phone": "12345678", "date": "2027-01-01", "cabin": "standard"}
```

As we can see our input clearly get sanitized here. Lets look at the download enpoint here. It takes exactly
