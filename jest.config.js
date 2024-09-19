export default {
  transform: {},
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  preset: 'ts-jest/presets/default-esm',
};
