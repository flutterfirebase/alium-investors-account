import { useCallback, useEffect, useMemo, useState } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useActiveWeb3React } from './index'
import { getContract } from '../utils'
import {
  AliumCollectibleAbi,
  NFT_ALIUM_COLLECTIBLE_NFT,
  NFT_EXCHANGER_PRIVATE, NFT_EXCHANGER_PUBLIC, NFTPrivateExchangerAbi, NFTPublicExchangerAbi
} from '../pages/InvestorsAccount/constants'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'

export default function useNftAccountCard(tokenId: number | string, cardId: number) {
  const [collectibleContract, setCollectibleContract] = useState<Contract | null>(null)
  const [privateExchangerContract, setPrivateExchangerContract] = useState<Contract | null>(null)
  const [publicExchangerContract, setPublicExchangerContract] = useState<Contract | null>(null)
  const [pending, setPending] = useState<boolean>(false)
  const { account, library } = useActiveWeb3React()

  useEffect(() => {
    if (library && account) {
      const instanceCollectible = getContract(NFT_ALIUM_COLLECTIBLE_NFT, AliumCollectibleAbi, library, account)
      const instancePrivate = getContract(NFT_EXCHANGER_PRIVATE, NFTPrivateExchangerAbi, library, account)
      const instancePublic = getContract(NFT_EXCHANGER_PUBLIC, NFTPublicExchangerAbi, library, account)
      setCollectibleContract(instanceCollectible)
      setPrivateExchangerContract(instancePrivate)
      setPublicExchangerContract(instancePublic)
    }
  }, [library, account])
  const addTransaction = useTransactionAdder()
  const inputs = useMemo(() => tokenId !== '' ? [tokenId] : [1], [tokenId])
  const ownerOfToken = useSingleCallResult(collectibleContract, 'ownerOf', inputs).result
  const tokenType = useSingleCallResult(collectibleContract, 'getTokenType', inputs).result?.[0].toString()
  // const allowance = useSingleCallResult(collectibleContract, 'getApproved', inputs).result
  const isApprovedPublic = useSingleCallResult(collectibleContract, 'isApprovedForAll', [account || undefined, NFT_EXCHANGER_PUBLIC]).result?.[0]
  const isApprovedPrivate = useSingleCallResult(collectibleContract, 'isApprovedForAll', [account || undefined, NFT_EXCHANGER_PRIVATE]).result?.[0]
  const totalSupply = useSingleCallResult(collectibleContract, 'totalSupply').result

  let error = ''

  const approve = useCallback (async (privateCall: boolean) => {
    if (collectibleContract && account) {
      setPending(true)
      return collectibleContract.setApprovalForAll(privateCall ? NFT_EXCHANGER_PRIVATE : NFT_EXCHANGER_PUBLIC, true, { from: account })
        .then(response => {
          addTransaction(response, {
            summary: `Approve for all nft tokens`,
          })
          return response.hash
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          setPending(false)
        })
      // const res = await new Promise<string>((resolve => {
      //   setTimeout(() => {
      //     setPending(false)
      //     resolve('0x123123123')
      //   }, 1000)
      // }))
      // return res
    }
    return null
  }, [collectibleContract, account, addTransaction])

  if (account && ownerOfToken?.[0] !== account) {
    error = 'You don`t have this token!'
  }

  const onConvert = useCallback(async (privateCall: boolean, token: number) => {
    if (account && privateExchangerContract && publicExchangerContract) {
      const contract = privateCall ? privateExchangerContract : publicExchangerContract
      return contract.charge(token, { from: account })
        .then(response => {
          addTransaction(response, {
            summary: `Convert token with id - ${token}`,
          })
          return response.hash
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          setPending(false)
        })
    }
    return null
  }, [account, addTransaction, privateExchangerContract, publicExchangerContract])

  if (tokenType && parseInt(tokenType) !== cardId) {
    error = "Invalid Pool ID"
  }

  if (tokenId === '') {
    error = 'Enter NFT ID'
  }

  return {
    isApprovedPrivate,
    isApprovedPublic,
    onApprove: approve,
    totalSupply: totalSupply?.[0]?.toString(),
    error,
    pending,
    onConvert
  }
}