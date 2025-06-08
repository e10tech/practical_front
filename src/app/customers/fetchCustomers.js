/**
 * Fetches the list of all customers from the API endpoint specified in the environment variable.
 * 
 * .envからAPIエンドポイントを読み込んでいる
 * @returns {Promise<Object>} - A promise that resolves to the JSON response containing customer data.
 * @throws {Error} - Throws an error if the fetch request fails.
 * 
 * 1. .envからAPIエンドポイントをconsole.logで表示
 * 2. fetchでAPIエンドポイント/allcustomersにリクエストを送信（キャッシュなし）
 * 3. レスポンスがokでなければエラーを投げる
 * 4. レスポンスをJSONとして返す
 */

//この関数をこのファイルの外からも使えるように公開するという意味。しかもデフォルトで1つだけ！
export default async function fetchCustomers() {
  console.log(
    ".envから読み込んだAPI_ENDPOINT: ",
    process.env.NEXT_PUBLIC_API_ENDPOINT
  );
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + "/allcustomers",
    {
      cache: "no-cache",//ブラウザが前に取得したキャッシュを使って古いデータを見せないようにする
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }
  return res.json();
}
