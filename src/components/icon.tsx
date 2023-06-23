import * as React from 'react';
import { styled } from 'styled-components';

interface IconProps {
  text: string
}

const DesktopIconContainer = styled.div`

`;

const DesktopIconText = styled.p``;

const DesktopIcon = (props: IconProps) => {
  const { text } = props;
  return (
    <DesktopIconContainer>
      <DesktopIconText>{text}</DesktopIconText>
    </DesktopIconContainer>
  );
}

export default DesktopIcon;