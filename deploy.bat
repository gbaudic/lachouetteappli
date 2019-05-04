set "VERSION=0.2.0"

"%JAVA_HOME%\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore gwilherm.baudic.jks app-release-unsigned.apk gbaudic

"%ANDROID_HOME%\build-tools\27.0.3\zipalign.exe" -v 4 app-release-unsigned.apk LaChouetteAppli-%VERSION%.apk