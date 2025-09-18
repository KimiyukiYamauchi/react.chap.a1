import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { useMemoList } from "../hooks/useMemoList";

export const App: FC = () => {
  // カスタムフックからメモ一覧、追加、削除関数を取得
  const { memos, addTodo, deleteTodo } = useMemoList();
  // テキストボックスstate
  const [text, setText] = useState<string>("");

  // テキストボックス入力時に入力内容をStateに設定
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  // [追加]ボタンクリック時にメモ一覧にテキストボックスの内容を追加
  const onClickAdd = () => {
    if (text === "") return;
    // カスタムフックのメモ追加関数を実行
    addTodo(text);
    // テキストボックスを空にする
    setText("");
  };

  // [削除]ボタンクリック時(何番目が押下されたかを引数で受け取る)
  const onClickDelete = useCallback(
    (index: number) => {
      // カスタムフックのメモ削除関数を実行
      deleteTodo(index);
    },
    [memos]
  );

  return (
    <div>
      <h1>簡易メモアプリ</h1>
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
      <MemoList memos={memos} onClickDelete={onClickDelete} />
    </div>
  );
};

const SButton = styled.button`
  margin-left: 16px;
`;
