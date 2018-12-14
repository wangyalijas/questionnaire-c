import Answer from './classes/answer';
import Selection from './classes/selection';
import CheckBox from './classes/checkBox';

export default function (data) {
  const result = {
    answers: [],
    selections: [],
  };

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    if (item.validate()) {
      let container;

      if (item instanceof Answer) {
        container = result.answers;
      } else if (item instanceof Selection || item instanceof CheckBox) {
        container = result.selections;
      } else {
        throw new Error('Type is not support.');
      }

      container.push(item.serialize());
    }
  }

  return result;
}
