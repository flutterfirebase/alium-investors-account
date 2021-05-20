import React, { useCallback, useMemo, useState } from 'react'
// import { BigNumber } from '@ethersproject/bignumber'
// import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Text, Flex, Button, Input } from '@alium-official/uikit'
import { CardType } from '../../constants/cards'
import useNftAccountCard from '../../../../hooks/useNftAccountCard'
import Modal from '../../../../components/Modal'
import { TransactionSubmittedContent } from '../../../../components/TransactionConfirmationModal'
import { useActiveWeb3React } from '../../../../hooks'
import { Dots } from '../../../../components/swap/styleds'

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
const TotalFlex = styled(Flex)`
  justify-content: space-between;
  padding: 2px 0;
  margin-top: 16px;
  box-sizing: border-box;
  width: 100%;
`
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
const Video = styled.video`
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
  color: #6C5DD3;
  position: absolute;
  background-color: white;
  line-height: 14px;
  top: -6px;
  left: 12px;
  padding: 0 4px;
  top: calc(0% - 14px/2);
  @media (min-width: 568px) {
    font-size: 10px; 
  }
  @media (min-width: 1024px) {
    font-size: 12px; 
  }
`

type PropsType = {
  card: CardType
  // handleChange: any
  // buttonWrap: any
}

const NftAccountCard = ({
                          card
                          // , handleChange, buttonWrap
                        }: PropsType) => {
  const isMp4 = card.img.split('.')[1] === 'mp4'
  const [value, setValue] = useState<number | string>('')
  const [isTxOpen, setTxOpen] = useState(false)
  const [txHash, setTxHash] = useState('xczxczxczxc')
  const { chainId } = useActiveWeb3React()
  const handleTxClose = () => {
    setTxOpen(false)
  }

  const {totalSupply, error, isApprovedPrivate, isApprovedPublic, pending, onApprove, onConvert} = useNftAccountCard(value, card.id)

  const limitId: number = useMemo(() => {
    return totalSupply ? parseInt(totalSupply) : 1
  }, [totalSupply])

  const handleInput = useCallback(
    (event) => {
      let input = event.target.value
      input = parseInt(input) <= 1 ? '1' : input
      input = parseInt(input) >= limitId ? limitId.toString() : input
      const withoutSpaces = input.replace(/\s+/g, '')
      setValue(withoutSpaces)
    },
    [setValue, limitId]
  )

  const onApproveHandler = useCallback(() => {
    onApprove(card.privateCall)
      .then((tx) => {
        if (tx) {
          setTxHash(tx)
          setTxOpen(true)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }, [card.privateCall, onApprove])

  const onConvertHandler = useCallback(() => {
    onConvert(card.privateCall, typeof value === 'string' ? parseInt(value) : value)
      .then((tx) => {
        if (tx) {
          setTxHash(tx)
          setTxOpen(true)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }, [card.privateCall, onConvert, value])

  return (
    <NFTWrapper>
      <Modal isOpen={isTxOpen} onDismiss={handleTxClose} maxHeight={90} padding="24px" isTransparancy>
        <TransactionSubmittedContent chainId={chainId} hash={txHash} onDismiss={handleTxClose} />
      </Modal>
      <StyledFlex>
        {
          isMp4
          ? <Video autoPlay loop muted>
              <source src={card.img} type="video/mp4" />
            </Video>
            : <Image src={card.img} alt="nft-preview" className="nft-preview" />
        }
        <InputWrapper>
          <Label>
            Put you NFT id from your collection
          </Label>
          <Input
            type="number"
            scale="lg"
            step={1}
            min={1}
            placeholder="1"
            value={value}
            onChange={handleInput}
          />
        </InputWrapper>
        <ButtonFlex>
          {
            (card.privateCall && isApprovedPrivate) || (!card.privateCall && isApprovedPublic)
            ? <Button onClick={onConvertHandler} disabled={Boolean(error)}>{pending ? <Dots>Converting</Dots> : error || "Convert to ALMs"}</Button>
              : <Button onClick={onApproveHandler} disabled={pending}>{pending ? <Dots>Approving</Dots> : "Approve"}</Button>
          }
        </ButtonFlex>
      </StyledFlex>
    </NFTWrapper>
  )
}

export default NftAccountCard
