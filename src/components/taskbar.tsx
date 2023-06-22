import * as React from 'react';
import { styled } from 'styled-components';
import Menu from './menu';

interface TaskbarProps {

}

const TaskbarContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 2em;
  background-color: #c3c3c3;
  bottom: 0;
  display: flex;
`;

const Taskbar = (props: TaskbarProps) => {
  return (
    <TaskbarContainer>

    </TaskbarContainer>
  );
}

export default Taskbar;