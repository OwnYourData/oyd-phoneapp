package com.ownyourdata;

import android.view.View;
import com.reactnativenavigation.controllers.SplashActivity;
import android.content.Intent;
import android.content.res.Configuration;
public class MainActivity extends SplashActivity {

	@Override
	public View createSplashLayout() {
		return new View(this);   // <====== TO AVOID WHITE BACKGROUND
	}
}
