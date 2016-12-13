# GraphQL Support for Schedule 70 API

A simple GraphQL wrapper for the [Schedule 70 REST API](https://github.com/mheadd/s70-api).

## Set up

* Clone this repo and install dependencies: ```npm install```.
* [Start the Schedule 70 API](https://github.com/mheadd/s70-api#usage) and update the ```config.js``` file in this repo with the details of where it is running.
* Start the GraphQL endpoint: ```npm start```.

## Usage

Get results for all contractors:

```bash
~$ curl -X POST -H "Content-Type:application/graphql"  \
  -d 'query { all_contractors { Contract_Number } }' http://[host]:[port]
```

Get results for a specific state:

```bash
~$ curl -X POST -H "Content-Type:application/graphql"  \
  -d 'query { contractors_by_state(state: "ny") { Contract_Number, State, City} }' http://[host]:[port]
```

## Sample response

```
{
  "data": {
    "contractors_by_state": [
      {
        "Contract_Number": "GS-35F-0027V",
        "State": "NY",
        "City": "NEW YORK"
      },
      {
        "Contract_Number": "GS-35F-0042L",
        "State": "NY",
        "City": "ROCHESTER"
      },
      {
        "Contract_Number": "GS-35F-0073W",
        "State": "NY",
        "City": "NEW YORK"
      }
    ]
  }
}
```
