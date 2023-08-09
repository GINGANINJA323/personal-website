import * as React from 'react';
import { styled } from 'styled-components';
import { useDrag } from 'react-dnd';
import { PagesObject } from '../types';

interface ProgramProps {
  contentId: string;
  name: string;
  close: (page: string) => void;
  minimise: (page: string) => void;
  maximise: (page: string) => void;
  pages: PagesObject;
}

const ProgramContainer = styled.div<{ width: string, height: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: ${props => props.height || '10em'};
  width: ${props => props.width || '10em'};
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
`

const Program = (props: ProgramProps) => {
  const { contentId, name, close, minimise, maximise, pages } = props;
  const maximised = [`calc(${window.innerWidth}px - 5px)`, `calc(${window.innerHeight}px - 30px)`];
  const [size, setSize] = React.useState(['304px', '164px']);
  const [collected, drag] = useDrag(() => ({
    type: 'program',
    item: {}
  }));

  React.useEffect(() => {
    if (pages[contentId].state === 'maximised') {
      setSize(maximised);
    }
  }, [pages]);

  return (
    <ProgramContainer ref={drag} width={size[0]} height={size[1]}>
      <ProgramHeader>
        <ProgramLabel>{name}</ProgramLabel>
        <ProgramButtonContainer>
          <HeaderButton onClick={() => minimise(contentId)}>{'_'}</HeaderButton>
          <HeaderButton onClick={() => maximise(contentId)}>{'☐'}</HeaderButton>
          <HeaderButton onClick={() => close(contentId)}>{'X'}</HeaderButton>
        </ProgramButtonContainer>
      </ProgramHeader>
      <ProgramIFrame src={`/content/${contentId}.html`}></ProgramIFrame>
    </ProgramContainer>
  );
}

export default Program;