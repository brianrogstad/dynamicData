# Contacts App
Simple MEAN Stack Contacts App

Built from scratch as a learning process.
Knowing very little Node and Mongo I followed along with many tuts and read a bunch.

A lot of credit goes to John Papa, I followed his course on http://pluralsight.com<br>
My gulp files ended up mirroring his project files as I followed along. I even borrowed his directory structure.
The course was a massive help expanding and explaing my simple gulp tasks that I had started<br>

His tutorial repo can be found here https://github.com/johnpapa/gulp-patterns


## Requirements
- Install Node
- Install MongoDB

In terminal get mongo running on default port 27017
```bash
$ mongod
```

- Create DB that re-uses my naming conventions

Enter the mongo shell
```bash
$ mongo
```

Add DB to use
```bash
$ use contacts
```

Add a blank contact to collection that matches the schemea I’ve created
```bash
$ db.contacts.insert({name: "", phone: ""})
```


## Start App
Clone repo and run the content locally
```bash
$ npm install
$ bower install
$ gem install scss_lint
$ gulp serve-dev
```

## List Gulp Tasks
To see a full list of all gulp tasks refer to GULP-TASKS.md<br>
Use gulp or gulp help in terminal to see the short list

```bash
$ gulp
```
```bash
$ gulp help
```
