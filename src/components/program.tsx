import * as React from 'react';
import { styled } from 'styled-components';
import { PagesObject } from '../types';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

interface ProgramProps {
  contentId: string;
  name: string;
  close: (page: string) => void;
  minimise: (page: string) => void;
  maximise: (page: string) => void;
  pages: PagesObject;
}

const ProgramContainer = styled.div<{ width: number, height: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border: 2px #c3c3c3 inset;
`;

const ProgramHeader = styled.div`
  background-color: #c3c3c3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 30px;
  width: 100%;
`;

const ProgramButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProgramLabel = styled.h2`
  color: #000;
  height: 100%;
  width: fit-content;
  margin: 0;
`;

const HeaderButton = styled.button`
  border: none;
`;

const ProgramIFrame = styled.iframe`
  border: none;
  overflow: scroll;
  height: 100vh;
`

const Program = (props: ProgramProps) => {
  const { contentId, name, close, minimise, maximise, pages } = props;
  const maximised = {width: window.innerWidth - 5, height: window.innerHeight - 30};
  const [size, setSize] = React.useState({width: 304, height: 164});

  React.useEffect(() => {
    if (pages[contentId].state === 'maximised') {
      setSize(maximised);
    }
  }, [pages]);

  const onResize = (event, { element, size, handle }) => {
    event.stopPropagation();
    setSize({width: size.width, height: size.height})
  }

  return (
    <Draggable handle='.handle'>
      <Resizable resizeHandles={['se']} width={size.width} height={size.height} onResize={onResize} lockAspectRatio={false} minConstraints={[304, 164]}>
        <ProgramContainer width={size.width} height={size.height}>
          <ProgramHeader className='handle'>
            <ProgramLabel>{name}</ProgramLabel>
            <ProgramButtonContainer>
              <HeaderButton onClick={() => minimise(contentId)}>{'_'}</HeaderButton>
              <HeaderButton onClick={() => maximise(contentId)}>{'☐'}</HeaderButton>
              <HeaderButton onClick={() => close(contentId)}>{'X'}</HeaderButton>
            </ProgramButtonContainer>
          </ProgramHeader>
          <ProgramIFrame src={`/content/${contentId}.html`}></ProgramIFrame>
        </ProgramContainer>
      </Resizable>
    </Draggable>
  );
}

export default Program;