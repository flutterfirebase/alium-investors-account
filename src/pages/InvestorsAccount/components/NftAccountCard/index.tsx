import { Button, Flex, Input } from '@alium-official/uikit'
import React from 'react'
// import { BigNumber } from '@ethersproject/bignumber'
// import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CardType } from '../../constants/cards'

const NFTWrapper = styled.div`
  border: none;
  box-sizing: border-box;
  border-radius: 6px;
  outline: none;
  background: none;
  position: relative;
  width: 100%;
  max-width: 320px;
  background-color: white;
  margin: 0 15px 15px;
  @media (min-width: 568px) {
    width: calc(100% / 2 - 30px);
    max-width: 280px;
  }
  @media (min-width: 768px) {
    width: calc(100% / 3 - 30px);
    max-width: 280px;
  }
  @media (min-width: 1024px) {
    max-width: 354px;
    width: calc(100% / 3 - 30px);
  }
`

const StyledFlex = styled(Flex)`
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`
// const TotalFlex = styled(Flex)`
//   justify-content: space-between;
//   padding: 2px 0;
//   margin-top: 16px;
//   box-sizing: border-box;
//   width: 100%;
// `
const ButtonFlex = styled(Flex)`
  padding 0;
  margin-top: 16px;
  box-sizing: border-box;
  width: 100%;
  button {
    width: 100%; 
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: 333px;
  margin: 0 auto;
`

const InputWrapper = styled(Flex)`
  margin-top: 32px;
  position: relative;
  width: 100%;
`
const Label = styled.label`
  font-size: 12px;
  color: #6c5dd3;
  position: absolute;
  background-color: white;
  line-height: 14px;
  top: -6px;
  left: 12px;
  padding: 0 4px;
  top: calc(0% - 14px / 2);
  @media (min-width: 568px) {
    font-size: 10px;
  }
  @media (min-width: 1024px) {
    font-size: 12px;
  }
`

// type TextPropsType = React.ComponentProps<typeof Text>

// const StyledHeading = (props: TextPropsType) => (
//   <Text
//     mb="15px"
//     style={{
//       textAlign: 'left',
//       fontStyle: 'normal',
//       fontWeight: '500',
//       fontSize: '24px',
//       lineHeight: '22px',
//       letterSpacing: '0.3px',
//       color: '#0B1359',
//     }}
//     {...props}
//   />
// )

type PropsType = {
  card: CardType
  // handleChange: any
  // buttonWrap: any
}

const NftAccountCard = ({
  card,
}: // , handleChange, buttonWrap
PropsType) => {
  // const { t } = useTranslation()

  const ID = card.id.toString()

  return (
    <NFTWrapper key={ID}>
      <StyledFlex>
        <Image src={card.img} alt="nft-preview" className="nft-preview" />
        <InputWrapper>
          <Label>Put you NFT id from your collection</Label>
          <Input type="number" scale="lg" step={1} min={1} placeholder="0" />
        </InputWrapper>
        <ButtonFlex>
          <Button>Convert to ALMs</Button>
        </ButtonFlex>
      </StyledFlex>
    </NFTWrapper>
  )
}

export default NftAccountCard
