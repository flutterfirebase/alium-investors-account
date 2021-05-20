// const nft1 = '/images/nft/legendary-illustris.gif'
// const nft2 = '/images/nft/epic-castus.gif'
// const nft3 = '/images/nft/rare-altum.gif'
// const nft4 = '/images/nft/uncommon-regno.gif'
// const nft5 = '/images/nft/common-necesse.gif'

const nft1 = '/video/nft/legendary-illustris.mp4'
const nft2 = '/video/nft/epic-castus.mp4'
const nft3 = '/video/nft/rare-altum.mp4'
const nft4 = '/video/nft/uncommon-regno.mp4'
const nft5 = '/video/nft/common-necesse.mp4'
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

export const cardListPublic: CardType[] = [
  {
    id: 6,
    img: nft1,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    id: 7,
    img: nft2,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    id: 8,
    img: nft3,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    id: 9,
    img: nft4,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    id: 10,
    img: nft5,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
]
export const cardListStrategical: CardType[] = [
  {
    id: 5,
    img: nft1,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  }
]
export const cardListPrivate: CardType[] = [
  {
    id: 1,
    img: nft1,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    id: 2,
    img: nft2,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  },
  {
    id: 3,
    img: nft3,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 ALM',
    price: 100000,
  }
]