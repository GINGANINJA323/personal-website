import * as React from 'react';
import styled from 'styled-components';
import Menu from './components/menu';
import Program from './components/program';
import Taskbar from './components/taskbar';
import { closeOnDeFocus } from './utils';

const Desktop = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    background-color: #008080;
`;

const App = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [openPages, setOpenPages] = React.useState<string[]>([]);

    const menuRef = React.useRef(null);
    const handleOutsideClick = (event: Event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            console.log('Triggered!')
            setMenuOpen(false);
        }
    }

    const openPage = (page: string): void => {
        setOpenPages([...openPages, page]);
    }

    const closePage = (page: string): void => {
        setOpenPages(openPages.filter(p => p !== page));
    }

    React.useEffect(() => {
        window.addEventListener("mousedown", handleOutsideClick);

        return window.removeEventListener("mousedown", handleOutsideClick);
    }, [menuRef]);

    const menuOptions = [
        {
            label: 'About',
            icon: '',
            onClick: () => openPage('about')
        },
        {
            label: 'Projects',
            icon: '',
            onClick: () => console.log('Projects pressed')
        },
        {
            label: 'CV',
            icon: '',
            onClick: () => console.log('CV pressed')
        },
        {
            label: 'Website Code',
            icon: '',
            onClick: () => console.log('Webcode pressed')
        }
    ]

    return (
        <Desktop>
            {
                menuOpen ? <Menu menuOptions={menuOptions} ref={menuRef} /> : null
            }
            {
                openPages.includes('about') ? <Program contentId={'about'} name={'About'} close={closePage} /> : null
            }
            <Taskbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
        </Desktop>
    );
}

export default App;