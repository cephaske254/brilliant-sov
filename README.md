# INSTALLATION

## Prerequisites

1. [NodeJs](https://nodejs.org/en/download/) version 16
2. [Yarn](https://yarnpkg.com/getting-started) version >=1.22.19
3. [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
4. [Git](https://git-scm.com) SCM
5. [Expo Go](https://expo.dev/client) Client

## Setup

clone the project with [git](https://git-scm.com) to your preferred location on your local computer.

```bash
    # using ssh
    git clone git@github.com:cephaske254/brilliant-sov.git
    # or using https
    git clone https://github.com/cephaske254/brilliant-sov
```

Navigate to the project root and install dependencies with [yarn](https://yarnpkg.com/getting-started).

```bash
    cd brilliant-sov
    yarn
```

Start Metro bunder

```bash
    yarn start
```

Launch [Expo Go](https://expo.dev/client) on your Android/iOS phone, and follow the instructions on how to launch the app.

## Folder Structure

```
.
├── api
├── assets
│   ├── fonts
│   └── icons
├── components
│   └── empty-states
├── contexts
├── coverage
│   └── lcov-report
├── hooks
├── screens
├── screenshots
├── store
│   ├── selectors
│   ├── slices
│   └── thunks
├── __tests__
│   ├── api
└── theme
```

## Screenshots

### Home Screen

![title](./screenshots/Home.PNG)

### Joke Detail View

![title](./screenshots/Joke.PNG)

### Joke Not Found

![title](./screenshots/Joke-Not-Found.PNG)

### Search Results

![title](./screenshots/Search.PNG)

### Search Result Not Found

![title](./screenshots/Result-Not-Found.PNG)
