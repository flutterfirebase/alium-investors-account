import { useEffect, useMemo, useState } from 'react'
import { Contract } from '@ethersproject/contracts'
import pools from '../pages/InvestorsAccount/constants/pools'
import { useSingleContractMultipleData } from '../state/multicall/hooks'
import { useActiveWeb3React } from './index'
import { getContract } from '../utils'
import { AliumVestingAbi, NFT_VESTING } from '../pages/InvestorsAccount/constants'
import { useTransactionAdder } from '../state/transactions/hooks'

export default function useNftPool() {
  const [vestingContract, setVestingContract] = useState<Contract | null>(null)
  const [pendingClaimResult, setPendingClaimResult] = useState<any>(null)
  const { account, library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  useEffect(() => {
    if (library && account) {
      const instance = getContract(NFT_VESTING, AliumVestingAbi, library, account)
      setVestingContract(instance)
    }
  }, [library, account])

  const balanceInputs = useMemo(() => {
    return pools.map((pool) => ([account || '', pool.id])).filter((input) => input[0] !== '')
  }, [account])
  const balancesResult = useSingleContractMultipleData(vestingContract, 'getBalanceOf', balanceInputs)

  const pendingRewardInputs = useMemo(() => {
    return pools.map((pool) => ([account || '', pool.id])).filter((input) => input[0] !== '')
  }, [account])
  const pendingRewardResult = useSingleContractMultipleData(vestingContract, 'pendingReward', pendingRewardInputs)

  const nextDateInputs = useMemo(() => {
    return pools.map((pool) => ([pool.id]))
  }, [])
  const nextDateResult = useSingleContractMultipleData(vestingContract, 'getNextUnlockAt', nextDateInputs)

  const poolsWithData = useMemo(() => {
    return pools.map((pool, id) => {
      return {
        ...pool,
        total: balancesResult[id]?.result?.[0] || 0,
        locked: balancesResult[id]?.result?.[1] || 0,
        claimed: balancesResult[id]?.result?.[2] || 0,
        unlocked: pendingRewardResult[id]?.result?.[0] || 0,
        timestamp: nextDateResult[id]?.result?.[0].toString() || undefined,
      }
    })
  } , [balancesResult, pendingRewardResult, nextDateResult])

  async function onClaim(pid): Promise<string | null> {
    if (vestingContract) {
      if (!account) {
        console.warn('No account')
        return null
      }
      setPendingClaimResult([pid, true])
      return vestingContract.claim(pid, { from: account })
        .then((response: any) => {

          addTransaction(response, {
            summary: 'boughtCards',
            additionalData: {
              count: '1',
              card: pid,
            },
          })
         return response.hash
        })
        .catch(e => {
          console.error(e.message || e)
        })
        .finally(
          setPendingClaimResult(null)
        )
    }
    return null
  }

  return {
    poolsWithData,
    onClaim,
    pendingClaimResult
  }

}
