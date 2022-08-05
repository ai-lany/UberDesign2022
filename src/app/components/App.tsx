import * as React from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);
    const newnameBox = React.useRef<HTMLInputElement>(undefined);
    const checkBox = React.useRef<HTMLInputElement>(undefined);
    let suggestions = [
        {name: 'CTA', to: 'Button'},
        {name: 'Elements / Service Tiles', to: 'Elements / Service Tiles'},
        {name: 'list #1', to: 'List Item'},
    ];
    let checked = false;

    const layerRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '';
        textbox.current = element;
    }, []);
    const nameRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '';
        newnameBox.current = element;
    }, []);
    const checkRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.checked = false;
        checkBox.current = element;
    }, []);

    const onRename = () => {
        //Finds layer with the same name as textbox input.
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'rename',
                    name: textbox.current.value,
                    newName: newnameBox.current.value,
                    all: checked,
                },
            },
            '*'
        );
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    };

    const onCheck = () => {
        checked = !checked;
        console.log(checked);
    };

    const Suggestion = (props) => {
        const applySuggest = () => {
            textbox.current.value = props.name;
            newnameBox.current.value = props.to;
        };
        return (
            <div className="suggestion" onClick={applySuggest}>
                {props.name}
                <svg
                    style={{position: 'relative', top: '4px', margin: '0 4px'}}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right-short"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                    />
                </svg>
                <span className="correction">{props.to}</span>
            </div>
        );
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <div style={{display: 'flex'}}>
            <div style={{flex: 50, borderRight: 'solid 1px #e8e8e8'}}>
                <img src={require('../assets/logo.svg')} />
                <h2>Rename It</h2>
                <p>
                    <input type="text" ref={layerRef} placeholder="Layer Name" />
                </p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                    />
                </svg>
                <p>
                    <input type="text" ref={nameRef} placeholder="New Name" />
                </p>
                <input type="checkbox" ref={checkRef} onChange={onCheck} />{' '}
                <span style={{position: 'relative', bottom: '2px'}}>Rename all elements with this name?</span>
                <br></br>
                <br></br>
                <button id="rename" onClick={onRename}>
                    Rename
                </button>
                <button onClick={onCancel}>Cancel</button>
            </div>
            <div style={{flex: 50}}>
                <h3>Suggested Changes</h3>
                <ul>
                    {suggestions.map((suggestion) => {
                        return (
                            <li>
                                <Suggestion name={suggestion.name} to={suggestion.to} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default App;
