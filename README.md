# Twitch Logger
A Docker container to log multiple Twitch channel's IRC messages to file.

``docker pull dbkynd/twitch-logger``

Default behavior:
* Logs all `PRIVMSG` IRC messages
* Log files are split monthly
* Old log files are zipped with GZIP
* Timestamps are in UTC format

**Required ENV variables:**

* `TWITCH_CHANNELS` (String) A comma delimited string of channels specifying which Twitch channels you want to log

**Optional ENV variables:**

* `RAW` (Boolean) (Default: true) Set to false to log messages as they appear in Twitch chat instead of the raw IRC message
* `ZIP` (Boolean) (Default: true) Set to false if you do not want old log files to be Gzipped
* `TZ` (String) (Default: UTC) Set to use a specific timezone found at https://www.php.net/manual/en/timezones.php
* `TS_FORMAT` (String) Set to format the timestamp to your liking. ie: `hh:mm:ss` https://momentjs.com/docs/#/parsing/string-format/
* `DATE_PATTERN` (String) Set to change how often the log files are rotated. Defaults to monthly. ie: `YYYY-MM` https://github.com/winstonjs/winston-daily-rotate-file (Options section)
* `CHATTY_STYLE` (Boolean) (Default: false) Set to true (Requires RAW to be false) to mimic the Chatty formatting of prefixing the username with symbols representing the user level. https://chatty.github.io/help/help.html (User Status Symbols section)

Container Path to the log directory is `/app/logs`

**Examples:**

* Basic: `docker run -d -e TWITCH_CHANNELS=dbkynd -v C:/Users/DBKynd/Desktop/logs:/app/logs dbkynd/twitch-logger`

* Advanced: `docker run -d -e TWITCH_CHANNELS=dbkynd,annemunition -e RAW=false -e ZIP=false -e TZ=America/Los_Angeles -e TS_FORMAT=hh:mm:ss -e DATE_PATTERN=YYYY-MM-DD -e CHATTY_STYLE=true -v C:/Users/DBKynd/Desktop/logs:/app/logs dbkynd/twitch-logger`

**TS_FORMAT:**
* `YYYY-MM-DD HH:mm:ss` -> 2020-04-18 18:03:35
* `hh:mm:ss A` -> 05:56:57 PM

**DATE_PATTERN**
* `YYYY-MM` -> Rotates log files every month (Default)
* `YYYY-MM-DD` -> Rotates log files every day
* `null` -> No rotation. Logs all messages to a singular file (*Warning* - this file may get quite large) (If null, the ZIP option is not used)
