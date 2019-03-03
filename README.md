# OwnYourData Mobile App

Android
Background task works with headless when in the app is in the background.

Test - plug the phone in via usb
- yarn ta
once launched
- yarn run-job
open a new terminal
- yarn log-job


App.js has launch func line 64


<p align="center">
  <a href="https://www.ownyourdata.eu/">
    <img alt="OwnYourData" title="OwnYourData" src="https://i0.wp.com/www.ownyourdata.eu/wp-content/uploads/2016/06/Logo-%C2%A9-OwnYourData.jpg?ssl=1" width="450">
  </a>
</p>

<p align="center">
  Your personal data vault.
</p>

<p align="center">
  <a href="TODO: Link">
    <img alt="Download on the App Store" title="App Store" src="http://i.imgur.com/0n2zqHD.png" width="140">
  </a>

  <a href="TODO: Link">
    <img alt="Get it on Google Play" title="Google Play" src="http://i.imgur.com/mtGRPuM.png" width="140">
  </a>
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Build Process](#build-process)

## Introduction

TODO: Add Intro Text

**Available for both iOS and Android.**

## Features

A few of the things you can do with the OwnYourData app:

* Connect to your private data vault or use one provided by OwnYourData.
* Access all applications from your data vault.
* Collect and encrypt your location data and sent them to your data vault.

## Build Process

- Follow the [React Native Guide](https://facebook.github.io/react-native/docs/getting-started.html) for getting started building a project with native code. **A Mac is required if you wish to develop for iOS.**
- Clone or download the repository from GitHub.
- Run `yarn` to install the dependencies.
- Run `yarn start` to start the packager.
- Use Android Studio and Xcode to build and install the APK on your simulator or phone.
- Activate `Remote JS Debugging` via the [In-App Developer Menu](https://facebook.github.io/react-native/docs/debugging.html) to get more insights via [React Native Debugger](https://github.com/jhen0409/react-native-debugger).

## Deploy to test flight

- Run `yarn testflight`

## Deploy to play store

- Run `yarn android-beta`
- apk will be built in the ./android/app/build/outputs/apk/release/app-release.apk
- upload to play store
