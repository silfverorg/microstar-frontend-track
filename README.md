# microstar-frontend-track
Tracking library for frontend


## Installation
`npm install microstar`


## Usage

```js

var microstar = require('microstar');
microstar.init({
  server_url: 'localhost:3000',
  sessionVariables: {
    user_id: 1,
  }
});

microstar.track('test', {value: 'testValue'});
```
