import Selection from './classes/selection';
import CheckBox from './classes/checkBox';
import Answer from './classes/answer';

export default function (type) {
  switch (type) {
    case 'selection':
      return new Selection();
    case 'checkBox':
      return new CheckBox();
    case 'answer':
      return new Answer();
    default:
      break;
  }

  throw new Error('Type is not supported');
}
