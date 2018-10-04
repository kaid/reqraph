import { concat, difference, reduce, remove } from 'lodash/fp';
import { Reqraph, SortedReqraph } from './reqraph';

function validate(reqraph: Reqraph) {
}

type Sorted = { list: Reqraph, keys: string[], next: Reqraph };

function sortReqraph(input: Sorted, output: SortedReqraph): SortedReqraph {
  const nextInput = reduce(
    (result, item) => (item.requirements.length && difference(item.requirements, result.keys).length)
      ? { ...result, next: concat(result.next, item) }
      : { ...result, list: concat(result.list, item), keys: concat(result.keys, item.key) },
    { list: [], keys: input.keys, next: [] },
    input.next,
  );

  return !nextInput.list.length
    ? output
    : sortReqraph(nextInput, concat(output, [nextInput.list]));
}

export default function reqraph(graph: Reqraph = []): SortedReqraph {
  validate(graph);

  return sortReqraph({ list: [], keys: [], next: graph }, []);
}
