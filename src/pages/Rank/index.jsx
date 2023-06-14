import styled from "styled-components";
import useRank from "../../hooks/useRank";
import { Button } from "../../components/formsComponents";
import { Link } from "react-router-dom";

export default function Rank() {
  const {rank} = useRank();
  const sortedRank = rank.sort((a, b) => {	
    if (a.turns < b.turns) {
      return -1;
    }
    if (a.turns > b.turns) {
      return 1;
    }
    if(a.turns === b.turns && a.time < b.time) {
      return -1;
    }
    if(a.turns === b.turns && a.time > b.time) {
      return 1;
    }

    return 0;
  });
  return (
    <Container>
      <h1>Ranking</h1>
      <NavbarLink to="/">Começar com outro grupo</NavbarLink>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tempo</th>
            <th>Tentativas</th>
          </tr>
        </thead>
        <tbody>
          {rank.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{formatTime(participant.time)}</td>
              <td>{participant.turns}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ade3f5;
  height: 100vh;
  gap: 4px;
  overflow: scroll;
`;

const Table = styled.table`
  width: 80%;
  max-width: 600px;
  border-collapse: collapse;
  border: 1px solid #000;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #bbbaba;
  }
`;

export const NavbarLink = styled(Link)`
border: 1px solid black;
  padding: 10px;
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  &:hover,
  &:focus {
    color: blue;
  }
  &:active {
    color: red;
  }
`;
 

