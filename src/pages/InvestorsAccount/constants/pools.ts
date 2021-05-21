import { BigNumber } from "ethers"

export interface PoolsTypes {
  name: string;
  id: number;
  description: string;
  total?: number | BigNumber;
  locked?: number | BigNumber;
  unlocked?: number | BigNumber;
  claimed?: number | BigNumber;
  nextDate?: number;
  timestamp?: undefined | string;
  cards?: number[];
  reward?: number | string;
  privateCall: boolean
}

const pools: PoolsTypes[] = [
  {
    id: 1,
    name: 'Private Pool One',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: true
  },
  {
    id: 2,
    name: 'Private Pool Two',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: true
  },
  {
    id: 3,
    name: 'Private Pool Three',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: true
  },
  {
    id: 5,
    name: 'Strategical Pool One',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: true
  },
  {
    id: 6,
    name: 'Public Pool Necesse',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: false
  },
  {
    id: 7,
    name: 'Public Pool Regno',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: false
  },
  {
    id: 8,
    name: 'Public Pool Altum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: false
  },
  {
    id: 9,
    name: 'Public Pool Castus',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: false
  },
  {
    id: 10,
    name: 'Public Pool Illustris',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
    privateCall: false
  },
]

export default pools