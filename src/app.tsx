import * as React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import DesktopIcon from './components/icon';
import Menu from './components/menu';
import Program from './components/program';
import Taskbar from './components/taskbar';
import { StringObject } from './types';
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
    const [pages, setPages] = React.useState<StringObject>({
        projects: 'closed',
        cv: 'closed',
        about: 'closed',
        webcode: 'closed'
    });

    const dIAboutRef = React.useRef(null);
    const dIProjectsRef = React.useRef(null);
    const dICVRef = React.useRef(null);
    const dIWebCodeRef = React.useRef(null);
    const menuRef = React.useRef(null);
    
    // Uses the callback as pages was not being updated within the function
    const openPage = (page: string): void => {
        setPages((oldPages: StringObject) => ({ ...oldPages, [page]: 'open' }));
    }

    const closePage = (page: string): void => {
        setPages({ ...pages, [page]: 'closed' });
    }

    const minimisePage = (page: string): void => {
        setPages({ ...pages, [page]: 'minimised' });
    }

    console.log(pages);

    const menuOptions = [
        {
            label: 'About Me',
            icon: 'address_book_user',
            onClick: () => openPage('about')
        },
        {
            label: 'Projects',
            icon: 'windows_three',
            onClick: () => openPage('projects')
        },
        {
            label: 'CV',
            icon: 'winrep-1',
            onClick: () => openPage('cv')
        },
        {
            label: 'Website Code',
            icon: 'channels_file-2',
            onClick: () => openPage('webcode')
        }
    ]

    return (
        <DndProvider backend={HTML5Backend}>
            <Desktop>
                {
                    menuOpen ? <Menu closeMenu={() => setMenuOpen(false)} menuOptions={menuOptions} ref={menuRef} /> : null
                }
                {
                    pages['about'] === 'open' ? <Program contentId={'about'} name={'About'} close={closePage} minimise={minimisePage} /> : null
                }
                {
                    pages['projects'] === 'open' ? <Program contentId={'projects'} name={'My Projects'} close={closePage} minimise={minimisePage} /> : null
                }
                {
                    pages['cv'] === 'open' ? <Program contentId={'cv'} name={'My CV'} close={closePage} minimise={minimisePage} /> : null
                }
                {
                    pages['webcode'] === 'open' ? <Program contentId={'webcode'} name={'Website Code'} close={closePage} minimise={minimisePage} /> : null
                }
                <IconContainer>
                    <DesktopIcon text={'About Me'} iconName={'address_book_user'} onClick={() => openPage('about')} ref={dIAboutRef} />
                    <DesktopIcon text={'Projects'} iconName={'windows_three'} onClick={() => openPage('projects')} ref={dIProjectsRef} />
                    <DesktopIcon text={'CV'} iconName={'winrep-1'} onClick={() => openPage('cv')} ref={dICVRef} />
                    <DesktopIcon text={'Website Code'} iconName={'channels_file-2'} onClick={() => openPage('webcode')} ref={dIWebCodeRef} />
                </IconContainer>
                <Taskbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} pages={pages} openPage={openPage} minimisePage={minimisePage} />
            </Desktop>
        </DndProvider>
    );
}

export default App;