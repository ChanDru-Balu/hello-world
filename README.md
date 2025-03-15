# IONIC CAPACITOR BUILD

## 1. First Check the Basic Build Variables

### Java:
```sh
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
java -version
```

### Android/SDK:
```sh
export ANDROID_HOME=$HOME/Android/Sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH
```

## 2. Run Trapeze for Configuration (Versioning, Permissions, etc.)
```sh
npx trapeze run config.yaml
```

## 3. Add Android Platform to Capacitor
```sh
npx cap add android
```

## 4. Sync Local Build Files with Android Build Files
```sh
npx cap sync android
```

## 5. Build the Android Application (Debug)
```sh
cd android
./gradlew assembleDebug
```

## 6. Create a Script for the Build

Create a file named `build-apk.sh` and add the following content:

```sh
#!/bin/bash

# Step 1: Run Trapeze for configuration
echo "Running Trapeze..."
npx trapeze run config.yaml

# Step 2: Add Android Platform
echo "Adding Android platform..."
npx cap add android

# Step 3: Sync with Capacitor
echo "Syncing Capacitor with Android..."
npx cap sync android

# Step 4: Build APK
echo "Building Android APK (Debug Mode)..."
cd android
./gradlew assembleDebug

# Step 5: Notify completion
echo "APK build process completed!"
```

## 7. Change Permission for the Script
```sh
chmod +x build-apk.sh
```

## 8. Add Build Command in `package.json`

Edit `package.json` and add the following script:

```json
"scripts": {
  "build:apk": "./build-apk.sh"
}
```

Now, you can run the build process using:
```sh
npm run build:apk
```

This will automate the process of building your Ionic Capacitor Android APK.
