import { difference, reduce, uniqBy, remove } from 'lodash/fp';
import { Reqraph, SortedReqraph } from './reqraph';

function validate(reqraph: Reqraph) {
}

export default function reqraph(reqraph: Reqraph = []): SortedReqraph {
  validate(reqraph);

  const sortedReqraph = [];

  let ranked = { list: [], keys: [], next: reqraph };

  while (true) {
    ranked = reduce(
      (result, item) => {
        const newRequirements = difference(item.requirements, ranked.keys);

        if (item.requirements.length && newRequirements.length) {
          result.next.push(item);
        } else {
          ranked = {
            ...ranked,
            next: remove(r => r.key === item.key, ranked.next),
          };

          result.list.push(item);
          result.keys.push(item.key);
        }
        return result;
      },
      { list: [], keys: ranked.keys, next: [] },
      ranked.next,
    );

    if (ranked.list.length === 0) break;

    sortedReqraph.push(ranked.list);
  }

  return sortedReqraph;
}
