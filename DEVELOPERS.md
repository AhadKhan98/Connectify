# Setting up and running the app on your machine

This document describes how to set up your development environment to run and test Connectify.
It also explains the basic mechanics of using `git`, `node`.

* [Prerequisite Software](#prerequisite-software)
* [Getting the Sources](#getting-the-sources)
* [Installing NPM Modules](#installing-npm-modules)
* [Spinnng up the Database](#spinnng-up-the-database)
* [Setting up environment variables](#setting-up-the-environment-variables)
* [Starting the server](#starting-the-server)

## Prerequisite Software

Before you can run and test Connectify, you must install and configure the
following products on your development machine:

* [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.
* [Node.js](http://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server,
  run tests, and generate distributable files.
* [Firebase](https://console.firebase.google.com/) which is used as a NoSQL database.

## Getting the Sources

Fork and clone the repository:

1. Login to your GitHub account or create one by following the instructions given
   [here](https://github.com/signup/free).
2. [Fork](http://help.github.com/forking) the [main repository](https://github.com/vrushti-mody/Connectify).
3. Clone your fork of the repository and define an `upstream` remote pointing back to
   the Connectify repository that you forked in the first place.

```shell
# Clone your GitHub repository:
git clone git@github.com:<github username>/Connectify.git

# Go to the Connectify directory:
cd Connectify

# Add the main repository as an upstream remote to your repository:
git remote add upstream https://github.com/vrushti-mody/Connectify.git
```

## Installing NPM Modules

Next, install the JavaScript modules needed to build and test Connectify:

```shell
# Install project dependencies (package.json)
npm ci
```

## Spinnng up the Database

Mail to us for access to the firebase console

## Setting up environment variables

You need to set up the Firebase Credentials here

```shell
cp .env.template .env
```

## Starting the server

```
npm start
```
