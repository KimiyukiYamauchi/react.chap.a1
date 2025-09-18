import { ChangeEvent, useState, FC } from "react";
import styled from "styled-components";

export const App: FC = () => {
  // テキストボックスstate
  const [text, setText] = useState<string>("");
  // メモ一覧state
  const [memos, setMemos] = useState<string[]>([]);

  // テキストボックス入力時に入力内容をStateに設定
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  // [追加]ボタンクリック時にメモ一覧にテキストボックスの内容を追加
  const onClickAdd = () => {
    if (text === "") return;
    // Stateを直接変更しないようにスプレッド構文で新しい配列を作成
    const newMemos = [...memos, text];
    // Stateを更新
    setMemos(newMemos);
    // テキストボックスを空にする
    setText("");
  };

  // [削除]ボタンクリック時(何番目が押下されたかを引数で受け取る)
  const onClickDelete = (index: number) => {
    // 押下された要素以外で新しい配列を作成
    const newMemos = memos.filter((_, i) => i !== index);
    // Stateを更新
    setMemos(newMemos);
  };

  return (
    <div>
      <h1>簡易メモアプリ</h1>
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
      <SContainer>
        <p>メモ一覧</p>
        <ul>
          {memos.map((memo, index) => (
            <li key={memo}>
              <SMemoWrapper>
                <p>{memo}</p>
                <SButton onClick={() => onClickDelete(index)}>削除</SButton>
              </SMemoWrapper>
            </li>
          ))}
        </ul>
      </SContainer>
    </div>
  );
};

const SButton = styled.button`
  margin-left: 16px;
`;
const SContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
`;
const SMemoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
