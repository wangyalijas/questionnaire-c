import generate from './generate';

export default function (data) {
  const result = [];

  result.concat(data.answers || [], data.selections || []);

  for (let i = 0; i < (data.answers || []).length; i += 1) {
    result.push(Object.assign(generate('answer'), data.answers[i]));
  }

  for (let i = 0; i < (data.selections || []).length; i += 1) {
    result.push(Object.assign(generate('selection'), data.selections[i]));
  }

  return result.sort((a, b) => (a.sort < b.sort ? 1 : 0));
}
