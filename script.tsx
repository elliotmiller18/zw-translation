import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
    const [sentence, setSentence] = useState<string>('');
    return (<div>
        hello world
    </div>)
};

const rootElement = document.getElementById('root');
if(rootElement){
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}