#!/bin/bash

# Step 1: Run Trapeze for configuration
echo "Running Trapeze..."
npx trapeze run config.yaml

# Step 2: Sync with Capacitor
echo "Syncing Capacitor with Android..."
npx cap add android
npx cap sync android

# Step 3: Build APK
echo "Building Android APK (Debug Mode)..."
cd android
./gradlew assembleDebug

# Step 4: Notify completion
echo "APK build process completed!"
