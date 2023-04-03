import React, { useState } from 'react';
import { getBigrams, getColorForFrequency, getMaxFrequency, getWidth } from '../functions/bigrams';
import ReactSwitch from 'react-switch';
import '../css/Home.css';

type Props = {};

const Home: React.FC<Props> = () => {
  const [inputText, setInputText] = useState<string>('');
  const [bigramFrequencies, setBigramFrequencies] = useState(new Map<string, number>())
  const [tableDataBigram, setTableData] = useState<JSX.Element[][]>()
  const [monochrome, setMonochromacy] = useState<boolean>(false);
  //useState<{ [key: string]: number }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  // const handleUppercaseButtonClick = () => {
  //   const uppercaseText = inputText.toUpperCase();
  //   setInputText(uppercaseText);
  // };

  // const handleLowercaseButtonClick = () => {
  //   const lowercaseText = inputText.toLowerCase();
  //   setInputText(lowercaseText);
  // };

  const handleMonochromacy = () => {
    const boolMonochrome = !monochrome;
    setMonochromacy(boolMonochrome);
    console.log(monochrome);
    setBigramFrequencies(getBigrams(inputText.toLowerCase()));
  };

  const handleBigramButtonClick = () => {
    setBigramFrequencies(getBigrams(inputText.toLowerCase()));
  };

  React.useEffect(() => {
    const max_freq: number = getMaxFrequency(bigramFrequencies);
    const tableData: JSX.Element[][] = [];
    for (let y = 0; y < 27; y++) {
      const row: JSX.Element[] = [];
      // Push first letter
      row.push(
        <td key={y === 26 ? " " : String.fromCharCode(65 + y)} style={{ backgroundColor: 'black', width: '0.8rem' }}>
          {y === 26 ? " " : String.fromCharCode(65 + y)}
        </td>
      );
      // Push freq
      for (let x = 0; x < 27; x++) {
        
        const bigram = (y === 26? " ": String.fromCharCode(97 + y)) +
                        (x === 26? " ": String.fromCharCode(97 + x));
        const frequency = bigramFrequencies.get(bigram) || 0;
    
        // DEBUG ONLY
        //console.log([bigram, bigramFrequencies.get(bigram) || 0])
        
        const color = getColorForFrequency(frequency, max_freq, monochrome);
        console.log(monochrome)
        const dataWidth = getWidth(frequency, max_freq);
        row.push(
          <td key={x}>
            <div style={{backgroundColor: color, width: dataWidth, height: dataWidth}}>
            </div>
          </td>
        );
      }

      tableData.push(row);
    }
    const row: JSX.Element[] = [];
    row.push(
      <td key={String.fromCharCode(64)} style={{ backgroundColor: 'black' }}>
        {" "}
      </td>
    );
    for (let y = 0; y < 26; y++) {
      row.push(
        <td key={String.fromCharCode(65 + y)} style={{ backgroundColor: 'black' }}>
          {String.fromCharCode(65 + y)}
        </td>
      );
    }
    row.push(
      <td key={' '} style={{ backgroundColor: 'black' }}>
        {' '}
      </td>
    );
    tableData.push(row)
    
    setTableData(tableData);
    console.log(tableData);
    
}, [bigramFrequencies, monochrome])

  return (
    <>
      <div className="text-processor">
        <textarea className="text-input" placeholder='Enter your silly text...' value={inputText} onChange={handleInputChange} />
        <div className="button-group">
          <button className="retro-button" onClick={handleBigramButtonClick}>Bigrams</button>
          <button className="retro-button" onClick={handleMonochromacy} style={{boxShadow: monochrome ? "0px 0px 0px 1px white inset" : "0px 0px 0px 0px #666"}}>Monochromacy</button>
          {/* <ReactSwitch
            checked={monochrome}
            onChange={handleMonochromacy}
          /> */}
        </div>
        
      </div>
      <table>
        <tbody>
          {
            tableDataBigram? tableDataBigram.map((row, index) => (<tr key={index}>{row}</tr>)) : <tr></tr>
          }
        </tbody>
      </table>
    </>
  );
};

export default Home;
