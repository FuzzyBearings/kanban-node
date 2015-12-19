## Kanban Node

---

Currently be developed and tested on a Mac. YMMV with the following instructions.

## Installation

You may not need to perform all the steps below. While not necessary, I use [homebrew](http://brew.sh/) package manager.

```bash

# brew 
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew update

# mongodb
$ brew install mongodb

# node
$ brew install node
$ brew upgrade node

# express
$ npm install -g express-generator
$ npm install -g node-inspector

```

```bash
$ git clone ...
$ cd kanban-node
$ npm install
```

- update package.js with mongod and monk dependencies
- update app.js with request interceptor with database reference 

## Startup

```bash
# terminal
$ mkdir data
$ mongod --dbpath ./data

# new terminal
$ npm start
```
