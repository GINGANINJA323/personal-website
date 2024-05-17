import * as React from 'react';
import { PagesObject } from '../types';
import { styled } from 'styled-components';
import { getFormattedTime, getDate, capitalise } from '../utils';

interface TaskbarProps {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: Boolean;
  pages: PagesObject;
  openPage: (page: string) => void;
  minimisePage: (page: string) => void;
}

interface OpenPageProps {
  open: Boolean;
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

const PagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const OpenPage = styled.button<OpenPageProps>`
  width: 160px;
  height: 1.7em;
  align-self: center;
  margin-left: 5px;
  border-radius: 0px;
  text-align: left;
  border-style: ${props => props.open ? 'inset' : 'outset'};
  :hover {
    cursor: pointer;
  }
`;

const Taskbar = (props: TaskbarProps) => {
  const { setMenuOpen, menuOpen, pages, openPage, minimisePage } = props;
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  return (
    <TaskbarContainer>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>Menu</MenuButton>
      <PagesContainer>
        {
          Object.keys(pages)
            .filter(p => pages[p].open)
            .map(p => 
              <OpenPage key={p} onClick={() => pages[p].state !== 'minimised' ? minimisePage(p) : openPage(p)} open={pages[p].state !== 'minimised'}>
                {capitalise(p)}
              </OpenPage>
            )
        }
      </PagesContainer>
      <Clock title={getDate(time)}>{getFormattedTime(time)}</Clock>
    </TaskbarContainer>
  );
}

export default Taskbar;