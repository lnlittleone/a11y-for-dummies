import React, {useState} from 'react';
import './App.css';
import {Dropdown} from "./components/Dropdown";
import styled from "@emotion/styled";

function App() {

  const smallServicesOptions = [
    'Bar',
    'Blanchisserie',
    'Excursion',
    'Baby club',
    'Meeting & Events',
  ]

  const mediumServicesOptions = [
    'Bar',
    'Blanchisserie',
    'Excursion',
    'Baby club',
    'Meeting & Events',
    'Boutique',
    'Services',
    'Commerces extérieurs',
    'Esthétiques',
    'Caisse',
    'Détente',
    'Anticonstitutionnellement',
  ]

  const largeServicesOptions = [
    'Bar',
    'Blanchisserie',
    'Excursion',
    'Baby club',
    'Meeting & Events',
    'Boutique',
    'Services',
    'Commerces extérieurs',
    'Esthétiques',
    'Caisse',
    'Détente',
    'Anticonstitutionnellement',
    'Baby club',
    'Meeting & Events',
    'Boutique',
    'Services',
    'Commerces extérieurs',
    'Esthétiques',
    'Caisse',
    'Détente',
    'Anticonstitutionnellement',
  ]

  const extraLargeServicesOptions = [
    'Bar',
    'Blanchisserie',
    'Excursion',
    'Baby club',
    'Meeting & Events',
    'Boutique',
    'Services',
    'Commerces extérieurs',
    'Esthétiques',
    'Caisse',
    'Détente',
    'Anticonstitutionnellement',
    'Baby club',
    'Meeting & Events',
    'Boutique',
    'Services',
    'Commerces extérieurs',
    'Esthétiques',
    'Caisse',
    'Détente',
    'Anticonstitutionnellement',
    'Bar',
    'Blanchisserie',
    'Excursion',
    'Baby club',
    'Meeting & Events',
    'Boutique',
    'Services',
    'Commerces extérieurs',
    'Esthétiques',
    'Caisse',
    'Détente',
    'Anticonstitutionnellement',
    'Baby club',
    'Meeting & Events',
    'Boutique',
    'Services',
    'Commerces extérieurs',
    'Esthétiques',
    'Caisse',
    'Détente',
    'Anticonstitutionnellement',
  ]

  const [largeOption, setLargeOption] = useState('')
  const [smallOption, setSmallOption] = useState('')
  const [mediumOption, setMediumOption] = useState('')

  return (
    <div className="App">
      <section className="App-header">

        <LeftContainer>
          <Dropdown
            options={extraLargeServicesOptions.map((key) => ({
              label: key,
              value: key,
            }))}
            placeholder="Test"
            value={largeOption}
            onChange={setLargeOption}
          />
        </LeftContainer>

        <CenteredContainer>
          <Dropdown
            options={smallServicesOptions.map((key) => ({
              label: key,
              value: key,
            }))}
            placeholder="Test"
            value={smallOption}
            onChange={setSmallOption}
          />
        </CenteredContainer>

        <RightContainer>
          <Dropdown
            options={mediumServicesOptions.map((key) => ({
              label: key,
              value: key,
            }))}
            placeholder="Test"
            value={mediumOption}
            onChange={setMediumOption}
          />
        </RightContainer>
      </section>
    </div>
  );
}


const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 10rem;
`

const MediumLeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 10rem;
  padding-left: 45rem;
`

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10rem;
`

const MediumRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 20rem;
  height: 10rem;
`

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 10rem;
`

export default App;
