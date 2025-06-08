/*課題用メモ
つまりここはfrontendのcreateページで入力したものを辞書型にして
APIにPOSTメソッドとして送信する処理をしている
課題にあったIDが空の状態で送信されるのを防ぐための処理は
バックエンド側でpythonのルールとして実装すればOKな気がする
app.pyのPOSTメソッドのエンドポイント/customersの部分
*/

"use server";// このファイルは「サーバー側」で動く処理だよってNext.jsに教えてる！
import { revalidatePath } from "next/cache";
// ページのキャッシュを手動で再読み込みするための関数を読み込んでる
// これで、データを更新した後にページを最新の状態にできるんだ！

//ここで formData は FormData オブジェクトっていう**「フォーム全体の入力データがまとまった箱」**みたいなもの✨
//inputタグの name属性 がキー、入力した値がバリュー（値）になってるよ！
const createCustomer = async (formData) => {// 顧客を新しく作るための非同期関数を定義してるよ（formDataが引数）
  const creating_customer_name = formData.get("customer_name");// フォームから名前の値を取得（inputタグのname属性に対応）
  const creating_customer_id = formData.get("customer_id"); // フォームからIDを取得
  const creating_age = formData.get("age"); // フォームからIDを取得
  const creating_gender = formData.get("gender");// フォームから性別を取得

  const body_msg = JSON.stringify({// 上で取り出したデータを、JSON形式の文字列に変換してるよ（APIに送るため）
    customer_name: creating_customer_name,
    customer_id: creating_customer_id,
    age: creating_age,
    gender: creating_gender,
  });

  /*
  🌟ここでのポイント
  📄 formData（フォームの中身）
  　↓
  🎁 必要な情報だけ .get() で取り出す
  　↓
  🧱 オブジェクトにまとめて
  　↓
  🌀 JSON.stringify() で文字列に変換して
  　↓
  📮 API に送る準備完了！
  🌟
  */

   // APIエンドポイントにPOSTリクエストを送ってる
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },// JSONを送るよっていうヘッダーを設定
    body: body_msg,// 実際に送るデータ（名前・ID・年齢・性別の情報）
  });
  if (!res.ok) {// レスポンスが失敗だったら…
    throw new Error("Failed to create customer");// エラーを投げてストップする！（登録失敗）
  }

  revalidatePath(`/customers`);// `/customers` ページのキャッシュを更新（最新データが反映されるようにするため）
};

export default createCustomer;// この関数を他のファイルから使えるように外に出してるよ（モジュールのエクスポート）

/*
🌈このまま覚えるといいこと✨

formData.get("name") でフォームの入力が取れる

JSON.stringify() で送信用データを文字列化

fetch() でAPIへ送信

revalidatePath() でキャッシュクリアして一覧を新しくする
*/
