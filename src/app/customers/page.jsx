"use client"; // Next.jsのApp Routerでクライアントコンポーネントとして動作させる宣言

import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx"; // 顧客情報カードのコンポーネントをインポート
import Link from "next/link"; // Next.jsのリンクコンポーネントをインポート（ページ遷移用）
import { useEffect, useState } from "react"; // Reactのフック（副作用処理と状態管理）をインポート
import fetchCustomers from "./fetchCustomers"; // 顧客データ取得用の関数をインポート

// このコンポーネントがデフォルトエクスポートとして提供される
export default function Page() {
  // 顧客情報一覧を保持するstate（初期値は空配列）
  const [customerInfos, setCustomerInfos] = useState([]);

  // コンポーネントの初回マウント時に一度だけ実行される副作用
  useEffect(() => {
    // 非同期で顧客データを取得し、stateにセットする関数を定義
    const fetchAndSetCustomer = async () => {
      // fetchCustomers関数で顧客データを取得
      const customerData = await fetchCustomers();
      // 取得したデータをstateに保存
      setCustomerInfos(customerData);
    };
    // 定義した関数を即時実行
    fetchAndSetCustomer();
  }, []); // 空配列なので初回レンダリング時のみ実行

  return (
    <>
      {/* 新規顧客作成ページへのリンクボタン */}
      <div className="p-4">
        <Link href="/customers/create" className="mt-4 pt-4" prefetch={false}>
          {/* ボタンをクリックすると顧客作成ページへ遷移 */}
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">
            Create
          </button>
        </Link>
      </div>

      {/* 顧客情報が1件以上ある場合 */}
      {customerInfos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 顧客情報の配列を1件ずつカードとして表示 */}
          {customerInfos.map((customerInfo, index) => (
            <div
              key={index} // 各カードに一意のキーを設定
              className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4"
            >
              {/* 顧客情報を表示するカスタムコンポーネント */}
              <OneCustomerInfoCard {...customerInfo} />
              {/* カード内の操作ボタン（詳細・更新・削除） */}
              <div className="card-body flex flex-col justify-between">
                {/* 詳細ページへのリンク */}
                <Link href={`/customers/read/${customerInfo.customer_id}`}>
                  <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                    Read
                  </button>
                </Link>
                {/* 更新ページへのリンク */}
                <Link href={`/customers/update/${customerInfo.customer_id}`}>
                  <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                    Update
                  </button>
                </Link>
                {/* 削除ページへのリンク */}
                <Link href={`/customers/delete/${customerInfo.customer_id}`}>
                  <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 顧客情報がない場合のメッセージ表示
        <div className="text-center p-4">
          <p>顧客情報がありません。</p>
        </div>
      )}
    </>
  );
}
