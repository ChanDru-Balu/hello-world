const { execSync } = require('child_process');
const fs = require('fs');

// Define paths
const apkSourcePath = "android/app/build/outputs/apk/debug/app-debug.apk"; // Update for release if needed
const customOutputFolder = "output_apks"; // Folder where you want to save
const customApkName = "MyCustomApp.apk"; // Your desired APK name
const apkDestinationPath = `${customOutputFolder}/${customApkName}`;

try {
    console.log("Running Trapeze...");
    execSync("npx trapeze run config.yaml", { stdio: "inherit" });

    console.log("Syncing capacitor with android studio");
    if (!fs.existsSync("./android")) {
        execSync("npx cap android", { stdio: "inherit" });
    } else {
        console.log("Andorid platorm already exist!")
    }
    execSync("npx cap sync android", { stdio: "inherit" });

    console.log("Build android Apk...");
    execSync("cd android && ./gradlew assembleDebug", { stdio: "inherit" });

    // Ensure output folder exists
    if (!fs.existsSync(customOutputFolder)) {
        fs.mkdirSync(customOutputFolder, { recursive: true });
    }

    // Copy and rename the APK
    fs.copyFileSync(apkSourcePath, apkDestinationPath);

    console.log("APK build process completed!")

} catch (error) {
    console.error("Error Occured:", error)
    process.exit(1);
}