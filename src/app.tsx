import * as React from 'react';
import styled from 'styled-components';
import Taskbar from './components/taskbar';

const Desktop = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    background-color: #008080;
`;

const App = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    return (
        <Desktop>
            <Taskbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
        </Desktop>
    );
}

export default App;