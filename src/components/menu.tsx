import * as React from 'react';
import styled from 'styled-components';
import type { MenuOptionType } from '../types';
import MenuOption from './menu-option';

interface MenuProps {
  menuOptions: MenuOptionType[];
  closeMenu: () => void;
}

const MenuContainer = styled.div`
  width: 220px;
  background-color: #c3c3c3;  
  border-radius: 0px;
  position: fixed;
  bottom: 0;
  height: 14em;

  @keyframes rollup {
    from {
      height: 0em;
    }
    to {
      height: 14em;
    }
  }

  button:hover {
    background-color: #010081;
    color: #FFF;
  }

  animation-name: rollup;
  animation-duration: 0.2s;
`;

const Menu = React.forwardRef((props: MenuProps, ref) => {
  const { menuOptions, closeMenu } = props;

  const handleOutsideClick = (event: Event) => {
    if (ref && ref.current && !ref.current.contains(event.target)) {
        closeMenu();
    }
  }

  React.useEffect(() => {
    window.addEventListener("mousedown", (e) => handleOutsideClick(e));

    return window.removeEventListener("mousedown", (e) => handleOutsideClick(e));
  }, [ref]);

  return (
    <MenuContainer ref={ref}>
      {
        menuOptions.map(o => <MenuOption key={o.label} {...o} />)
      }
    </MenuContainer>
  );
})

export default Menu;