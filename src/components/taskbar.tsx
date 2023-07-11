import * as React from 'react';
import { styled } from 'styled-components';
import { getFormattedTime, getDate } from '../utils';

interface TaskbarProps {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: Boolean;
}

const MenuButton = styled.button`
  width: 80px;
  height: 1.7em;
  align-self: center;
  margin-left: 5px;
  border-radius: 0px;
  :hover {
    cursor: pointer;
  }
`;

const Clock = styled.p`
  width: 50px;
  align-self: center;
  border: 2px inset;
  margin-right: 5px;
  cursor: default;
`;

const TaskbarContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 2em;
  background-color: #c3c3c3;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;

const Taskbar = (props: TaskbarProps) => {
  const { setMenuOpen, menuOpen } = props;
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, [])

  return (
    <TaskbarContainer>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>Menu</MenuButton>
      <Clock title={getDate(time)}>{getFormattedTime(time)}</Clock>
    </TaskbarContainer>
  );
}

export default Taskbar;