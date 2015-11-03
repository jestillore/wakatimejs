# wakatimejs

JavaScript client for consuming the [WakaTime API](https://wakatime.com/developers).

## Install
```js
npm install wakatime
```

## Usage
```js
var WakaInstance = require('wakatime');
```

### Set API Key
```js
var wi = new WakaInstance('API_KEY');
```
or
```js
var wi = new WakaInstance();
wi.setAPIKey('API_KEY');
```

### Get API Key
```js
var apiKey = wi.getAPIKey();
console.log(apiKey); // API_KEY
```

### Get current user
```js
wi.currentUser(function (error, response, user) {
    if (!error && response.statusCode == 200) {
        // the third parameter holds the user object
    }
});
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
wi.stats('last_7_days', function (error, response, stats) {
    
});
```

### Get summaries
>A user's logged time for the given time range as an array of summaries segmented by day.

There are four ways to get your Waka summaries.
1. By defining start and end date in `YYYY-MM-DD` format.
    ```js
    wi.summaries({
        start: '2015-10-07',
        end: '2015-10-13'
    }, function (error, response, summary) {
        
    });
    ```
2. By defining start and end date in a `Date` instance.
    ```js
    wi.summaries({
        start: new Date(),
        end: new Date()
    }, function (error, response, summary) {
    
    });
    ```

3. For single date summary, define the date in `YYYY-MM-DD` format.
    ```js
    wi.summaries('2015-10-13', FUNCTION (error, response, summary) {
        
    });
    ```
    
4. For single date summary, define the date in a `Date` instance.
    ```js
    wi.summaries(new Date(), function (error, response, summary) {
        
    });
    ```
    
### Get durations
>A user's logged time for the given day as an array of duration blocks.
There are two days to get durations.
1. By defining the target date in `YYYY-MM-DD` format.
    ```js
    wi.durations('2015-10-13', function (error, response, body) {
        
    });
    ```

2. By defining the target date in a `Date` instance.
    ```js
    wi.durations(new Date(), function (error, response, body) {
        
    });
    ```

## License
MIT © [Jillberth Estillore](mailto:ejillberth@gmail.com)
