package com.hackon;

import static androidx.core.app.ActivityCompat.*;

import android.Manifest;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Objects;

public class MessageModule extends ReactContextBaseJavaModule {

    private static final int REQUEST_SMS_PERMISSION = 123;

    public MessageModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "MessageModule";
    }

    @ReactMethod
    public void readSmsMessages(Promise promise) {
        Log.d("MessageModule", "Inside Message Module");
        if (checkSmsPermission()) {
            try {
                Uri uri = Uri.parse("content://sms");
                Cursor cursor = Objects.requireNonNull(getCurrentActivity()).getContentResolver().query(uri, null, null, null, null);

                if (cursor != null && cursor.moveToFirst()) {
                    WritableArray smsMessagesArray = Arguments.createArray();

                    do {
//                        String body = cursor.getString(cursor.getColumnIndexOrThrow("body"));
//                        smsMessagesArray.pushString(body);
                        String body = cursor.getString(cursor.getColumnIndexOrThrow("body"));
                        String sender = cursor.getString(cursor.getColumnIndexOrThrow("address")); // Sender's number
                        long timeMillis = cursor.getLong(cursor.getColumnIndexOrThrow("date")); // Time in milliseconds
                        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
                                .format(new Date(timeMillis));

                        WritableMap smsDetails = Arguments.createMap();
                        smsDetails.putString("body", body);
                        smsDetails.putString("sender", sender);
                        smsDetails.putString("time", time);

                        smsMessagesArray.pushMap(smsDetails);
                    } while (cursor.moveToNext());

                    cursor.close();
                    promise.resolve(smsMessagesArray);
                } else {
                    Log.d("MessageModule", "No SMS messages found.");
                    promise.reject("NO_SMS", "No SMS messages found.");
                }
            } catch (Exception e) {
                Log.d("MessageModule", "Error");
                promise.reject("ERROR", e.getMessage());
            }
        } else {
            requestSmsPermission();
            Log.d("MessageModule", "Permission Denied");
            promise.reject("PERMISSION_DENIED", "Permission denied. Requesting permission.");
        }
    }

    private boolean checkSmsPermission() {
        return checkSelfPermission(getReactApplicationContext(), Manifest.permission.READ_SMS) == PackageManager.PERMISSION_GRANTED;
    }

    private void requestSmsPermission() {
        requestPermissions(Objects.requireNonNull(getCurrentActivity()), new String[]{Manifest.permission.READ_SMS}, REQUEST_SMS_PERMISSION);
    }
}
