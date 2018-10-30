# Project Structure

```
App
|------------App.js
|------------Components
|            |------------PrimaryButtonExample
|            |		      |---------------PrimaryButtonExample.js
|            |		      |---------------PrimaryButtonStyleExample.js
|------------Config
|            |------------ProductionConfig.js
|            |------------DevConfig.js
|            |------------index.js
|------------Containers
|            |------------HomeScreen
|            |		      |---------------HomeScreen.js
|            |		      |---------------HomeScreenStyle.js
|            |------------DetailScreen
|            |		      |---------------DetailScreen.js
|            |		      |---------------DetailScreenStyle.js
|------------Navigation
|            |------------AppNavigation.js
|            |------------AppNavigationStyle.js
|------------Services  
|            |------------Config.js
|            |------------APIModules.js
|            |------------MockModules.js
|            |------------Repository.js
|------------Theme
|            |------------ApplicationStyle.js
|            |------------Color.js
|            |------------Fonts.js
|            |------------Images.js
|            |------------index.js
|            |------------Metrics.js
|            |------------String.js
|------------Utilities
Assets
|------------Images
|            |------------Icons
|            |------------Logo.png
|            |------------BG.png
```


# Description
`App.js` - main application goes here...

### Components
+ React native components go here...
+ One `Component` can contain one or more other `Component`
+ To add a `Component`: Create a directory `<ComponentName>` includes: `<ComponentName>.js` and `<ComponentNameStyle>.js` 

### Config
+ `ProductionConfig.js` - configure for production
+ `DevConfig.js` - configure for development

### Containers
+ `Containers` are full screens.
+ To add a screen: Create a directory `<ScreenName>` includes: `<ScreenName>.js` and `<ScreenNameStyle>.js`

### Navigation
This App use [react-navigation](https://reactnavigation.org/) to handle the navigation
+ `AppNavigation.js` - loads initial screen and navigation configuration
+ `AppNavigationStyle.js` - styling for the navigation

### Services
+ `Config.js`- configure for Axios
+ `APIModules.js` - call API from backend
+ `MockModules.js` - mocking API for sample data
+ `Repository.js` - API handler

### Themes:
Styling themes used throughout app styles. Read more intruction in `Themes\README.md`
+ `ApplicationStyles.js` - app-wide styles
+ `Colors.js` - defined colors for app
+ `Fonts.js` - defined fonts for app
+ `Images.js` - loads and caches images used in this app
+ `Metrics.js` - useful measurements

### Utilities
+ Function for some utility purposes

### Assets
+ Store necessary assets (images, videos, sounds...) 