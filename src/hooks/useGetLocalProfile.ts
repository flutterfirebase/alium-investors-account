import { getMainDomain } from '@alium-official/uikit'
import { useActiveWeb3React } from 'hooks'
import { useEffect, useState } from 'react'

const initialState = {
  profileLink: `https://${getMainDomain()}/profile`,
  noProfileLink: `https://${getMainDomain()}/profile`,
}

/**
 * Note - this will only work if the app is on the same domain
 */
const useGetLocalProfile = () => {
  const [profile, setProfile] = useState(initialState)
  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (account) {
      try {
        const localData = localStorage.getItem(`profile_${account}`)

        if (localData) {
          const localProfile = JSON.parse(localData)

          setProfile((prevProfile) => ({
            ...prevProfile,
            username: localProfile.username,
            image: localProfile.avatar,
          }))
        }
      } catch (error) {
        setProfile(initialState)
      }
    } else {
      setProfile(initialState)
    }
  }, [account, setProfile])

  return profile
}

export default useGetLocalProfile
