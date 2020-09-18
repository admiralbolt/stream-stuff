from datetime import timedelta, timezone

# Default timezone is UTC and central time is 5 hours before.
LOCAL_TIMEZONE = timezone(timedelta(hours=-5))

BRAIN_SIZE = "brain_plugin_size"

BACKGROUND_IMAGE_URL = "background_image_url"

CAMERA_COLOR_FILTER = "Color Correction"
CAMERA_SOURCE = "Shitty Webcam"

# The current 'page' for playing sounds from my keybindings.
# This is really complex and I already don't understand it, so good luck future
# me. I'm sorry this broke.
KEYBINDING_PAGE = "keybinding_page"

KING_OF_THE_HILL_MESSAGE = "king_of_the_hill_message"
KING_OF_THE_HILL_AUTHOR = "king_of_the_hill_author"

# The current 'page' for running scripts from my keybindings.
SCRIPT_PAGE = "script_page"

SPOTIFY_ACCESS_TOKEN = "spotify_access_token"
SPOTIFY_AUTHORIZATION_CODE = "spotify_authorization_code"
SPOTIFY_REFRESH_TOKEN = "spotify_refresh_token"
SPOTIFY_SHOULD_POLL = "spotify_should_poll"

# Gotta let em know.
THE_BEST_TWITCH_STREAMER_ID_NO_BIAS = 83968979

TWITCH_ACCESS_TOKEN = "twitch_access_token"
TWITCH_AUTHORIZATION_CODE = "twitch_authorization_code"
TWITCH_REFRESH_TOKEN = "twitch_refresh_token"

TWITCH_SUBSCRIBER_COUNT = "twitch_subscriber_count"
TWITCH_SUBSCRIBER_GOAL_COUNT = "twitch_subscriber_goal_count"
TWITCH_SUBSCRIBER_GOAL_MESSAGE = "twitch_subscriber_goal_message"
TWITCH_SUBSCRIBER_PLUGIN_MODE = "twitch_subscriber_plugin_mode"
