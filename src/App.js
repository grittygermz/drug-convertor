import './App.css';
import React, { useEffect, useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const druglist = [
  { name: 'paracetamol', concIn_mg_per_mL: 250 / 5 },
  { name: 'ibuprofen', concIn_mg_per_mL: [100 / 5, 101 / 5] },
  { name: 'klacide', concIn_mg_per_mL: 125 / 5 },
]

function App() {
  const availableOptions = [...druglist.map(e => e.name)]

  const [weight, setWeight] = useState()

  const [drug, setDrug] = useState()
  const [drugConc, setDrugConc] = useState()

  const [result, setResult] = useState()
  const [hasChooseConc, setHasChooseConc] = useState(false)

  const [dropdownOptions, setDropdownOptions] = useState([])


  useEffect(() => {
    // console.log(drug)
    const selectedDrug = druglist.filter(e => e.name === drug)
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

    if (weight != null && weight !== '' && drugConc != null) {
      // console.log(weight)
      const vol = weight / drugConc
      // console.log(vol)
      setResult(vol)
    }
  }, [drug, weight, drugConc])

  const handleChange = (content) => {
    if (content.target.value === '') {
      setResult(null)
    }
    // console.log(content.target.value)
    setWeight(content.target.value)
    // handleRequest()
  }

  const handleDrugInput2 = (drugName) => {
    console.log(drugName)
    setDrug(drugName)
    // handleRequest()
  }

  const handleDrugInput = (drugName) => {
    console.log(drugName)
    setDrug(drugName)
    // handleRequest()
  }


  const handleDropdownSelect = (chosenOption) => {
    // console.log(chosenOption)
    setDrugConc(chosenOption.value)
  }


  return (
    <div className='container'>
      <div className='subcontainer'>
        <label id='children'>
          <span id='children'>drug name:</span>
          <TextInput
            Component={'input'}
            trigger={''}
            options={availableOptions}
            spacer={''}

            // requestOnlyIfNoOptions={false}
            // onRequestOptions={handleDrugInput}
            onSelect={handleDrugInput2}
          />
        </label>

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
          <input type='text' onChange={handleChange} />
        </label>

        {result && (<div className="resultContainer">
          <p id='result'>{result?.toFixed(2)}</p>
        </div>)}
      </div>
    </div>
  );
}

export default App;
