module.exports = {
  roots: [
    'src',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'node',
  ],
};
