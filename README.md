# Twitch Logger
A Docker container to log a singular Twitch Chat's raw IRC messages.

``docker pull dbkynd/twitch-logger``

**Required ENV variables:**

* `TWITCH_CHANNEL` (String) Specify which Twitch channel you want to log.

**Optional ENV variables:**

* `UTC` (Boolean) Set to false to use the system's timezone. Defaults to true. Affects the message timestamp and the log filenames.
* `RAW` (Boolean) Set to false to log messages as they appear in Twitch chat instead of the raw IRC message. Defaults to true.
* `ZIP` (Boolean) Set to false if you do not want old log files to be Gzipped. Defaults to true.
* `TZ` (String) Set to use a specific timezone found at https://www.php.net/manual/en/timezones.php (Has issues when running in a Windows environment)
* `FORMAT` (String) Set to format the timestamp to your liking. ie: `hh:mm:ss` https://momentjs.com/docs/#/parsing/string-format/
* `CHATTY_STYLE` (Boolean) Set to true to mimic the Chatty formatting of prefixing the username with symbols representing the user level. Defaults to false. https://chatty.github.io/help/help.html (User Status Symbols Section)

Container Path to the log directory is `/app/logs`

**Examples:**

* Basic: `docker run -d -e TWITCH_CHANNEL=dbkynd -v C:/Users/DBKynd/Desktop/logs:/app/logs dbkynd/twitch-logger`

* Advanced `docker run -d -e TWITCH_CHANNEL=dbkynd -e UTC=false -e RAW=false -e ZIP=false -e TZ=America/Los_Angeles -e FORMAT=hh:mm:ss -e CHATTY_STYLE=true -v C:/Users/DBKynd/Desktop/logs:/app/logs dbkynd/twitch-logger`
