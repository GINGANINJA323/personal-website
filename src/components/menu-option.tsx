import * as React from 'react';
import styled from 'styled-components';

interface MenuOptionProps {
  icon: string;
  onClick: () => any;
  label: string;
}

const MenuOptionButton = styled.button`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 0px;
  align-items: center;
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
`;

const OptionLabel = styled.p`
  margin-left: 10px;
`;

const MenuOption = (props: MenuOptionProps) => {
  const { icon, onClick, label } = props;

  return (
    <MenuOptionButton onClick={onClick}>
      <Icon width={32} height={32} src={`/assets/${icon}.png`}></Icon>
      <OptionLabel>{label}</OptionLabel>
    </MenuOptionButton>
  );
}

export default MenuOption;