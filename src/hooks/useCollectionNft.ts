import { useEffect, useMemo, useState } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useActiveWeb3React } from './index'
import { getContract } from '../utils'
import { AliumCollectibleAbi, NFT_ALIUM_COLLECTIBLE_NFT } from '../pages/InvestorsAccount/constants'
import { useSingleCallResult, useSingleContractMultipleData } from '../state/multicall/hooks'
import pools from '../pages/InvestorsAccount/constants/pools'

export default function useCollectionNft() {
  const [collectibleContract, setCollectibleContract] = useState<Contract | null>(null)
  const [nftIndex, setNftIndex] = useState<number[]>([])
  const { account, library } = useActiveWeb3React()

  useEffect(() => {
    if (library) {
      const instance = getContract(NFT_ALIUM_COLLECTIBLE_NFT, AliumCollectibleAbi, library)
      setCollectibleContract(instance)
    }
  }, [library])

  const balanceInputs = useMemo(() => {
    return [account || undefined]
  }, [account])
  const balancesResult = useSingleCallResult(collectibleContract, 'balanceOf', balanceInputs)
  const balanceAccount = useMemo(() => {
    return balancesResult.result?.[0]
  }, [balancesResult])

  useEffect(() => {
    const countNft = balanceAccount?.toNumber()
    const nfts: number[] = []
    for (let i = 0; i < countNft; i++) {
      nfts.push(i)
    }
    setNftIndex(nfts)
  }, [balanceAccount])

  const tokenOfOwnerInputs: [string, number][] = useMemo(() => {
    if (account) {
      return nftIndex.map((ind) => {
        return [account, ind]
      })
    }
    return []
  }, [nftIndex, account])

  const tokenOfOwnerResult = useSingleContractMultipleData(collectibleContract, 'tokenOfOwnerByIndex', tokenOfOwnerInputs)

  const tokensIds = useMemo(() => {
    return tokenOfOwnerResult.map((result) => {
      return result.result?.[0]?.toString()
    }).filter((token) => token !== undefined)
  }, [tokenOfOwnerResult])

  const tokenTypeInputs = useMemo(() => {
    return tokensIds.map((tokenId: string) => {
      return [parseInt(tokenId)]
    })
  }, [tokensIds])

  const tokenTypeResults = useSingleContractMultipleData(collectibleContract, 'getTokenType', tokenTypeInputs)

  const tokensTypes = useMemo(() => {
    return tokenTypeResults.map((result) => {
      return result.result?.[0]?.toString()
    })
  }, [tokenTypeResults])

  const poolsWithCards = useMemo(() => {
    return  pools.map((pool) => {
      return {
        ...pool,
        cards: tokensTypes.map((tokenType, id) => {
          if (parseInt(tokenType) === pool.id) {
            return tokensIds[id]
          }
          return null
        }).filter((tokenId) => tokenId !== null)
      }
    })
  }, [tokensTypes, tokensIds])
  return {
    poolsWithCards
  }
}