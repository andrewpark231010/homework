// LetterForm.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
// import LetterList from "./LetterList";
import Header from "./Header";

const Container = styled.div`
  color: black;
  font-size: 16px;
`;

const SavedBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  background-color: #ffffffc3;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 5px;
  margin: 0px auto;
`;

const SavedItem = styled.div`
  border: 2px solid #ccc;
  border-radius: 25px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;

  /* 마우스 호버 시 border 스타일 변경 */
  &:hover {
    border-color: "#ff5733";
    box-shadow: 0 0 10px rgb(255, 102, 0);
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 100px;
  border: 5px solid #ccc;
  border-radius: 25px;

  z-index: 999;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  width: 500px;
  background-color: gray;
  border-radius: 5px;
  padding: 20px;
  margin: 10px auto 20px auto;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  box-sizing: border-box;
`;

const formatDateString = (dateString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Seoul",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

const LetterForm = () => {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [member, setMember] = useState("장원영");
  const [submittedLetters, setSubmittedLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  // activeMember 상태와 해당 상태를 업데이트하는 setActiveMember 함수 정의
  const [activeMember, setActiveMember] = useState("장원영"); // 기본 활성 멤버 설정

  const onSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !content) {
      return alert("닉네임과 내용은 필수적으로 입력해야 합니다.");
    }

    const letter = {
      id: uuidv4(),
      nickname,
      content,
      writedTo: member,
      createdAt: new Date(),
    };

    setSubmittedLetters((prevLetters) => [...prevLetters, letter]);

    console.log(letter);
    setNickname("");
    setContent("");
    setMember("");
  };

  const selectMember = (e) => {
    setMember(e.target.value);
  };

  const openPopup = (letter) => {
    setSelectedLetter(letter);
  };

  const closePopup = () => {
    setSelectedLetter(null);
  };

  // 선택된 멤버에 해당하는 팬레터만 필터링
  const filteredLetters = submittedLetters.filter(
    (letter) => letter.writedTo === activeMember
  );

  const editLetter = (editedContent) => {
    const confirmEdit = window.confirm("정말로 수정하시겠습니까?");
    if (confirmEdit) {
      const updatedLetters = submittedLetters.map((letter) =>
        letter.id === selectedLetter.id
          ? { ...letter, content: editedContent }
          : letter
      );
      setSubmittedLetters(updatedLetters);
      closePopup();
    }
  };

  // 팬레터 삭제 핸들러
  const deleteLetter = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      const updatedLetters = submittedLetters.filter(
        (letter) => letter.id !== selectedLetter.id
      );
      setSubmittedLetters(updatedLetters);
      closePopup();
    }
  };

  return (
    <Container>
      <Header activeMember={activeMember} setActiveMember={setActiveMember} />

      <FormWrapper>
        <form onSubmit={onSubmit}>
          <FormLabel>
            닉네임:
            <FormInput
              type="text"
              value={nickname}
              placeholder="최대 20글자까지 작성할 수 있습니다."
              maxLength={20}
              onChange={(e) => setNickname(e.target.value)}
            />
          </FormLabel>

          <FormLabel>
            내용:
            <FormInput
              type="text"
              value={content}
              placeholder="최대 100자까지만 작성할 수 있습니다."
              maxLength={100}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormLabel>

          <FormLabel>
            누구에게 보내실 건가요?
            <select id="member" name="member" onChange={selectMember}>
              <option value="장원영">장원영</option>
              <option value="안유진">안유진</option>
              <option value="리즈">리즈</option>
              <option value="이서">이서</option>
              <option value="가을">가을</option>
              <option value="레이">레이</option>
            </select>
          </FormLabel>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit">팬레터 등록</button>
          </div>
        </form>
      </FormWrapper>

      <SavedBox>
        {filteredLetters.map((letter) => (
          <SavedItem key={letter.id} onClick={() => openPopup(letter)}>
            <p>{letter.nickname /* 닉네임 */}</p>

            {/* <p>누구에게: {letter.writedTo}</p> */}

            <p>작성일시: {formatDateString(letter.createdAt)}</p>
            <p>
              {letter.content.length /* 내용 */ > 50
                ? `${letter.content.slice(0, 50)}...`
                : letter.content}
            </p>
            {/* <button onClick={() => openPopup(letter)}>수정</button> */}
          </SavedItem>
        ))}
      </SavedBox>

      {selectedLetter && (
        <Popup>
          <span className="close" onClick={closePopup}>
            &times;
          </span>
          <h3>팬레터 수정</h3>
          <textarea
            value={selectedLetter.content}
            onChange={(e) =>
              setSelectedLetter({
                ...selectedLetter,
                content: e.target.value,
              })
            }
          />

          <button onClick={() => editLetter(selectedLetter.content)}>
            수정
          </button>
          <button onClick={deleteLetter}>삭제</button>
        </Popup>
      )}
    </Container>
  );
};

export default LetterForm;
