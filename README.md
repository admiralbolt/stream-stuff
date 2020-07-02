# Stream Stuff
All the code that powers my stream! It is written in 3 different servers:
1. A django backend. Used for storing/persisting data as well as doing image & video manipulation.
2. An ember front end server. Used for easy controls for me as well as displaying plugins to twitch users.
3. A node socket server. A tiny node server that sets up a bunch of websockets and communicates messages across them.

The code that's written here probably can't be reused very easily, so sorry about that. The stuff I've done so far:

## Admiral Lightning Bot
Aka he who shall not be named. A terrible bot that uses voice commands to activate different parts of my code.
It can:
* Play sounds
* Say stuff
* Clip the stream

Works as intended approximately 10% of the time.

## Sound Board
Allows for playing & uploading sounds from the front end client. Uses global
keybindings so I can play sounds from anywhere. Easily integrates with the rest 
of the django server to allow for playing sounds from scripts and the like.

## Memes
Talking with OBS via websockets is a magical thing, and it allows for some pretty funny stuff:
https://www.twitch.tv/admirallightningbolt/clip/KawaiiFamousWolverineFloof
https://www.twitch.tv/admirallightningbolt/clip/CleverDependableMochaSoonerLater
https://www.twitch.tv/admirallightningbolt/clip/GiftedOutstandingHareOneHand

## Plugins

### Spotify Currently Playing
Polls spotify for currently playing song. Automatically handles reauth, intial auth needs to be done via Oauth.

### Polling
Ask chat a question and have them vote live!

### Brain
Typing !bigBrain or !smallBrain in chat affects the size of a brain displayed on screen. It's dumb but it's the first thing I did to get used to chat integrations.
