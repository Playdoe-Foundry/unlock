import React from 'react'
import styled from 'styled-components'

// TODO: redefine these in terms of the grid system in src/components/helpers

export const SectionHeader = styled.span`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 19px;
  color: var(--grey);
`

export const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  & > :first-child {
    margin-top: auto;
  }
`

export const ItemLabel = styled.span`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--darkgrey);
`

// Meant for "small" data -- generally a single line of text
export const ItemValue = styled.span`
  margin: 1rem 0.5rem;
  height: 21px;
  display: flex;
`

export const Input = styled.input`
  height: 60px;
  border: none;
  background-color: var(--lightgrey);
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 1rem;
`

export const Error = styled.span`
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 13px;
`

export const SubmitButton = styled.button`
  height: 60px;
  max-width: 385px;
  border: none;
  background-color: var(--green);
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-top: 13px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  color: var(--darkgrey);
`

export const DisabledButton = styled(SubmitButton)`
  cursor: disabled;
  background-color: var(--grey);
`

interface ItemProps {
  title: string
  children: React.ReactNode
}
export const Item = ({ title, children }: ItemProps) => {
  return (
    <Column>
      <ItemLabel>{title}</ItemLabel>
      {children}
    </Column>
  )
}

// TODO: steal input/button elements from other parts of app and integrate here
