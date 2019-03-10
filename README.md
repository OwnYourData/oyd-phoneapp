# <img src="https://github.com/OwnYourData/oyd-mobile/raw/master/assets/logo_grey.png" width="92"> OYD-Mobile    
Die [OwnYourData](https://www.ownyourdata.eu) App ermöglicht den Zugriff auf deine Apps und Daten von deinem Smartphone. Zusätzlich hast du die Möglichkeit deine Ortsdaten im Datentresor zu protokollieren.

&nbsp;    

<p align="center">
  <a href="https://itunes.apple.com/us/app/ownyourdata/id1176891221?mt=8">
    <img alt="Download on the App Store" title="App Store" src="http://i.imgur.com/0n2zqHD.png" width="140">
  </a>

  <a href="https://play.google.com/store/apps/details?id=com.ownyourdata">
    <img alt="Get it on Google Play" title="Google Play" src="http://i.imgur.com/mtGRPuM.png" width="140">
  </a>
</p>



## Verbessere den mobilen Zugriff auf den OwnYourData Datentresor

Bitte melde Fehler oder Vorschläge im [GitHub Issue-Tracker](https://github.com/OwnYourData/oyd-phoneapp/issues) und halte dich dabei an die [Contributor Guidelines](https://github.com/twbs/ratchet/blob/master/CONTRIBUTING.md).

Wenn du selbst an der App mitentwickeln möchtest, folge diesen Schritten:

1. Fork it!
2. erstelle einen Feature Branch: `git checkout -b my-new-feature`
3. Commit deine Änderungen: `git commit -am 'Add some feature'`
4. Push in den Branch: `git push origin my-new-feature`
5. Sende einen Pull Request


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
