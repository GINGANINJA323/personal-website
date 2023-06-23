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
`;

const MenuOption = (props: MenuOptionProps) => {
  const { icon, onClick, label } = props;

  return (
    <MenuOptionButton onClick={onClick}>
      <img />
      <p>{label}</p>
    </MenuOptionButton>
  );
}

export default MenuOption;