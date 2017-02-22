### Setup ### 

You should have ionic setup on your PC 

Clone this repo. The platforms & plugins directory are part of .gitignore so they will come empty. 

Run
```
cordova prepare
```
to fetch all the plugins & platforms (android 23). These are all specified in config.xml

If you add any new plugin or platform, run 
```
cordova plugin save
cordova platform save
```
to save the plugins & changes in config.xml as per [this stackoverflow thread](http://stackoverflow.com/questions/30333494/ionic-plugin-need-to-remove-platform-and-readd-platform-before-it-work)
