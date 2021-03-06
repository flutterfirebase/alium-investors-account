import { ETHER } from '@alium-official/sdk'
import { externalLinks, getMainDomain, Menu as UikitMenu, MenuEntry } from '@alium-official/uikit'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCurrencyBalance } from 'state/wallet/hooks'

const Menu: React.FC<{ loginBlockVisible?: boolean }> = ({ loginBlockVisible, ...props }) => {
  const { t } = useTranslation()

  const links: MenuEntry[] = [
    { label: t('Home'), icon: 'HomeIcon', href: `https://${getMainDomain()}` },
    {
      label: 'Trade',
      icon: 'TradeIcon',
      items: [
        { label: 'Exchange', href: `https://exchange.${getMainDomain()}` },
        { label: 'Liquidity', href: `https://exchange.${getMainDomain()}/pool` },
      ],
    },
    { label: 'Token holder area', icon: 'PrivateRoundIcon', href: `https://account.${getMainDomain()}` },
    // {
    //   label: 'Analytics',
    //   icon: 'InfoIcon',
    //   items: [
    //     { label: 'Overview', href: `https://info.${getMainDomain()}` },
    //     { label: 'Tokens', href: `https://info.${getMainDomain()}/tokens` },
    //     { label: 'Pairs', href: `https://info.${getMainDomain()}/pairs` },
    //   ],
    // },
    {
      label: 'More',
      icon: 'MoreIcon',
      items: [
        { label: 'Audits', href: `https://${getMainDomain()}/audits` },
        // { label: 'Voting', href: 'https://voting.dev.alium.finance' },
        { label: 'GitHub', href: externalLinks.github },
        { label: 'Docs', href: 'https://aliumswap.gitbook.io/alium-finance/' },
        { label: 'Blog', href: externalLinks.medium },
      ],
    },
  ]

  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const balance = useCurrencyBalance(account as string, ETHER)
  const useBalance = async () => {
    // const bal = useCurrencyBalance(account as string, ETHER)
    // return bal?.toSignificant(6);
    // const result = await useCurrencyBalance(account as string, ETHER)
    return balance
  }

  // useBalance().then((result)=>console.log(result))

  return (
    <UikitMenu
      // isProduction={process.env.NODE_ENV === "production"}
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      loginBlockVisible={loginBlockVisible}
      buttonTitle={t('connect')}
      balance={balance?.toSignificant(6)}
      options={{
        modalTitle: 'Account',
        modalFooter: t('learnHowConnect'),
        modelLogout: t('logout'),
        modalBscScan: t('viewOnBscscan'),
        modelCopyAddress: t('copyAddress'),
      }}
      betaText=""
      balanceHook={useBalance}
      {...props}
    />
  )
}

export default Menu
