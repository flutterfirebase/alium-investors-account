import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from '@alium-official/uikit'
import NftNavTabs from './components/NftNavTabs'
import AppBody from '../AppBody'
import NftCollectionHeader from './components/NftCollectionHeader'
import NftCollectionCard from './components/NftCollectionCard'
import cardImage from './images/Card-Preview.png'
import useCollectionNft from '../../hooks/useCollectionNft'

const ContentHolder = styled.div`
  position: relative;
  margin: -11px 9px;
`

const SelectedNftRow = styled(Flex)`
  justify-content: center;
  align-content: center;
  align-items; center;
  width: 100%;
`

const SelectedNftWrapper = styled(Flex)`
  position: relative;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  max-width: 354px;
  max-height: 374px;
  height: 374px;
  background-color: #fff;
  padding: 16px;
  box-sizing: border-box;
  span {
    font-style: normal;
    font-weight: 900;
    font-size: 117.091px;
    line-height: 146px;
    letter-spacing: 1.46364px;
    position: absolute;
    bottom: 8px;
    left: 44px;
    color: #FFFFFF;
  }
`

const CardWrapper = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
  width: 100%;
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: 1024px) {
    max-width: 954px;
  }

  @media screen and (max-width: 1016px) {
    padding: 0 32px 0 32px;
  }
  @media screen and (max-width: 790px) {
    padding: 0;
  }
`

const Image = styled.img`
  width: 100%;
  max-height: 342px;
  margin: 0 auto;
`

const NftTable = styled.div`
  margin-top: 24px;
`
const NftTableContent = styled(Flex)`
  margin-top: 8px;
  flex-direction: column;
  width: 100%;
`

function Collection() {

  const [selectedCard, setSelectedCard] = useState<[number, number] | null>(null)

  const onSelectCard = (pid, cid) => {
    setSelectedCard([pid, cid])
  }

  const {poolsWithCards} = useCollectionNft()

  return (
    <ContentHolder>
      <CardWrapper>
        <Text fontSize="48px" style={{ fontWeight: 700, marginBottom: '32px' }}>
          Your NFT deck
        </Text>
        <AppBody>
          <SelectedNftRow>
            <SelectedNftWrapper>
              {
                selectedCard && (
                  <>
                    <Image src={cardImage} alt="nft-preview" className="nft-preview" />
                    <span>{selectedCard[1]}</span>
                  </>
                )
              }
            </SelectedNftWrapper>
          </SelectedNftRow>
          <NftNavTabs />

          <NftTable>
            <NftCollectionHeader />
            <NftTableContent>
              {
                poolsWithCards.map((pool) => (
                  <NftCollectionCard
                    key={`Pool-Nft-${pool.id}`}
                    selectedCard={selectedCard}
                    onSelectCard={onSelectCard}
                    pool={pool} />
                ))
              }
            </NftTableContent>
          </NftTable>
        </AppBody>
      </CardWrapper>
    </ContentHolder>
  )
}

export default Collection