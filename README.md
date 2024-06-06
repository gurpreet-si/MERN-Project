## MERN Project

## Table of Contents
- [Install](#install)
- [Usage](#usage)
	- [Generator](#generator)
- [Badge](#badge)
- [Example Readmes](#example-readmes)
- [Related Efforts](#related-efforts)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

- Clone or download `the project folder` and then unzip the files.
- go to the root directory of the foodi-client and foodi-server, you can use `cd space folder-name` to change the folder directory.

### For Frontend 
- follow the command to run the client site: 

```sh
$ npm install
```
```sh
$ npm run dev
```
```sh
$ add a .env.local file and include the following environment variables
```

```
VITE_APIKEY= from firebase
VITE_AUTHDOMAIN= from firebase
VITE_PROJECTID= from firebase
VITE_STORAGEBUCKET= from firebase
VITE_MESSAGINGSENDERID= from firebase
VITE_APPID= from firebase
VITE_IMAGE_HOSTING_KEY= from imgbb api
VITE_Stripe_PK= stripe key
```

### For Backend
- follow the command to run the server site: 
```sh
$ npm install
```
```sh
$ npm start
```
```sh
$ add a .env file and include the following environment variables
```
```
DB_USER = mongodb_username
DB_PASS = mongodb_password


