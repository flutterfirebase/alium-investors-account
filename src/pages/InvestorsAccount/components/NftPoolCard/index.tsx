import { Button, Flex, Heading, Text } from '@alium-official/uikit'
import React from 'react'
import styled from 'styled-components'

const NftPoolCardWrap = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: #FFFFFF;
  border-radius: 6px;
  width: 100%;
  padding: 24px;
  margin-bottom: 16px;
  &:last-child: {
    margin-bottom: 0;
  }
  @media (max-width: 1024px){
    flex-direction: column;
  }
`

const Field = styled(Flex)<{maxWidth: string}>`
  font-style: normal;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: #0B1359;
  width: 100%;
  max-width: ${({maxWidth}) => maxWidth};
  flex: 1;
  &:last-child {
    justify-content: flex-end; 
  }
  @media (max-width: 1024px){
    max-width: unset;
    padding: 10px 16px;
    justify-content: space-between;
    text-align: right;
    &:nth-child(2n + 1) {
      background-color: #F4F5FA;
    }
    &:first-child {
      background-color: #FFF;
    }
    &:last-child {
      justify-content: space-between;
    }
  }
`

const FieldName = styled(Text)`
  display: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #8990A5;
  text-align: left;
  @media (max-width: 1024px){
    display: block;
  }
`
const FieldValue = styled(Flex)`
  flex-direction: row;
  align-items: flex-end;
  @media (max-width: 1024px){
    flex-direction: column;
  }
`

const FieldPool = styled(Field)`
  flex-direction: column;
  text-align: left;
  @media (max-width: 1024px){
    margin-bottom: 16px;
    padding: 0;
  }
`
const FieldClaim = styled(Field)`
  align-items: center;
  align-content: center;
  button {
    margin-left: 8px;
  }  
  @media (max-width: 1024px){
    align-items: flex-start;
    button {
      margin-top: 8px;
      margin-left: 0;
    }  
  }
`

const FieldPoolDescription = styled(Flex)`
  margin-top: 8px;
  flex-direction: column;
  @media (max-width: 1024px){
    flex-direction: row;
  }
  @media (max-width: 568px){
    flex-direction: column;
  }
`

function NftPoolCard() {
  return (
    <NftPoolCardWrap>
      <FieldPool maxWidth="310px">
        <Heading as="h3" size="lg" color="#0B1359">ALMs pool A</Heading>
        <FieldPoolDescription>
          <Text fontSize="14" color="#8990A5">20% unlocking after Public Sale starts, </Text>
          <Text fontSize="14" color="#8990A5">20% each month after 3rd month </Text>
        </FieldPoolDescription>
      </FieldPool>
      <Field maxWidth="96px">
        <FieldName>Total ALMs</FieldName>
        1.000.000
      </Field>
      <Field maxWidth="96px">
        <FieldName>Locked</FieldName>
        800.000
      </Field>
      <Field maxWidth="80px">
        <FieldName>Locked</FieldName>
        200.000
      </Field>
      <FieldClaim maxWidth="172px">
        <FieldName>Claimed</FieldName>
        <FieldValue>
          0
          <Button variant="secondary" size="sm" >Claim</Button>
        </FieldValue>
      </FieldClaim>
      <Field maxWidth="140px">
        <FieldName>Next unclocked date</FieldName>
        24th June 2021
      </Field>
    </NftPoolCardWrap>
  )
}

export default NftPoolCard