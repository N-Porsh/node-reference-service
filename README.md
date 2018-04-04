# Node Reference Service
```                                                                                                                          

  _____       __                                    _____                 _            _     
 |  __ \     / _|                                  / ____|               (_)          (_)    
 | |__) |___| |_ ___ _ __ ___ _ __   ___ ___ _____| (___   ___ _ ____   ___  ___ ___   _ ___ 
 |  _  // _ \  _/ _ \ '__/ _ \ '_ \ / __/ _ \______\___ \ / _ \ '__\ \ / / |/ __/ _ \ | / __|
 | | \ \  __/ ||  __/ | |  __/ | | | (_|  __/      ____) |  __/ |   \ V /| | (_|  __/_| \__ \
 |_|  \_\___|_| \___|_|  \___|_| |_|\___\___|     |_____/ \___|_|    \_/ |_|\___\___(_) |___/
                                                                                     _/ |    
                                                                                    |__/     

```

Quick Start
------------------

```
$ cd reference-service
$ yarn
```


Starting service
------------------

* Run `npm start` to start the service.
* Run `npm run watch` to start the service (PM2).


API
------------------

#### Example (POST)
**Url:** _/api/myjar-reference-service/v1/example_

**Example Payload**
```json
{
	"name": "canbewhatever4validationexample"
}
```

**Example Response**
```json
{
    "status": 200,
    "message": "Some random hello worlds",
    "data": [
        {
            "text": "Hello World 1"
        },
        {
            "text": "Hello World 2"
        }
    ]
}
```

