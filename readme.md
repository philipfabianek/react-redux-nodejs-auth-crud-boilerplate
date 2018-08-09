# (STILL IN DEVELOPMENT) NodeJS Boilerplate with Authentication, React, Redux and more

This is a boilerplate for creating a brand new NodeJS application from scratch. It is purely based around PassportJS (for authentication), MongoDB (NoSQL database), React and Redux.

It makes use of server-side rendering, cookies and hashing (bcrypt) and much more (check it)

## Installing

There are 3 things you have to do in order to get started:

1) Install NPM modules

```
npm install
```

2) Create simple config file (from root)

```
touch server/config/keys.js
```

3) Fill out config file the following way:

```
export default {
    mongodb: {
        dbURI: <Your database uri (for example mLab)>
    },
    session: {
        cookieKey: <Your special cookie key>
    }
}
```

## Development mode

Running dev mode is very simple.

Single command line:

```
npm run dev
```

2 command lines (recommended for output)

```
npm run webpack
```

```
npm run nodemon
```

## Production mode

In order to run production mode, your first have to compile your files, just type the following:

```
npm run webpack:prod
```

After that, you can simply run the npm start script, everything will work just as expected.

```
npm start
```

## Authors

**Philip Fabianek** - one man army. (By the way, I don't ever expect any1 to use that, it is mainly for me)

## License

This project is licensed under the MIT License.
