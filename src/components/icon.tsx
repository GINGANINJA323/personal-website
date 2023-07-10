import * as React from 'react';
import { styled } from 'styled-components';

interface IconProps {
  text: string;
  iconName: string;
  onClick: () => void;
}

const DesktopIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 48px;
  margin-left: 5px;
  :hover {
    cursor: pointer;
  }
`;

const DesktopIconText = styled.p`
  font-size: 12px;
  text-align: center;
`;

const DesktopIcon = React.forwardRef((props: IconProps, ref) => {
  const { text, iconName, onClick } = props;

  const handleDblClick = (event: any) => {
    if (ref && ref.current && ref.current.contains(event.target)) {
      console.log(event.target);
      onClick();
    }
  }

  React.useEffect(() => {
    window.addEventListener('dblclick', handleDblClick);

    return () => window.removeEventListener('dblclick', handleDblClick);
  }, [])

  return (
    <DesktopIconContainer ref={ref}>
      <img src={`/assets/${iconName}.png`}></img>
      <DesktopIconText>{text}</DesktopIconText>
    </DesktopIconContainer>
  );
});

export default DesktopIcon;