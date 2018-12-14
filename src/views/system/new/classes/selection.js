import Base from './base';

class Selection extends Base {
  type = 'Selection';

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

export default Selection;
