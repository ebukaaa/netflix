import { useApi } from "../get.page";

describe("useApi", () => {
  const response = {
    statusCode: null,
    json: jest.fn(),
  };

  describe("response", () => {
    // const json = jest.fn(() => Promise.resolve()); // Promise.resolve() not needed
    // global.fetch = jest.fn();

    test("calls json", async () => {
      // jest.spyOn(global, "fetch").mockResolvedValueOnce({ json });
      await useApi(null, response);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(typeof response.statusCode).toEqual("number");
    });
  });
});
