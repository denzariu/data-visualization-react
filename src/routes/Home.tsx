import React, { useState } from 'react';
import { getBigrams, getColorForFrequency } from '../functions/bigrams';
import '../css/Home.css';

type Props = {};

const Home: React.FC<Props> = () => {
  const [inputText, setInputText] = useState<string>('');
  const [bigramFrequencies, setBigramFrequencies] = useState(new Map<string, number>)
  const [tableDataBigram, setTableData] = useState<JSX.Element[][]>()
  //useState<{ [key: string]: number }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleUppercaseButtonClick = () => {
    const uppercaseText = inputText.toUpperCase();
    setInputText(uppercaseText);
  };

  const handleLowercaseButtonClick = () => {
    const lowercaseText = inputText.toLowerCase();
    setInputText(lowercaseText);
  };

  const handleBigramButtonClick = () => {
    setBigramFrequencies(getBigrams(inputText));
    generateTableData();
  };

  const generateTableData = () => {
    const tableData: JSX.Element[][] = [];
    for (let y = 0; y < 26; y++) {
      const row: JSX.Element[] = [];
      for (let x = 0; x < 26; x++) {
        const bigram = String.fromCharCode(97 + y) + String.fromCharCode(97 + x);
        const frequency = bigramFrequencies.get(bigram) || 0;
        const color = getColorForFrequency(frequency);
        row.push(
          <td key={x} style={{ backgroundColor: color }}>
            {frequency}
          </td>
        );
      }
      tableData.push(row);
    }
    setTableData(tableData);
    console.log(tableData);
  };

  return (
    <>
      <div className="text-processor">
        <textarea className="text-input" value={inputText} onChange={handleInputChange} />
        <div className="button-group">
          <button className="retro-button" onClick={handleUppercaseButtonClick}>UPPERCASE</button>
          <button className="retro-button" onClick={handleBigramButtonClick}>Bigrams</button>
          <button className="retro-button" onClick={handleLowercaseButtonClick}>lowercase</button>
        </div>
        
      </div>
      <div>
        {
          tableDataBigram? tableDataBigram : <div></div>
        }
      </div>
    </>
  );
};

export default Home;
