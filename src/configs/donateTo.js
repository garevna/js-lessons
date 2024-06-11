const host = location.href.split('?')[0]

export const donateTo = {
  metamask: {
    icon: `${host}/images/ERC-20.png`,
    iconSize: 120,
    wallets: [
      {
        name: 'ETH',
        icon: `${host}/images/ethereum.svg`,
        iconSize: 42,
        number: '0xd8c6ae8ce97f8cbfc4f92c82a6c9fd9ee3ddf7cb'
      },
      {
        name: 'USDT',
        icon: `${host}/images/tether-usdt.svg`,
        iconSize: 32,
        number: '0xd8c6ae8ce97f8cbfc4f92c82a6c9fd9ee3ddf7cb'
      }
    ]
  },
  privat: {
    icon: `${host}/images/privat-bank.svg`,
    iconSize: 80,
    coins: ['UAH'],
    wallets: [
      {
        name: 'UAH',
        icon: `${host}/images/privat-bank-card.png`,
        iconSize: 48,
        number: '5168742726423910'
      },
      {
        name: 'UAH',
        icon: `${host}/images/privat-bank-card.png`,
        iconSize: 48,
        number: '4731219644372116'
      },
      {
        name: 'UAH',
        icon: `${host}/images/privat-bank-card.png`,
        iconSize: 48,
        number: '4627055110164455'
      }
    ]
  }
}
