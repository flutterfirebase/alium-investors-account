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
  cards?: number[]
}

const pools: PoolsTypes[] = [
  {
    id: 1,
    name: 'Private Pool One',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
  {
    id: 2,
    name: 'Private Pool Two',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
  {
    id: 3,
    name: 'Private Pool Three',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
  {
    id: 5,
    name: 'Strategical Pool One',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
  {
    id: 6,
    name: 'Public Pool Necesse',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
  {
    id: 7,
    name: 'Public Pool Regno',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
  {
    id: 8,
    name: 'Public Pool Altum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
  {
    id: 9,
    name: 'Public Pool Castus',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
  {
    id: 10,
    name: 'Public Pool Illustris',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores earum',
  },
]

export default pools