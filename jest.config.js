import dotenv from 'dotenv';

dotenv.config({
  path: '.env.development.local',
});

const jestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  testTimeout: 60000,
  verbose: true,
};

export default jestConfig;
