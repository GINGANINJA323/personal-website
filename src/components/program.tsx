import * as React from 'react';
import { styled } from 'styled-components';
import { useDrag } from 'react-dnd';

interface ProgramProps {
  contentId: string;
  name: string;
  close: (page: string) => void;
  minimise: (page: string) => void;
}

const ProgramContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 10em;
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
  const { contentId, name, close, minimise } = props;
  const [collected, drag] = useDrag(() => ({
    type: 'program',
    item: {}
  }));

  return (
    <ProgramContainer>
      <ProgramHeader>
        <ProgramLabel>{name}</ProgramLabel>
        <ProgramButtonContainer>
          <HeaderButton onClick={() => minimise(contentId)}>{'_'}</HeaderButton>
          <HeaderButton onClick={() => close(contentId)}>{'X'}</HeaderButton>
        </ProgramButtonContainer>
      </ProgramHeader>
      <ProgramIFrame src={`/content/${contentId}.html`}></ProgramIFrame>
    </ProgramContainer>
  );
}

export default Program;