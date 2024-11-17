import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.example.glocalNews',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    discardUncaughtJsExceptions: true,
    SPMPackages: [
      {
        name: "FirebaseCore",
        libs: ["FirebaseCore", "FirebaseAuth", "FirebaseFirestore", "FirebaseStorage", "FirebaseAnalytics"]
      }
    ]
  }
} as NativeScriptConfig;