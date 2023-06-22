import * as React from 'react';
import styled from 'styled-components';

interface MenuProps {
  setMenuOpen: (newState: boolean) => void;
  menuOpen: boolean;
}

const MenuButton = styled.button`
  width: 80px;
  height: 1.7em;
  align-self: center;
  margin-left: 5px;
  border-radius: 0px;
`;

const MenuContainer = styled.div`
  width: 220px;
  height: 10em;
  background-color: #c3c3c3;  
  border-radius: 0px;
`;

const Menu = (props: MenuProps) => {
  const { setMenuOpen, menuOpen } = props;
  return (
    <>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>Menu</MenuButton>
    </>
  );
}

export default Menu;