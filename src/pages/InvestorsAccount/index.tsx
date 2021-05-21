import { Flex, Heading, Text } from '@alium-official/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Modal from 'components/Modal'
import { TransactionSubmittedContent, TransactionSucceedContent } from 'components/TransactionConfirmationModal'
import { useActiveWeb3React } from 'hooks'
import { useNFTPrivateContract } from 'hooks/useContract'
import useNftPoolHook from 'hooks/useNftPool'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { PopupList } from 'state/application/reducer'
import { AppState } from 'state/index'
import styled from 'styled-components'
import AppBody from '../AppBody'
import NftAccountCard from './components/NftAccountCard'
import NftNavTabs from './components/NftNavTabs'
import NftPoolCard from './components/NftPoolCard'
import NftPoolsHeader from './components/NftPoolsHeader'
import { cardListPrivate, cardListPublic, cardListStrategical } from './constants/cards'

const ContentHolder = styled.div`
  position: relative;
  margin: -11px 9px;
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

const StyledHeading = styled(Heading)`
  &.heading--desktop {
    display: none;
  }
  &.heading--mobile {
    display: none;
  }
  @media screen and (max-width: 1170px) {
    &.heading--desktop {
      display: block;
      font-size: 32px;
      text-align: center;
    }
  }
  @media screen and (max-width: 850px) {
    &.heading--desktop {
      display: block;
      font-size: 32px;
      text-align: left;
      margin: 36px 0 24px 0;
    }
  }
  @media screen and (max-width: 850px) {
    &.heading--desktop {
      display: none;
    }
    &.heading--mobile {
      display: block;
      text-align: left;
      letter-spacing: 0.3px;
      margin-bottom: 24px;
    }
  }
  @media screen and (max-width: 790px) {
    &.heading--mobile {
      font-size: 28px;
      text-align: center;
      line-height: 34.1px;
    }
  }
  @media screen and (max-width: 544px) {
    padding: 0 78px;
  }
  @media screen and (max-width: 482px) {
    padding: 0 60px;
  }
  @media screen and (max-width: 446px) {
    padding: 0 60px;
  }
  @media screen and (max-width: 446px) {
    padding: 0 30px;
  }
  @media screen and (max-width: 386px) {
    padding: 0;
  }
  @media screen and (max-width: 480px) {
    &.heading--mobile {
      // margin-bottom: 70px
    }
  }
`

// const AddressWrap = styled.div`
//   margin-top: 10px;
//   background: rgba(108, 93, 211, 0.1);
//   border: 1px solid #6c5dd3;
//   padding: 5px;
//   margin: 8px 0 32px 0;
//   width: 207px;
//   align-self: center;
//   border-radius: 6px;
//   text-align: center;
//   font-size: 14px;
//   line-height: 20px;
//   letter-spacing: 0.3px;
//   color: #6c5dd3;
// `

// const StyledLink = styled.a`
//   color: #6c5dd3;
//   display: inline-block;
//   text-decoration: underline;
//   cursor: pointer;
//   :active {
//     outline: none;
//     border: none;
//   }
//   :focus {
//     outline: none;
//     border: none;
//   }
// `

// const StyledTextWrapper = styled.div`
//   padding: 0 80px;

//   @media screen and (max-width: 655px) {
//     padding: 0 50px;
//   }

//   @media screen and (max-width: 500px) {
//     padding: 0;
//   }
// `

const NftCardsContainer = styled(Flex)`
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: -15px;
  margin-right: -15px;
`

const HelperDiv = styled(Text)`
  padding: 8px 16px;
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 17px;
  width: fit-content;
  span {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;
    color: #ff4d00;
    margin-right: 8px;
  }
`

const NftTable = styled.div`
  margin-top: 24px;
`
const NftTableContent = styled(Flex)`
  margin-top: 8px;
  flex-direction: column;
  width: 100%;
`

// const NotifyMembers = (hash, currency) => {
//   const explorer = 'https://bscscan.com/tx'
//   if (process.env.NODE_ENV !== 'development') {
//     emails.forEach((email) => {
//       const obj = {
//         to: email,
//         subject: 'New card purchase',
//         message: `Client bought card for ${currency} \n  ${explorer}/${hash}`,
//       }
//       axios.post('https://private.alium.finance/api/send-email/', obj).catch((err) => {
//         console.error(err)
//       })
//     })
//   }
// }

