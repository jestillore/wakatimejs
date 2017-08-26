# wakatimejs

JavaScript library for getting data of the [WakaTime API](https://wakatime.com/developers).
Currently, you can only retrieve data by using your WakaTime *API Key*

## Install
```js
npm install wakatime
```

## Usage
```js
import {WakaTime} from "wakatime"
```

### Set API Key
```js
const wakaTimeInstance = new WakaTime('API_KEY')
```
or
```js
const wakaTimeInstance = new WakaTime()
wakaTimeInstance.apiKey = 'API_KEY'
```

### Get API Key
```js
const apiKey = wakaTimeInstance.apiKey
console.log(apiKey) // API_KEY
```

### Get current user
```js
wakaTimeInstance.currentUser()
    .then((resp) => console.log(response))
    .catch((err) => console.log(err))
})
```

## Get stats
>A user's logged time for the given time range.
Range can be one of:
* last_7_days
* last_30_days
* last_6_months
* last_year
* all_time

```js
wakaTimeInstance.stats('last_7_days').then().catch()
```

### Get summaries
>A user's logged time for the given time range as an array of summaries segmented by day.

There are four ways to get your WakaTime summaries.
1. By defining start and end date in `YYYY-MM-DD` format.
    ```js
    wakaTimeInstance.summaries({
        start: '2015-10-07',
        end: '2015-10-13'
    }).then().catch()
    ```
2. By defining start and end date in a `Date` instance.
    ```js
    wakaTimeInstance.summaries({
        start: new Date(),
        end: new Date()
    }).then().catch()
    ```

3. For single date summary, define the date in `YYYY-MM-DD` format or use a JS Date.
    ```js
    wakaTimeInstance.summaries('2015-10-13').then().catch()
    wakaTimeInstance.summaries(new Date()).then().catch()
    ```
 
    
### Get durations
>A user's logged time for the given day as an array of duration blocks.
There are two days to get durations.
1. By defining the target date in `YYYY-MM-DD` format.
    ```js
    wakaTimeInstance.durations('2015-10-13').then().catch()
    ```

2. By defining the target date in a `Date` instance.
    ```js
    wakaTimeInstance.durations(new Date()).then().catch()
    ```

## Authors

* **Jillberth Estillore** - *Created the library* -  [Github](https://github.com/jestillore) - [Email](mailto:ejillberth@gmail.com)
* Alexander Lichter - *Updated the library to ES6* - [Github](https://github.com/manniL) - [StackOverflow](http://stackoverflow.com/users/3975480/mannil)

## License
MIT
