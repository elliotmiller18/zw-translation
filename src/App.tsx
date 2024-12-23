import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

type Language = "English" | "Mandarin" 

interface DropdownProps<T> {
    options: T[];
    selectedOption: T;
    onOptionSelect: (option: T) => void;
    label?: string;
}

const App: React.FC = () => {
    const [original_language, set_original_language] = useState<Language>("English");
    const [target_language, set_target_language] = useState<Language>("Mandarin");
    let languages: Language[] = ["English", "Mandarin"];
    return (<div>
        <form>
            <label htmlFor="name">Sentence</label>
            <input type="text" id="name" name="name"/>
            <button type="submit">Submit</button>
        </form>
        <Dropdown options={languages} selectedOption="English" onOptionSelect={Nothing} label="Original Language"/>
        <Dropdown options={languages} selectedOption="Mandarin" onOptionSelect={Nothing} label="Target Language"/>
    </div>)
};

const Nothing = () => {
    return 0;
}

const Dropdown = <T extends string>({options, selectedOption, onOptionSelect, label}: DropdownProps<T>) => {
    return (<div>
            <label htmlFor="languages">{label}</label>
            <select 
            // value={selectedOption ?? ""} onChange={(e) => onOptionSelect(e.target.value as T)}>
            value={selectedOption ?? ""}>
                {options.map((item,index) => (
                    <option key={index} value={item}>
                        {item}
                    </option> 
                ))}
            </select>
        </div>)
}
export default App;