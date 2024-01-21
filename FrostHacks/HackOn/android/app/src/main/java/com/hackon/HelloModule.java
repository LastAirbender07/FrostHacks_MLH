package com.hackon;

import static androidx.core.content.ContextCompat.startActivity;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Objects;

public class HelloModule extends ReactContextBaseJavaModule {
    public HelloModule(@Nullable ReactApplicationContext reactContext){
        super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return "HelloModule";
    }

    @ReactMethod
    public void createHelloEvent(String firstName, Callback callback) {
        try {
            String msg = "Hello " + firstName;
            callback.invoke(null, msg);
            Log.d("HelloModule", "Hello: " + firstName);
        } catch (Exception e){
            callback.invoke(e, null);
        }

    }

    @ReactMethod
    public void createYoutubeEvent() {
        Log.d("HelloModule", "Inside Youtube Function");
        Intent intent;
        try {
            intent = new Intent(Intent.ACTION_VIEW);
            intent.setPackage("com.google.android.youtube");
            intent.setData(Uri.parse("https://www.youtube.com/"));
            Objects.requireNonNull(getCurrentActivity()).startActivity(intent);
        } catch (ActivityNotFoundException e) {
            Log.e("HelloModule", "YouTube app not installed: " + e.getMessage());
            intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.youtube.com/"));
            Objects.requireNonNull(getCurrentActivity()).startActivity(intent);
        }
    }

//    @ReactMethod
//    public void createTermuxEvent() {
//        Log.d("HelloModule", "Inside termux Function");
//        Intent intent;
//        try {
//            intent = new Intent(Intent.ACTION_VIEW);
//            intent.setPackage("com.termux");
//            intent.setClassName("com.termux", "com.termux.app.RunCommandService");
//            intent.setAction("com.termux.RUN_COMMAND");
//            intent.putExtra("com.termux.RUN_COMMAND_PATH", "/data/data/com.termux/files/usr/bin/top");
//            intent.putExtra("com.termux.RUN_COMMAND_ARGUMENTS", new String[]{"-n", "5"});
//            intent.putExtra("com.termux.RUN_COMMAND_WORKDIR", "/data/data/com.termux/files/home");
//            intent.putExtra("com.termux.RUN_COMMAND_BACKGROUND", false);
//            intent.putExtra("com.termux.RUN_COMMAND_SESSION_ACTION", "0");
//
//            Objects.requireNonNull(getCurrentActivity()).startActivity(intent);
//        } catch (ActivityNotFoundException e) {
//            Log.e("HelloModule", "Termux not installed: " + e.getMessage());
//            intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.youtube.com/"));
//            Objects.requireNonNull(getCurrentActivity()).startActivity(intent);
//        }
//    }
}
