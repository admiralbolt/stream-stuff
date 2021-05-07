Somehow I consistently manage to fuck this thing up.
Also looks like updating windows resets ALL the settings for all the things
and fucks up virtual cables. Thanks windows.

OBS:
  Mic -> Cable Output
  Desktop Sounds -> Voicemeter Aux Output
  Stream Only -> Cable B
  (headphone only is Cable A)

Voicemeter (see screenshot):
  The aux output is used by stream.
  The normal output is used so I can hear.
  1. VB-A should be configured as an input that only writes to A1
  2. Voicmeter VAIO should be configured to output A1 & B2 (b2 is aux output signal)
  3. A1 should be set to Speakers (Realtek High Definition)

Voicemod settings:
  * Input should be set to yeti mic
  * Output should be set to Voicemeter Input

Windows Sound Settings:
  * Yeti should NOT be listend to anymore.
  * Voicemeter Input should be for playback
  * Voicemod Input should be set as input in properties set playback through CABLE INPUT
