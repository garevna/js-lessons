import { donateConfig } from './donate.config'

/**
 * Turns the settings in donate.config.js into what the popup draws: an icon
 * for the provider, an icon and a caption for each way of paying it.
 *
 * The numbers themselves are not here. Change a card in donate.config.js.
 */

const host = location.href.split('?')[0]

// A banking app rejects "4627 0551 1050 8529" — the spaces are for the eye.
const digits = (number) => number.replace(/\s+/g, '')

const cards = {
  icon: `${host}/images/privat-bank.svg`,
  width: 80,
  height: 80,
  wallets: donateConfig.cards.map((card) => ({
    name: card.number,
    icon: `${host}/images/privat-bank-card.png`,
    width: 48,
    height: 34,
    number: digits(card.number)
  }))
}

const crypto = {
  icon: `${host}/images/ERC-20.png`,
  width: 120,
  height: 57,
  wallets: donateConfig.crypto.map(({ name, address }) => ({
    name,
    icon: `${host}/images/${name === 'ETH' ? 'ethereum.svg' : 'tether-usdt.svg'}`,
    width: name === 'ETH' ? 42 : 32,
    height: name === 'ETH' ? 42 : 28,
    number: address
  }))
}

export const donateTo = {
  // Cards first: the course is Ukrainian and so is most of its audience.
  ...(cards.wallets.length ? { privat: cards } : {}),
  ...(crypto.wallets.length ? { metamask: crypto } : {})
}
