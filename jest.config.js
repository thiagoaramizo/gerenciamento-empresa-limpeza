module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    projects: ['<rootDir>/packages/**/jest.config.js'],
    testEnvironment: 'node',
    testMach: ['*.spec.ts', '*.spec.tsx']
}