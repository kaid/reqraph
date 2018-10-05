import { concat, difference, reduce, remove } from 'lodash/fp';
import { Reqraph, SortedReqraph } from './reqraph';

function validate(reqraph: Reqraph) {
}

type Sorting = { sorted: Reqraph, identities: string[], next: Reqraph };

function sortReqraph(input: Sorting, output: SortedReqraph): SortedReqraph {
  const nextInput = reduce(
    (result, item) => (item.requirements.length && difference(item.requirements, result.identities).length)
      ? { ...result, next: concat(result.next, item) }
      : { ...result, sorted: concat(result.sorted, item), identities: concat(result.identities, item.identity) },
    { sorted: [], identities: input.identities, next: [] },
    input.next,
  );

  return !nextInput.sorted.length
    ? output
    : sortReqraph(nextInput, concat(output, [nextInput.sorted]));
}

export default function reqraph(graph: Reqraph = []): SortedReqraph {
  validate(graph);

  return sortReqraph({ sorted: [], identities: [], next: graph }, []);
}
