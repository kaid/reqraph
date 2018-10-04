import { difference, reduce, uniqBy, remove } from 'lodash/fp';
import { Reqraph, SortedReqraph } from './reqraph';

function validate(reqraph: Reqraph) {
}

export default function reqraph(reqraph: Reqraph = []): SortedReqraph {
  validate(reqraph);

  const sortedReqraph = [];

  let sorted = { list: [], keys: [], next: reqraph };

  while (true) {
    sorted = reduce(
      (result, item) => {
        const newRequirements = difference(item.requirements, result.keys);

        if (item.requirements.length && newRequirements.length) {
          result.next.push(item);
        } else {
          sorted = {
            ...sorted,
            next: remove(r => r.key === item.key, sorted.next),
          };

          result.list.push(item);
          result.keys.push(item.key);
        }
        return result;
      },
      { list: [], keys: sorted.keys, next: [] },
      sorted.next,
    );

    if (sorted.list.length === 0) break;

    sortedReqraph.push(sorted.list);
  }

  return sortedReqraph;
}
