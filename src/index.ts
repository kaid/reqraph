import { difference, reduce, uniqBy, remove } from 'lodash/fp';
import { Reqraph, SortedReqraph } from './reqraph';

function validate(reqraph: Reqraph) {
}

type Sorted = { list: Reqraph, keys: string[], next: Reqraph };

export default function reqraph(graph: Reqraph = []): SortedReqraph {
  validate(graph);

  function sortReqraph(input: Sorted, output: SortedReqraph): SortedReqraph {
    const nextInput = reduce(
      (result, item) => {
        const newRequirements = difference(item.requirements, result.keys);

        if (item.requirements.length && newRequirements.length) {
          result.next.push(item);
        } else {
          input = {
            ...input,
            next: remove(r => r.key === item.key, input.next),
          };

          result.list.push(item);
          result.keys.push(item.key);
        }
        return result;
      },
      { list: [], keys: input.keys, next: [] },
      input.next,
    );

    if (!nextInput.list.length) return output;

    output.push(nextInput.list);

    return sortReqraph(nextInput, output);
  }

  return sortReqraph({ list: [], keys: [], next: graph }, []);
}
