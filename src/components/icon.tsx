import * as React from 'react';
import { styled } from 'styled-components';

interface IconProps {
  text: string
}

const IconContainer = styled.div`

`;

const IconText = styled.p``;

const Icon = (props: IconProps) => {
  const { text } = props;
  return (
    <IconContainer>
      <IconText>{text}</IconText>
    </IconContainer>
  );
}

export default Icon;