/* global test */
import reqraph from './index';

test('reqraph', () => {
  const graph = [
    { key: 'A', requirements: ['B', 'C'] },
    { key: 'B', requirements: ['C'] },
    { key: 'C', requirements: ['D'] },
    { key: 'D', requirements: [] },
  ];

  const ranked = [
    [{ key: 'D', requirements: [] }],
    [{ key: 'C', requirements: ['D'] }],
    [{ key: 'B', requirements: ['C'] }],
    [{ key: 'A', requirements: ['B', 'C'] }],
  ];

  expect(reqraph(graph)).toEqual(ranked);
});
