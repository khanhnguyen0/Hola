package com.drone_map_mockup;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactnativenavigation.NavigationApplication;
import android.support.annotation.Nullable;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  //   @Override
  //   public boolean getUseDeveloperSupport() {
  //     return BuildConfig.DEBUG;
  //   }
  //
  //   @Override
  //   protected List<ReactPackage> getPackages() {
  //     return Arrays.<ReactPackage>asList(
  //         new MainReactPackage(),
  //           new LinearGradientPackage(),
  //         new MapsPackage()
  //     );
  //   }
  // };

  @Override
public boolean isDebug() {
  // Make sure you are using BuildConfig from your own application
  return BuildConfig.DEBUG;
}

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add the packages you require here.
  // No need to add RnnPackage and MainReactPackage
  return Arrays.<ReactPackage>asList(
        new LinearGradientPackage(),
        new MapsPackage()
  );
}


  // @Override
  // public ReactNativeHost getReactNativeHost() {
  //   return mReactNativeHost;
  // }
  //
  // @Override
  // public void onCreate() {
  //   super.onCreate();
  //   SoLoader.init(this, /* native exopackage */ false);
  // }
}
