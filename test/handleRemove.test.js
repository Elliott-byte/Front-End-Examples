import { handleRemove } from '../client/js/handleRemove'

describe('Test, the function "handleRemove()" should exist', () => {
	test('It should return true', async () => {
		expect(handleRemove).toBeDefined();
	});
});
describe('Test, the function "handleRemove()" should be a function', () => {
	test('It should be a function', async () => {
		expect(typeof handleRemove).toBe("function");
	});
});