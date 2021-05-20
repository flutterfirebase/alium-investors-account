import { useCallback, useEffect, useMemo, useState } from 'react'
import { Contract } from '@ethersproject/contracts'
import pools from '../pages/InvestorsAccount/constants/pools'
import { useSingleContractMultipleData } from '../state/multicall/hooks'
import { useActiveWeb3React } from './index'
import { getContract } from '../utils'
import { AliumVestingAbi, NFT_VESTING_PRIVATE } from '../pages/InvestorsAccount/constants'
import { useTransactionAdder } from '../state/transactions/hooks'

export default function useNftPool() {
  const [vestingContract, setVestingContract] = useState<Contract | null>(null)
  const [pendingClaimResult, setPendingClaimResult] = useState<any>(null)
  const { account, library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  useEffect(() => {
    if (library) {
      const instance = getContract(NFT_VESTING_PRIVATE, AliumVestingAbi, library)
      setVestingContract(instance)
    }
  }, [library])

  const getProfPoolId = (pid) => {
    return pid <= 4 ? pid - 1 : pid - 2
  }

  const balanceInputs = useMemo(() => {
    return pools.map((pool) => ([account || '', getProfPoolId(pool.id)])).filter((input) => input[0] !== '')
  }, [account])
  const balancesResult = useSingleContractMultipleData(vestingContract, 'getBalanceOf', balanceInputs)

  const pendingRewardInputs = useMemo(() => {
    return pools.map((pool) => ([account || '', getProfPoolId(pool.id)])).filter((input) => input[0] !== '')
  }, [account])
  const pendingRewardResult = useSingleContractMultipleData(vestingContract, 'pendingReward', pendingRewardInputs)

  // const nextDateInputs = useMemo(() => {
  //   return pools.map((pool) => ([pool.id]))
  // }, [])
  // const nextDateResult = useSingleContractMultipleData(vestingContract, 'getNextUnlockAt', nextDateInputs)

  // console.log(balancesResult, pendingRewardResult, nextDateResult)

  const poolsWithData = useMemo(() => {
    return pools.map((pool, id) => {
      return {
        ...pool,
        total: balancesResult[id]?.result?.[0] || 2,
        locked: balancesResult[id]?.result?.[1] || 2,
        claimed: balancesResult[id]?.result?.[2] || 2,
        unlocked: pendingRewardResult[id]?.result?.[0] || 2
      }
    })
  } , [balancesResult, pendingRewardResult])

  async function onClaim(pid): Promise<string | null> {
    if (vestingContract) {
      setPendingClaimResult([pid, true])
      // await vestingContract.claim(getProfPoolId(pid))
      //   .then((response: any) => {
      //     addTransaction(response, {
      //       summary: `Claim pool with ID - ${pid}`,
      //     })
      //    return response.hash
      //   })
      //   .catch(e => {
      //     console.log(e.message)
      //   })
      //   .finally(
      //     setPendingClaimResult(null)
      //   )
      const res = await new Promise<string>((resolve => {
        setTimeout(() => {
          setPendingClaimResult(null)
          resolve('0x123123123')
        }, 1000)
      }))
      return res
    }
    return null
  }

  return {
    poolsWithData,
    onClaim,
    pendingClaimResult
  }

}
