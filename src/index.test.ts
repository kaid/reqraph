import reqraph from '.';

test('reqraph', () => {
  const graph1 = [
    { identity: 'A', requirements: ['B', 'C'] },
    { identity: 'B', requirements: ['C'] },
    { identity: 'C', requirements: ['D'] },
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
    { identity: 'A', requirements: ['B', 'C'] },
    { identity: 'B', requirements: ['D'] },
    { identity: 'C', requirements: ['D'] },
    { identity: 'D', requirements: [] },
  ];

  const sorted2 = [
    [{ identity: 'D', requirements: [] }],
    [{ identity: 'B', requirements: ['D'] }, { identity: 'C', requirements: ['D'] }],
    [{ identity: 'A', requirements: ['B', 'C'] }],
  ];

  expect(reqraph(graph2)).toEqual(sorted2);
});
