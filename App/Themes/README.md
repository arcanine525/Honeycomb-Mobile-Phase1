### Themes Folder
Application specific themes
* Base Styles
* Fonts
* Metrics
* Colors

The default `Themes` we base on `Ignite2`

## Add new image
* Define it like this `<Your_image_name>: require('<path_to_you_image>')` in `Images.js`
* To use it, easy pass it to the `Image` component like this `<Image source={Images.<Your_image_name>}/>`. Don't forget to `import` neccessary `Components` 

## Define your Color
* Define it like this `<Your_defined_color_name>: <Your_color_code>` in `Color.js`

## Define your Metrics
* Define it like this `<Your_metric_name>: <Your_metric>` in `Metrics.js`

## Customize your Fonts 
* You can define your own Font (types, size, style) in `Fonts.js`

## Define your own String
* You define your `String` (for multi-languge purpose, etc) in `String.js` like this 
    ```
    hello: {
        vi: "Xin chào",
        en: "Hello"
    }
    ```
## Customize your Application Styles
* You can re-define your own Stlyles in `Styles.js`. This file is for a reusable grouping of Theme items. Similar to an XML fragment layout in Android
