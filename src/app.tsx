import * as React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import DesktopIcon from './components/icon';
import Menu from './components/menu';
import Program from './components/program';
import Taskbar from './components/taskbar';
import { DndProvider } from 'react-dnd';
import { useDrop } from 'react-dnd';

const StyledDesktop = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    background-color: #008080;
`;

interface DesktopProps {
    children: (JSX.Element | null)[]
};

const Desktop = (props: DesktopProps) => {
    const { children } = props;
    const [collectedProps, drop] = useDrop(() => ({
        accept: 'program'
      }))
    return (
        <StyledDesktop ref={drop}>
            {children}
        </StyledDesktop>    
    )
}

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const App = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [openPages, setOpenPages] = React.useState<string[]>([]);

    const dIAboutRef = React.useRef(null);
    const dIProjectsRef = React.useRef(null);
    const dICVRef = React.useRef(null);
    const dIWebCodeRef = React.useRef(null);
    const menuRef = React.useRef(null);

    const openPage = (page: string): void => {
        setOpenPages([...openPages, page]);
    }

    const closePage = (page: string): void => {
        setOpenPages(openPages.filter(p => p !== page));
    }

    const menuOptions = [
        {
            label: 'About',
            icon: '',
            onClick: () => openPage('about')
        },
        {
            label: 'Projects',
            icon: '',
            onClick: () => openPage('projects')
        },
        {
            label: 'CV',
            icon: '',
            onClick: () => openPage('cv')
        },
        {
            label: 'Website Code',
            icon: '',
            onClick: () => openPage('webcode')
        }
    ]

    return (
        <DndProvider backend={HTML5Backend}>
            <Desktop>
                {
                    menuOpen ? <Menu closeMenu={() => setMenuOpen(false) } menuOptions={menuOptions} ref={menuRef} /> : null
                }
                {
                    openPages.includes('about') ? <Program contentId={'about'} name={'About'} close={closePage} /> : null
                }
                {
                    openPages.includes('projects') ? <Program contentId={'projects'} name={'My Projects'} close={closePage} /> : null
                }
                {
                    openPages.includes('cv') ? <Program contentId={'cv'} name={'My CV'} close={closePage} /> : null
                }
                {
                    openPages.includes('webcode') ? <Program contentId={'webcode'} name={'Website Code'} close={closePage} /> : null
                }
                <IconContainer>
                    <DesktopIcon text={'About Me'} iconName={'address_book_user'} onClick={() => openPage('about')} ref={dIAboutRef} />
                    <DesktopIcon text={'Projects'} iconName={'windows_three'} onClick={() => openPage('projects')} ref={dIProjectsRef} />
                    <DesktopIcon text={'CV'} iconName={'winrep-1'} onClick={() => openPage('cv')} ref={dICVRef} />
                    <DesktopIcon text={'Website Code'} iconName={'channels_file-2'} onClick={() => openPage('webcode')} ref={dIWebCodeRef} />
                </IconContainer>
                <Taskbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
            </Desktop>
        </DndProvider>
    );
}

export default App;