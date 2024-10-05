# URL Shortener Microservice

This is a solution for the URL Shortener fcc Project.

## About
This microservice has two endpoints at `/api/shorturl` and `/api/shorturl/:shorturl`. The first accepts a POST with a url value, and outputs a json containing the original url and a 'short_url', which is a number. This number can be used in the second endpoint, redirecting to your original url.