import Base from './base';

class CheckBox extends Base {
  type = 'CheckBox';

  constructor(name = '', options = [{ name: '', sort: 0, isRight: false }]) {
    super(name);
    this.options = options;
  }

  validate() {
    return super.validate() && this.validateOptions();
  }

  validateOptions() {
    return this.options.every(item => !!item.name);
  }
}

export default CheckBox;
