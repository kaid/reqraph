import { concat, difference, reduce } from 'lodash/fp';
import { Reqraph, SortedReqraph } from './reqraph';

export class InvalidReqraphError extends Error {
  constructor(items: Reqraph) {
    super(`Invalid items: ${JSON.stringify(items)}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

type Sorting = { sorted: Reqraph, identities: string[], next: Reqraph };

function sortReqraph(input: Sorting, output: SortedReqraph): SortedReqraph {
  const nextInput = reduce(
    (result, item) => (
      item.requirements.length
      && difference(item.requirements, result.identities).length
    )
    ? {
      ...result,
      next: concat(result.next, item)
    }
    : {
      ...result,
      sorted: concat(result.sorted, item),
      identities: concat(result.identities, item.identity)
    },
    { sorted: [], identities: input.identities, next: [] },
    input.next,
  );

  const { sorted, next } = nextInput;

  if (sorted.length) {
    return sortReqraph(nextInput, concat(output, [sorted]));
  }

  if (next.length) {
    throw new InvalidReqraphError(next);
  }

  return output;
}

export default function reqraph(graph: Reqraph = []): SortedReqraph {
  return sortReqraph({ sorted: [], identities: [], next: graph }, []);
}
