[![Build Status](https://travis-ci.org/tekdreams/boundingbox-split.svg?branch=master)](https://travis-ci.org/tekdreams/boundingbox-split)

Boundingbox-split
=================

A Node.js script that for splitting a bounding box into 4^n equal smaller bounding boxes.


## Prerequisites

Node.js - Version >=4.3.2

## Installation

Use npm:

```
$ npm install boundingbox-split --save
```
Or you can clone and install HEAD:

```
git clone https://github.com/tekdreams/boundingbox-split.git
cd boundingbox-split
npm install
```

## Getting Started

```
const bbox = require(boundingbox-split);
```

The method boundingBoxCutting takes two parameters:

- A number n => The bounding box will be splitted into 4^n equal small bounding boxes.

- The coordinates of the main bounding box to split
```
const boxParameters = {
  centerLat : centerLat box coordinate,
  centerLng : centerLng box coordinate,
  maxLat : maxLat box coordinate,
  minLat : minLat box coordinate,
  maxLng : maxLng box coordinate,
  minLng : minLng box coordinate
}
```

Example:
```
const boxParameters = {
  centerLat : 2.352221900000177,
  centerLng : 48.856614,
  maxLat : 48.815573,
  minLat : 48.9021449,
  maxLng : 2.22519299999999,
  minLng : 2.4699207999999544
}
```

## Usage

This wrapper utilizes ES6 Promises to handle the API calls.
To split a bounding box into 4^n use the following...

```
bbox.boundingBoxCutting(boxParameters, n)
.then(result => console.log(result))
.catch(error => console.log(error))
```

The `result` returned in from the promise will be a `Result` array (with the same main Bbox format).


## Additional information

I've made this module for my personal needs. I just needed to get 4^8 = 65536 bounding boxes maximum.

If you need more bounding boxes, the script will take some times to be executed. 
It may also consumes all available JS heap space during its processing.
You’ll receive an error output and message like this:
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```
The solution to run your Node.js app with increased memory is to start the process with an additional V8 flag: --max-old-space-size. You need to append your desired memory size in megabytes.


## Tests

  `npm test`


## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.


## License

Copyright © 2017 Tekdreams. [MIT Licensed](LICENSE).