const InvestorsAccount = () => {
  // const [poolsWithData, setPoolsWithData] = useState<PoolsTypes[]>(pools)
  const [isHideModalOpen, setHideModalOpen] = useState(false)
  const { account, chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const { poolsWithData, onClaim, pendingClaimResult } = useNftPoolHook()

  const nftContract = useNFTPrivateContract()
  const [isSucceedPopupVisible, setSucceedPopupVisible] = useState(false)

  useEffect(() => {
    if (!account) return
    nftContract?.bought(account).then((res) => {
      if (res === true) {
        setSucceedPopupVisible(true)
      } else if (isSucceedPopupVisible) {
        setSucceedPopupVisible(false)
      }
    })
  }, [account, isSucceedPopupVisible, nftContract])

  // const [values, setValues] = useState<any>({
  //   currency: currencies.stablecoins[0],
  //   count: 1,
  // })

  const [txHash, setTxHash] = useState('xczxczxczxc')
  const [tempTxHash, setTempTxHash] = useState('')
  const [isTxOpen, setTxOpen] = useState(false)
  // const [bought, setBought] = useState(false);

  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)
  const transactions: any = chainId ? state[chainId] ?? {} : {}

  if (txHash !== '' && transactions[txHash]?.receipt) {
    setTempTxHash(txHash)
    setTxHash('')
    setTxOpen(false)
  }

  useEffect(() => {
    setHideModalOpen(!account)

    // if (account) {
    //   nftContract
    //     ?.isMember(account)
    //     .then((isMemberBool) => {
    //       if (isMemberBool) {
    //         if (isOpenModal) {
    //           setOpenModal(false)
    //         }
    //       } else if (!isOpenModal) {
    //         setOpenModal(true)
    //       }
    //     })
    //     .catch((err) => console.error('isMember error', err))
    // }
  }, [account, nftContract])

  // const addTransaction = useTransactionAdder()
  //
  // const cardPrice = '100000'

  // const handleBuy = () => {
  //   const totalAmount = cardPrice
  //   const args = [
  //     currencies.match[values.currency]?.address,
  //     '5',
  //     parseUnits(totalAmount, currencies.match[values.currency]?.decimals),
  //   ]
  //   nftContract?.estimateGas
  //     .buy(...args, { from: account })
  //     .then((estimatedGasLimit) => {
  //       nftContract
  //         ?.buy(...args, { gasLimit: estimatedGasLimit })
  //         .then((resp) => {
  //           NotifyMembers(resp.hash, values.currency)
  //           addTransaction(resp, {
  //             summary: t('boughtCards', { count: '1' }),
  //             additionalData: {
  //               count: '1',
  //               card: '1',
  //             },
  //           })
  //
  //           setTxHash(resp.hash)
  //           setTxOpen(true)
  //           setBought(true)
  //         })
  //         .catch((err) => console.error(err))
  //     })
  //     .catch((err) => console.error(err))
  // }

  // const [approval, approveCallback] = useApproveCallback(
  //   new TokenAmount(
  //     new WrappedTokenInfo(currencies.match[values.currency], []),
  //     JSBI.BigInt(parseUnits(cardPrice, currencies.match[values.currency]?.decimals).toString())
  //   ),
  //   NFT_PRIVATE_ADDRESS
  // )
  // const [approvalSubmitted, setApprovalSubmitted] = React.useState<boolean>(false)

  // useEffect(() => {
  //   if (approval === ApprovalState.PENDING) {
  //     setApprovalSubmitted(true)
  //   }
  // }, [approval, approvalSubmitted])

  // const handleChange = (value) => {
  //   setValues(value);
  //   if (approvalSubmitted && approval !== ApprovalState.PENDING) {
  //     setApprovalSubmitted(false)
  //   }
  // }

  // const balance = useCurrencyBalance(account?.toString(), new WrappedTokenInfo(currencies.match[values.currency], []))

  // const sufficientBalance =
  //   balance &&
  //   parseInt(balance?.raw.toString()) >=
  //   parseInt(parseUnits(cardPrice, currencies.match[values.currency]?.decimals).toString())

  const handleTxClose = () => {
    setTxOpen(false)
  }

  const popupList = useSelector<AppState, PopupList>((s) => s.application.popupList)
  const succeedHash = txHash || tempTxHash

  const filteredPopups = popupList.filter((popup) => popup.key === succeedHash)
  if (filteredPopups.length && filteredPopups[0].show) {
    if (!isSucceedPopupVisible) {
      setSucceedPopupVisible(true)
    }
  }

  const handleSucceedModalClose = () => {
    // removePopup(succeedHash)
    // setTempTxHash('')
  }

  const onClaimHandler = useCallback(
    (pid: number) => {
      onClaim(pid)
        .then((tx) => {
          if (tx) {
            setTxHash(tx)
            setTxOpen(true)
          }
        })
        .catch((e) => {
          console.error(e.message || e)
        })
      // .finally(() => setTxOpen(false))
    },
    [onClaim]
  )

  return (
    <ContentHolder>
      <CardWrapper>
        <Text fontSize="48px" style={{ fontWeight: 700, marginBottom: '32px' }}>
          Your NFT deck
        </Text>
        <Modal
          isOpen={isHideModalOpen}
          onDismiss={() => {
            return ''
          }}
        >
          <Flex flexDirection="column" style={{ margin: '0 auto' }}>
            <Text
              mb="30px"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.3px',
                color: '#0B1359',
              }}
            >
              {t('pleaseUnlockWallet')}
            </Text>
            <ConnectWalletButton fullwidth />
          </Flex>
        </Modal>
        <Modal isOpen={isTxOpen} onDismiss={handleTxClose} maxHeight={90} padding="24px" isTransparancy>
          <TransactionSubmittedContent chainId={chainId} hash={txHash} onDismiss={handleTxClose} />
        </Modal>

        <Modal isOpen={isSucceedPopupVisible} onDismiss={handleSucceedModalClose} maxHeight={90} padding="24px">
          <TransactionSucceedContent hash={succeedHash} onDismiss={handleSucceedModalClose} />
        </Modal>

        <StyledHeading as="h1" size="xl" color="heading" mb="40px" mt="20px" className="heading--desktop">
          {t('strategicalPartnership')}
        </StyledHeading>
        <StyledHeading as="h1" size="xl" color="heading" mb="40px" className="heading--mobile">
          {t('strategicalPartnership')}
        </StyledHeading>

        <AppBody>
          <StyledHeading as="h2" size="lg" color="heading" mb="16px" mt="16px">
            Private Pool Cards
          </StyledHeading>
          <NftCardsContainer>
            {cardListPrivate.map((card) => (
              <NftAccountCard key={`cardListPrivate-${card.id}`} card={card} />
            ))}
          </NftCardsContainer>
          <StyledHeading as="h2" size="lg" color="heading" mb="16px" mt="16px">
            Strategical Pool Cards
          </StyledHeading>
          <NftCardsContainer>
            {cardListStrategical.map((card) => (
              <NftAccountCard key={`cardListStrategical-${card.id}`} card={card} />
            ))}
          </NftCardsContainer>
          <StyledHeading as="h2" size="lg" color="heading" mb="16px" mt="16px">
            Public Pool Cards
          </StyledHeading>
          <NftCardsContainer>
            {cardListPublic.map((card) => (
              <NftAccountCard key={`cardListPublic-${card.id}`} card={card} />
            ))}
          </NftCardsContainer>
          <HelperDiv>
            <span>*</span>
            Please note that converting Private NFTs to ALMs is an irreversible action.
          </HelperDiv>
          <NftNavTabs />
          <NftTable>
            <NftPoolsHeader />
            <NftTableContent>
              {poolsWithData.map((pool) => (
                <NftPoolCard
                  key={`Pool-Nft-${pool.id}`}
                  pool={pool}
                  onClaim={onClaimHandler}
                  pending={Boolean(pendingClaimResult?.[0] === pool.id)}
                />
              ))}
            </NftTableContent>
          </NftTable>
        </AppBody>
      </CardWrapper>
    </ContentHolder>
  )
}

export default InvestorsAccount
