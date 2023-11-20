import React from "react";
import styled from "styled-components";
import fakeData from "../data/fakeData.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const LetterItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: 400px;
`;

const Home = () => {
  console.log(fakeData);
  return (
    <Container>
      <h1>팬레터 목록</h1>
      {fakeData.map((letter) => (
        <LetterItem key={letter.id}>
          <img
            src={letter.avatar}
            alt={letter.nickname}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <p>{letter.nickname}</p>
          <p>작성일시: {letter.createdAt}</p>
          <p>{letter.content}</p>
          <p>누구에게: {letter.writedTo}</p>
        </LetterItem>
      ))}
    </Container>
  );
};

export default Home;
