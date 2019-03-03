package com.ownyourdata;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.support.multidex.MultiDex;

import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.facebook.soloader.SoLoader;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.mustansirzia.fused.FusedLocationPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.horcrux.svg.SvgPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.sodium.SodiumPackage;
import com.sha256lib.Sha256Package;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import com.crashlytics.android.Crashlytics;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;

import io.fabric.sdk.android.Fabric;

import com.github.yamill.orientation.OrientationPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    public void onCreate() {
        super.onCreate();

        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onConfigurationChanged(Configuration newConfig) {
                super.onConfigurationChanged(newConfig);
                Intent intent = new Intent("onConfigurationChanged");
                intent.putExtra("newConfig", newConfig);
                sendBroadcast(intent);
            }
        });

        SoLoader.init(this, false);
        Fabric.with(this, new Crashlytics());
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new RNGeocoderPackage(),
                new FusedLocationPackage(),
                new RCTCameraPackage(),
                new ReactNativeRestartPackage(),
                new ReactNativeExceptionHandlerPackage(),
                new SvgPackage(),
                new RNSpinkitPackage(),
                new VectorIconsPackage(),
                new RNFetchBlobPackage(),
                new RNBackgroundFetchPackage(),
                new RNI18nPackage(),
                new SodiumPackage(),
                new Sha256Package(),
                new WifiCheckPackage(),
                new OrientationPackage(),
                new RNAndroidLocationEnablerPackage()
        );
    }

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    public boolean clearHostOnActivityDestroy() {
        return false;
    }
}
