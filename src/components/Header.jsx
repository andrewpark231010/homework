import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-image: url("https://images.khan.co.kr/article/2023/03/29/news-p.v1.20230329.ebd4c440b16a4a9b84ac3c6eada62971.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 160px;
  width: auto;
  padding: 200px;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  gap: 10px;
`;

const Tab = styled.div`
  flex: 1;
  padding: 12px;
  margin: 5px auto;
  text-align: center;
  line-height: 32px;
  background-color: ${({ $activeMember }) =>
    $activeMember ? "#ff5733" : "#ddd"};
  border-radius: 10%; /* 버튼 둥글게 만들기 */
  cursor: pointer;
  &:hover {
    background-color: #ff5733; /* 마우스 오버 시 배경색 변경 */
  }
`;

const Header = ({ activeMember, setActiveMember }) => {
  return (
    <>
      <Container>
        <Title>아이브 팬레터 콜렉션</Title>
      </Container>

      <TabWrapper>
        <Tab
          $activeMember={activeMember === "장원영"}
          onClick={() => setActiveMember("장원영")}
        >
          장원영
        </Tab>
        <Tab
          $activeMember={activeMember === "안유진"}
          onClick={() => setActiveMember("안유진")}
        >
          안유진
        </Tab>
        <Tab
          $activeMember={activeMember === "리즈"}
          onClick={() => setActiveMember("리즈")}
        >
          리즈
        </Tab>
        <Tab
          $activeMember={activeMember === "이서"}
          onClick={() => setActiveMember("이서")}
        >
          이서
        </Tab>
        <Tab
          $activeMember={activeMember === "가을"}
          onClick={() => setActiveMember("가을")}
        >
          가을
        </Tab>
        <Tab
          $activeMember={activeMember === "레이"}
          onClick={() => setActiveMember("레이")}
        >
          레이
        </Tab>
      </TabWrapper>
    </>
  );
};

export default Header;
