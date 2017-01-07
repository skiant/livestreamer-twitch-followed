[![Build Status](https://travis-ci.org/skiant/livestreamer-twitch-followed.svg?branch=master)](https://travis-ci.org/skiant/livestreamer-twitch-followed)

# livestreamer-twitch-followed
CLI app to start [livestreamer](http://docs.livestreamer.io/) on a live stream you follow

Install it globally with `npm install -g livestreamer-twitch-followed`, then use `lstf` to start it.


:warning: Livestreamer is required for this to have any effect :warning:

If you just want a fast way to open up a Twitch channel in Livestreamer, I recommend you create an alias as demonstrated below.
```bash
function lst() {
  if [ "$2" ]
  then
    quality=$2
  else
    quality="best"
  fi

  livestreamer twitch.tv/"$1" "$quality"
}
```
