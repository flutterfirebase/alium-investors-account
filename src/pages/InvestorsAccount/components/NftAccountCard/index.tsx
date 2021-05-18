import React from 'react'
// import { BigNumber } from '@ethersproject/bignumber'
// import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Text, Flex } from '@alium-official/uikit'
import { CardType } from '../../constants/cards'

const NFTWrapper = styled.button`
  border: none;
  box-sizing: border-box;
  border-radius: 6px;
  outline: none;
  background: none;
  position: relative;
  width: 354px;
  background-color: white;
`

const StyledFlex = styled(Flex)`
  flex-direction: column;
`

const Image = styled.img`
  width: 100%;
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

const NftAccountCard = ({ card
                          // , handleChange, buttonWrap
}: PropsType) => {
  // const { t } = useTranslation()

  const ID = card.id.toString()

  return (
    <NFTWrapper key={ID} type="button">
      <StyledFlex>
        <Image src={card.img} alt="nft-preview" className="nft-preview" />
        <Flex padding={16} justifyContent="space-between">
          <Text style={{ fontSize: '14px', color: '#8990A5' }}>Total available cards:</Text>
          <Text style={{ fontSize: '14px', color: '#6C5DD3' }}>11</Text>
        </Flex>
      </StyledFlex>
    </NFTWrapper>
  )
}

export default NftAccountCard
