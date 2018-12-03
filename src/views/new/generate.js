import Selection from './classes/selection';
import Answer from './classes/answer';

export default function (type) {
  switch (type) {
    case 'selection':
      return new Selection();
    case 'answer':
      return new Answer();
    default:
      break;
  }

  throw new Error('Type is not supported');
}
