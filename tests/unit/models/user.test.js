import { BadRequestError } from 'infra/errors';
import user from 'models/user';
import orchestrator from 'tests/orchestrator';

const validCredentials = {
  email: 'pdb_mobile@gmail.com',
  password: 'PdbPasswd1',
};

const invalidCredentials = {
  email: '',
  password: '',
};

describe('Model user', () => {
  describe('On authentication', () => {
    afterAll(async () => {
      // Will remove user if exists
      await orchestrator.tryRemoveUser(...Object.values(validCredentials));
    });

    test('Credentials policies', () => {
      // Valid should not be false
      let validationResult = user.isCredentialsValid(
        ...Object.values(validCredentials)
      );
      expect(validationResult).toBe(true);

      // Invalid should not be true
      validationResult = user.isCredentialsValid(
        ...Object.values(invalidCredentials)
      );
      expect(validationResult).toBe(false);
    });

    test('On user registration', async () => {
      // Valid should be defined
      let createdUser = await user.signUp(...Object.values(validCredentials));
      expect(createdUser).toBeDefined();

      // Invalid should be undefined and signUp should throw error
      let hasThrownBadRequestError = false;
      createdUser = undefined;
      try {
        createdUser = await user.signUp(...Object.values(invalidCredentials));
      } catch (error) {
        hasThrownBadRequestError = error instanceof BadRequestError;
      }
      expect(createdUser).not.toBeDefined();
      expect(hasThrownBadRequestError).toBe(true);
    });
  });
});
