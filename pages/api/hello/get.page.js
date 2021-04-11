export async function useApi(request, response) {
  response.statusCode = 200;
  response.json({ name: "John Doe" });
}
export default useApi;
