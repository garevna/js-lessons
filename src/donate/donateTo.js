const host = location.href.split('?')[0]

export const donateTo = {
  metamask: {
    icon: `${host}/images/ERC-20.png`,
    width: 120,
    height: 57,
    wallets: [
      {
        name: 'ETH',
        icon: `${host}/images/ethereum.svg`,
        width: 42,
        height: 42,
        number: '0xd8c6ae8ce97f8cbfc4f92c82a6c9fd9ee3ddf7cb'
      },
      {
        name: 'USDT',
        icon: `${host}/images/tether-usdt.svg`,
        width: 32,
        height: 28,
        number: '0xd8c6ae8ce97f8cbfc4f92c82a6c9fd9ee3ddf7cb'
      }
    ]
  },
  privat: {
    icon: `${host}/images/privat-bank.svg`,
    width: 80,
    height: 80,
    coins: ['UAH'],
    wallets: [
      {
        name: 'UAH',
        icon: `${host}/images/privat-bank-card.png`,
        width: 48,
        height: 34,
        number: '5168742726423910'
      },
      {
        name: 'UAH',
        icon: `${host}/images/privat-bank-card.png`,
        width: 48,
        height: 34,
        number: '4731219644372116'
      },
      {
        name: 'UAH',
        icon: `${host}/images/privat-bank-card.png`,
        width: 48,
        height: 34,
        number: '4627055110164455'
      }
    ]
  }
}
