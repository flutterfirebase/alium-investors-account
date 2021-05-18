import nft1 from '../images/legendary-illustris.gif'
import nft2 from '../images/epic-castus.gif'
import nft3 from '../images/rare-altum.gif'
import nft4 from '../images/uncommon-regno.gif'
import nft5 from '../images/common-necesse.gif'
// import strategicalIcon from '../images/StrategicalCardIcon.svg'

const cardLink = 'https://gateway.pinata.cloud/ipfs/QmTVgjsjv4hMiaNtZzX7Fj4zs8WAjz2SktsY3C7qsSFjQW'

export type CardType = {
  id: number
  img: string
  headline: string
  cards: string
  cost: string
  tokens: string
  price: number
}

const cardList = [
  {
    img: nft1,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    img: nft2,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    img: nft3,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    img: nft4,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    img: nft5,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
].map((item, i) => ({ ...item, id: i })) as Array<CardType>

export default cardList
