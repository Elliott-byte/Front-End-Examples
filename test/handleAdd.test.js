import { handleAdd } from '../client/js/handleAdd'

describe('Test, the function "handleAdd()" should exist', () => {
	test('It should return true', async () => {
		expect(handleAdd).toBeDefined();
	});
});
describe('Test, the function "handleAdd()" should be a function', () => {
	test('It should be a function', async () => {
		expect(typeof handleAdd).toBe("function");
	});
});