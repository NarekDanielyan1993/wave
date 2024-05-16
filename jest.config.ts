import type { Config } from '@jest/types';
import nextJest from 'next/jest';

export const customJestConfig: Config.InitialOptions = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFiles: ['./jest.polyfills.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    preset: 'ts-jest',
    verbose: true,
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
};

export const createJestConfig = nextJest({
    dir: './',
});

const jestConfig = async () => {
    const nextJestConfig = await createJestConfig(customJestConfig)();
    return {
        ...nextJestConfig,
        moduleNameMapper: {
            '^@module/(.*)$': '<rootDir>/module/$1',
            '^@common/(.*)$': '<rootDir>/common/$1',
            '^@constant/(.*)$': '<rootDir>/constant/$1',
            '^@utils/(.*)$': '<rootDir>/utils/$1',
            '^@lib/(.*)$': '<rootDir>/lib/$1',
            '^@services/(.*)$': '<rootDir>/services/$1',
            '^@api/(.*)$': '<rootDir>/api/$1',
            '^@store/(.*)$': '<rootDir>/store/$1',
            '^@test/(.*)$': '<rootDir>/test/$1',
            '^@hooks/(.*)$': '<rootDir>/hooks/$1',
            '^@styles/(.*)$': '<rootDir>/styles/$1',
            '^@components/(.*)$': '<rootDir>/components/$1',
            '\\.svg$': '<rootDir>/__mocks__/svg.js',
            '^@mocks/(.*)$': ['<rootDir>/__mocks__/$1'],
            '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
                '<rootDir>/__mocks__/fileMock.js',
            '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
            'swiper/css': 'identity-obj-proxy',
            'swiper/css/*': 'identity-obj-proxy',
            '^@prisma/client$': '<rootDir>/node_modules/prisma/prisma-client',
            ...nextJestConfig.moduleNameMapper,
        },
        transformIgnorePatterns: [
            '/node_modules/(?!swiper|swiper/react|ssr-window|dom7)',
        ],
    };
};

module.exports = jestConfig;
