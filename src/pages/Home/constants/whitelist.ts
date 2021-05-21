const ChainId: any = process.env.REACT_APP_CHAIN_ID

const whitelist = {
  '97': [
    '0xAa50dA3BD10D140536Dd96136a4781274c09561b',
    '0x5C9C39Dfe868bE7Ee04EdB425957Be479c3dC356',
    '0x51ddE69E667080D38D290E0F13c77877EA4DB302',
    '0x1743b2Cec838BD143d58CE910c6Bd22E45869F47',
    '0xCA6a2D72869F69B0086105b2e8242463D4fe70Af',
    '0x729af23D728ebD9c789Bd405a3D2CCd2d7315CB4',
    '0x51ddE69E667080D38D290E0F13c77877EA4DB302',
    '0x89FCA750687B2461d810d5EfC35c43A1cD4b4AF6',
    '0xe9df78Cda7156B8Ba102C8D11E07Cf733e2Ab4A1',
  ],
  '56': [
    '0xAa50dA3BD10D140536Dd96136a4781274c09561b',
    '0x5C9C39Dfe868bE7Ee04EdB425957Be479c3dC356',
    '0x51ddE69E667080D38D290E0F13c77877EA4DB302',
    '0x1743b2Cec838BD143d58CE910c6Bd22E45869F47',
    '0xCA6a2D72869F69B0086105b2e8242463D4fe70Af',
    '0x313F95cD0221A09A20590B7Fc135fD35b515483E',
    '0xd281cf7A8194c59790a17FA5247B7B46b95CE1B0',
    '0x014E777b1ca75D2Db682B7B46bEaf67cB26C2687',
    '0x28aa016FdF29A4d7022C28995EA33B0427f5C137',
    '0x749A11F59bB5821e9Bd9386a2d28a1E9d4AeD185',

    '0xeD2C2CdEc695be3A4Dc421c1A8a6756dc5A927b6',
    '0x5D502D8928Ac13b7700Ab602db35fBb6a95eDaf6',
    '0x27F32032a898D069C517fb639EBDfBf20BeA9998',
    '0x01bd05cC8aaC783A7232d3f526C0B19b9402e159',
    '0x6040cB1FcD7102a9f08280cA61677A9fA8122aA5',
    '0x20D265ea7f638e76632857EbC7e0d5bfDd0FA4E5',
    '0x1B08e7e68985788dccBF133d8BCDf0389f6C3E88',
    '0x29Bf6652e795C360f7605be0FcD8b8e4F29a52d4',
    '0x402961810cF383732C986dBE378B8c4def2B8166',
    '0x6ca875797178082180abA3DDeC7b61a38210E868',
    '0x76b680F89cE4350ba68eBfBb67aE7cf2028991Fd',
    '0xb45F01747133969aA64B74D141ac9Efc9Ce678Fc',
    '0xbfDd960844765b1BAC0BF1F01A84Fb1F5aAFe9bC',
    '0xf9Dd7539d86D885CDebe58FCc0cD10feb776bcCC',
    '0x442E73cdCF761D536a66Ec40D59313F1B8c52937',
    '0x51ddE69E667080D38D290E0F13c77877EA4DB302',
    '0xdb8D20b82A01dF33A1fb9A357F323b915b43Ab7c',
    '0xe6A86f1b3B4085177e8FA5B34e99eAE63f853F77',
    '0x194a39f48f1d5e310d0e0cc25E727c7d2Bff0b14',
    '0xDA6c8B3120a7a130eA58F52889A1180dAF3250Ae',
    '0x838dcd7AC9cDA8Bd38F4Ea8E44F38b7D94cd55bB',
    '0x5f1b1922A4C322144644a9732e89cd32CdCe9073',
    '0xD71C552a4954673a30893BF1Db0A77f1aFA1accD',
    '0x5941167394398F8e4274d0dd24CeaC57Fd663e95',
    '0x8b90b067d02132fC7c5cDf64b8cac04D55aBC2B2',
    '0xA5576138F067EB83C6Ad4080F3164b757DEB2737',
    '0x4B43C05d53e77aB6E279F7a7daAe42fB8c8a8D4E',
    '0x61A6007A980C8a8655071AE83930e8B2883e8407',
    '0x61Bf3334fB3a64D1da537eDa1aA535fa50503F0A',
    '0x8888888888E9997E64793849389a8Faf5E8e547C',
    '0xb5A526080130837dcf59AbA4476BF12EA796B680',
    '0x9822C731b38009A05384fFd757c854f71CE751F9',
    '0x0aD7A09575e3eC4C109c4FaA3BE7cdafc5a4aDBa',
    '0xa03D1648Be58e6957C81C1C201236E189b6eE6AF',
    '0xe38FD1c83BB7883Adc4B5B910C6F6e8311da3B6F',
    '0x983b60fcC37B7fD0076b9Ae08667c10Ab2fBBD59',
    '0xc7bb7Ba3440E3684484CC3ADA0a229f8ba0Cc071',
    '0xe9df78Cda7156B8Ba102C8D11E07Cf733e2Ab4A1',
  ],
}

export default whitelist[ChainId]
