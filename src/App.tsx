import React, { useState } from 'react';

interface DropdownProps<T> {
    options: T[];
    selectedOption: T;
    label: string;
    changeFunction: React.Dispatch<React.SetStateAction<string>>;
}

const App: React.FC = () => {
    const [originalLanguage, setOriginalLanguage] = useState<string>("English");
    const [targetLanguage, setTargetLanguage] = useState<string>("Mandarin");
    const [proficiency, setProficiency] = useState<string>("Intermediate");
    const [response, setResponse] = useState<string>("");
    let proficiencies: string[] = ["Beginner", "Intermediate", "Advanced", "Fluent"];
    let languages: string[] = ["English", "Mandarin", "Cantonese", "Shanghainese"];

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>, label: string) => {
        if(label == "Original Language"){
            if(event.target.value == targetLanguage) {
                setTargetLanguage(originalLanguage);
            }
            setOriginalLanguage(event.target.value);
        } else if(label == "Target Language") {
            if(event.target.value == originalLanguage) {
                setOriginalLanguage(targetLanguage);
            }
            setTargetLanguage(event.target.value);
        } else if(label == "Proficiency") {
            setProficiency(event.target.value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = {
            originalSentence: formData.get("originalSentence"),
            userTranslatedSentence: formData.get("userTranslatedSentence"),
            originalLanguage,
            targetLanguage,
            proficiency,
        };

        fetch("/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((result) => {
            //console.log(result)
            setResponse(result["response"]);
        });
    }

    const Dropdown = <T extends string>({options, selectedOption, label, changeFunction: useEffectChangeFunc}: DropdownProps<T>) => {
        return (<div>
                <label htmlFor="languages">{label} </label>
                <select 
                onChange={(event) => handleLanguageChange(event, label)}
                value={selectedOption ?? ""}>
                    {options.map((item,index) => (
                        <option key={index} value={item}>
                            {item}
                        </option> 
                    ))}
                </select>
            </div>);
    };

    return (<div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="sentence">Original Sentence:</label>
            <input type="text" name="originalSentence"/>
            <br></br>
            Your Translation:
            <input type="text" name="userTranslatedSentence"/>
            {/* <input type="hidden" name = "originalLanguage" value={originalLanguage}/>
            <input type="hidden" name = "targetLanguage" value={targetLanguage}/>
            <input type="hidden" name = "proficiency" value={proficiency}/> */}
            <button type="submit">Submit</button>
        </form>
        <Dropdown options={languages} selectedOption={originalLanguage} label="Original Language" changeFunction={setOriginalLanguage}/>
        <Dropdown options={languages} selectedOption={targetLanguage} label="Target Language" changeFunction={setTargetLanguage}/>
        <Dropdown options={proficiencies} selectedOption={proficiency} label="Proficiency" changeFunction={setProficiency}/>
        Response: {response}
    </div>)
};


export default App;