import './App.css';
import React, { useEffect, useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { newDrugList } from './data/drugs'

// const druglist = [
//   { name: 'paracetamol', concIn_mg_per_mL: 250 / 5 },
//   { name: 'ibuprofen', concIn_mg_per_mL: [100 / 5, 101 / 5] },
//   { name: 'klacide', concIn_mg_per_mL: 125 / 5 },
// ]

function App() {
  const availableOptions = [...newDrugList.map(e => e.name).sort()]
  // console.log(newDrugList)
  // console.log(availableOptions)

  const [weight, setWeight] = useState('')

  const [drug, setDrug] = useState()
  const [drugConc, setDrugConc] = useState()

  const [result, setResult] = useState()

  // not used anymore
  const [hasChooseConc, setHasChooseConc] = useState(false)
  const [dropdownOptions, setDropdownOptions] = useState([])


  useEffect(() => {
    // console.log(drug)
    const selectedDrug = newDrugList.filter(e => e.name === drug)
    // console.log(selectedDrug)

    if (selectedDrug.length > 0) {
      // console.log(selectedDrug[0].concIn_mg_per_mL)
      if (Array.isArray(selectedDrug[0].concIn_mg_per_mL)) {
        setDropdownOptions(
          selectedDrug[0].concIn_mg_per_mL.map(item => ({
            value: item,
            label: item + ' mg/mL'
          }))
        )
        setHasChooseConc(true)
      } else {
        setHasChooseConc(false)
        setDrugConc(selectedDrug[0].concIn_mg_per_mL)
      }
    }

    if (weight != null &&
      weight !== '' &&
      +weight !== 0 &&
      drugConc != '' &&
      drugConc != null) {
      const nums = drugConc.split('/').map(num => parseInt(num))
      const concInNum = nums[0] / nums[1]

      const vol = weight / concInNum
      setResult(vol)
    } else {
      // console.log('clearing..')
      setResult('')
    }
  }, [drug, weight, drugConc])

  // removes concentration display when drug name is no longer valid
  useEffect(() => {
    // console.log(newDrugList.map(d => d.name).includes(drug))
    if(!newDrugList.map(d => d.name).includes(drug)) {
      setDrugConc('')
    }

  }, [drug])

  const handleChange = (content) => {
    if (content.target.value === '') {
      setResult(null)
    }
    // console.log(content.target.value)
    setWeight(content.target.value)
    // handleRequest()
  }

  const handleDrugInput2 = (drugName) => {
    // console.log(drugName)
    drugName = drugName.replace('@', '')
    setDrug(drugName)
    // handleRequest()
  }

  // const handleDrugInput = (drugName) => {
  //   console.log(drugName)
  //   setDrug(drugName)
  //   // handleRequest()
  // }

  // not used anymore
  const handleDropdownSelect = (chosenOption) => {
    // console.log(chosenOption)
    setDrugConc(chosenOption.value)
  }

  const formatDrugConcentration = () => {
    const drugNum = drugConc.split('/')
    return `${drugNum[0]}mg/${drugNum[1]}mL`
  }

  const clearInput = () => {
    setWeight('')
  }


  return (
    <div className='container'>
      <div className='subcontainer'>
          <label id='children' >
            <span id='children'>drug name:</span>
            <TextInput
              Component={'input'}
              trigger={['', '@']}
              options={availableOptions}
              spacer={''}
              // requestOnlyIfNoOptions={false}
              // onRequestOptions={handleDrugInput}
              onSelect={handleDrugInput2}
              onChange={handleDrugInput2}
              maxOptions={50}
              value={drug}
              className="inputBox"
              />
            <button onClick={() => setDrug('')}>x</button>
          </label>

        {drugConc && <p>concentration: {formatDrugConcentration()} </p>}

        {/* not used anymore */}
        {hasChooseConc &&
          <Dropdown options={dropdownOptions}
            onChange={handleDropdownSelect}
            // value={dropdownOptions.length > 0 ? dropdownOptions[0]: ''}
            placeholder="Select an option"
            className='dropdown'
          />
        }

        <label id='children'>
          <span id='children'>dose(mg):</span>
          <input type='text' onChange={handleChange} value={weight} className="inputBox"/>
          <button onClick={clearInput}>x</button>
        </label>

        {result && (<div className="resultContainer">
          <p id='result'>{result?.toFixed(2)} mL</p>
        </div>)}
      </div>

      {/* clear button */}
    </div>
  );
}

export default App;
