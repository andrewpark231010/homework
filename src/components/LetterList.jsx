// LetterList.jsx

import React, { useState } from "react";
import fakeData from "../data/fakeData.json"; // fakeData의 경로에 따라 수정

const LetterList = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  return (
    <div>
      <h2>팬레터 목록</h2>
      <ul>
        {fakeData.map((letter) => (
          <li key={letter.id} onClick={() => handleLetterClick(letter)}>
            {letter.content.length > 50
              ? `${letter.content.substring(0, 50)}...`
              : letter.content}
          </li>
        ))}
      </ul>

      {selectedLetter && (
        <div>
          <h2>선택한 팬레터 내용</h2>
          <p>{selectedLetter.content}</p>
        </div>
      )}
    </div>
  );
};

export default LetterList;
