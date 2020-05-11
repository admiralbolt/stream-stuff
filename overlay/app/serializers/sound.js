import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class SoundSerializer extends JSONAPISerializer {
  // Make sure we serialize 'sound_file' as 'sound_file' and not 'sound-file'.
  keyForAttribute(key) {
    return key;
  }

  // Don't upload the sound_file when we send sound data to server, we have to
  // do this separately since it isn't supported by the json api directly yet.
  attrs = {
    sound_file: {
      serialize: false
    }
  }
}
