import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { isEmpty, isNone } from '@ember/utils';
import { A } from '@ember/array';
import ENV from 'overlay/config/environment';

export default class BoardItemComponent extends Component {
  @service store;
  @service('file-queue') queue;

  @tracked sound = null;
  @tracked isEditing = false;
  @tracked isNew = false;

  cancelCallback = null;
  createCallback = null;

  @tracked sound_name = '';
  @tracked sound_file = null;

  constructor() {
    super(...arguments);
    this.sound = this.args.sound;
    this.isEditing = this.args.isEditing;
    this.isNew = this.args.isNew;
  }

  uploadFile(id) {
    let headers = {
      Accept: 'application/vnd.api+json'
    };
    headers['Content-Disposition'] = `attachment; filename=${this.sound_file.name}`;
    return this.sound_file.upload(`${ENV.host}/sounds/upload/?id=${id}`, {
      headers: headers
    });
  }

  @action
  addSoundFile(soundFile) {
    this.sound_file = soundFile;
  }

  get soundFileName() {
    // The regex is os.path.basename()
    return isNone(this.sound) || isNone(this.sound.sound_file) ? 'No file selected' : this.sound.sound_file.split(/(\\|\/)/g).pop();
  }

  @action
  play() {
    fetch(`${ENV.host}/play_sound/?sound_id=${this.sound.id}`);
  }

  @action
  stop() {
    fetch(`${ENV.host}/play_sound/?sound_id=${this.sound.id}&stop=true`);
  }

  @action
  save() {
    if (!this.sound_name || (this.isNew && isNone(this.sound_file))) return;

    let sound = this.sound;
    if (sound == null) {
      sound = this.store.createRecord('sound', { name: this.sound_name});
    } else {
      sound.set('name', this.sound_name);
    }

    sound.save().then(function(response) {
      if (this.sound_file == null) {
        this.isEditing = false;
        return;
      }

      this.uploadFile(response.id).then(function() {
        sound.reload();
        this.sound_name = '';
        this.sound_file = null;
        if (this.isEditing) {
          this.isEditing = false;
        } else if (this.isNew) {
          (this.args.createCallback)();
        }
      }.bind(this));
    }.bind(this), function() {
      sound.rollbackAttributes();
    }.bind(this));
  }

  @action
  edit() {
    this.sound_name = this.sound.name;
    this.isEditing = true;
  }

  @action
  cancel() {
    this.sound_name = '';
    this.queue.find('sound_file').set('files', A());
    this.sound_file = null;
    if (this.isNew) (this.args.cancelCallback)();
    this.isEditing = false;
  }

  @action
  delete() {
    this.sound.deleteRecord();
    this.sound.save();
  }

};
