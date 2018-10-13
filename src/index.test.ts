import reqraph, { InvalidReqraphError } from '.';

test('reqraph', () => {
  const graph1 = [
    { identity: 'C', requirements: ['D'] },
    { identity: 'B', requirements: ['C'] },
    { identity: 'A', requirements: ['B', 'C'] },
    { identity: 'D', requirements: [] },
  ];

  const sorted1 = [
    [{ identity: 'D', requirements: [] }],
    [{ identity: 'C', requirements: ['D'] }],
    [{ identity: 'B', requirements: ['C'] }],
    [{ identity: 'A', requirements: ['B', 'C'] }],
  ];

  expect(reqraph(graph1)).toEqual(sorted1);

  const graph2 = [
    { identity: 'D', requirements: [] },
    { identity: 'C', requirements: ['D'] },
    { identity: 'A', requirements: ['B', 'C'] },
    { identity: 'B', requirements: ['D'] },
  ];

  const sorted2 = [
    [{ identity: 'D', requirements: [] }],
    [{ identity: 'C', requirements: ['D'] }, { identity: 'B', requirements: ['D'] }],
    [{ identity: 'A', requirements: ['B', 'C'] }],
  ];

  expect((reqraph(graph2))).toEqual(sorted2);
});

test('validate', () => {
  function shouldValidate(graph) {
    return () => reqraph(graph);
  }

  const graph1 = [
    { identity: 'A', requirements: ['B'] },
    { identity: 'B', requirements: ['C'] },
    { identity: 'C', requirements: ['A'] },
  ];
  
  expect(shouldValidate(graph1)).toThrow(InvalidReqraphError);

  const graph2 = [
    { identity: 'A', requirements: ['A'] },
    { identity: 'B', requirements: ['B'] },
    { identity: 'C', requirements: ['C'] },
  ];
  
  expect(shouldValidate(graph2)).toThrow(InvalidReqraphError);

  const graph3 = [
    { identity: 'A', requirements: ['B', 'C'] },
    { identity: 'B', requirements: ['D'] },
    { identity: 'C', requirements: ['X', 'Z'] },
  ];
  
  expect(shouldValidate(graph2)).toThrow(InvalidReqraphError);
});
