import * as React from 'react';
import styled from 'styled-components';
import DesktopIcon from './components/icon';
import Menu from './components/menu';
import Program from './components/program';
import Taskbar from './components/taskbar';
import { PagesObject } from './types';
import '../node_modules/react-resizable/css/styles.css';

interface DesktopProps {
    children: (JSX.Element | null)[];
};

const Desktop = (props: DesktopProps) => {
    const { children } = props;

    const StyledDesktop = styled.div`
        display: flex;
        height: 100vh;
        width: 100%;
        background-color: #008080;
    `;

    return (
        <StyledDesktop>
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
    const [pages, setPages] = React.useState<PagesObject>({
        projects: {
            open: false,
            state: 'default',
            prevState: null
        },
        cv: {
            open: false,
            state: 'default',
            prevState: null
        },
        about: {
            open: false,
            state: 'default',
            prevState: null
        },
        webcode: {
            open: false,
            state: 'default',
            prevState: null
        }
    });

    const dIAboutRef = React.useRef(null);
    const dIProjectsRef = React.useRef(null);
    const dICVRef = React.useRef(null);
    const dIWebCodeRef = React.useRef(null);
    const menuRef = React.useRef(null);
    
    // Uses the callback as pages was not being updated within the function
    const openPage = (page: string): void => {
        if (pages[page].open && pages[page].state === 'minimised') {
            setPages((oldPages: PagesObject) => ({ ...oldPages, [page]: { ...oldPages[page], state: oldPages[page].prevState || 'default' } }));
        } else {
            setPages((oldPages: PagesObject) => ({ ...oldPages, [page]: { ...oldPages[page], prevState: pages[page].state, open: true } }));
        }
    }

    const closePage = (page: string): void => {
        setPages({ ...pages, [page]: { ...pages[page], prevState: pages[page].state, open: false, state: 'default' } });
    }

    const minimisePage = (page: string): void => {
        setPages({ ...pages, [page]: { ...pages[page], prevState: pages[page].state, state: 'minimised' } });
    }

    const maximisePage = (page: string): void => {
        if (pages[page].state === 'maximised') {
            setPages({ ...pages, [page]: { ...pages[page], prevState: pages[page].state, state: 'default' } });
        } else {
            setPages({ ...pages, [page]: { ...pages[page], prevState: pages[page].state, state: 'maximised' } });
        }
    }

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
    ];

    return (
        <Desktop>
            {
                menuOpen ? <Menu closeMenu={() => setMenuOpen(false)} menuOptions={menuOptions} ref={menuRef} /> : null
            }
            {
                pages['about'].open && pages['about'].state !== 'minimised' ? <Program contentId={'about'} name={'About'} close={closePage} minimise={minimisePage} maximise={maximisePage} pages={pages} /> : null
            }
            {
                pages['projects'].open && pages['projects'].state !== 'minimised' ? <Program contentId={'projects'} name={'My Projects'} close={closePage} minimise={minimisePage} maximise={maximisePage} pages={pages} /> : null
            }
            {
                pages['cv'].open && pages['cv'].state !== 'minimised' ? <Program contentId={'cv'} name={'My CV'} close={closePage} minimise={minimisePage} maximise={maximisePage} pages={pages} /> : null
            }
            {
                pages['webcode'].open && pages['webcode'].state !== 'minimised' ? <Program contentId={'webcode'} name={'Website Code'} close={closePage} minimise={minimisePage} maximise={maximisePage} pages={pages} /> : null
            }
            <IconContainer>
                <DesktopIcon text={'About Me'} iconName={'address_book_user'} onClick={() => openPage('about')} ref={dIAboutRef} />
                <DesktopIcon text={'Projects'} iconName={'windows_three'} onClick={() => openPage('projects')} ref={dIProjectsRef} />
                <DesktopIcon text={'CV'} iconName={'winrep-1'} onClick={() => openPage('cv')} ref={dICVRef} />
                <DesktopIcon text={'Website Code'} iconName={'channels_file-2'} onClick={() => openPage('webcode')} ref={dIWebCodeRef} />
            </IconContainer>
            <Taskbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} pages={pages} openPage={openPage} minimisePage={minimisePage} />
        </Desktop>
    );
}

export default App;