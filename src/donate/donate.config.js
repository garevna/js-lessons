/**
 * The Donate section, in one file.
 *
 * Nothing else under src/donate/ holds a card number or an address — this is
 * the only file to edit when something changes. A push to master rebuilds and
 * publishes the site, so editing it through GitHub's web interface is enough;
 * no local build needed.
 */

export const donateConfig = {
  /**
   * Bank cards, in the order they should appear.
   *
   * Write the number the way it is printed on the card. The spaces are for
   * reading — they are stripped before the number reaches the clipboard,
   * because a banking app will not accept them.
   *
   * A card expires every few years, and an expired one fails quietly: the
   * transfer is simply declined and nobody tells the site's owner. Replacing
   * the number here is the whole of the fix.
   */
  cards: [
    { bank: 'privat', currency: 'UAH', number: '4627 0551 1050 8529' }
  ],

  /**
   * A hosted payment page — the donor clicks and lands on a form that already
   * knows who is being paid and only asks for an amount. Any service that
   * gives out a plain link works here: a monobank jar, a Ko-fi page, a LiqPay
   * button. The site is static, so a link is all it can use: there is no
   * server to sign a request or receive a callback, and a secret key put in
   * the bundle would be readable by everyone.
   *
   * While url is empty the popup shows only the cards, so this can stay as it
   * is until there is a real link to put in it.
   */
  payment: {
    url: '',
    label: 'Support the course'
  },

  /** Crypto, for anyone who would rather not use a card. */
  crypto: [
    { name: 'ETH', network: 'ERC-20', address: '0xd8c6ae8ce97f8cbfc4f92c82a6c9fd9ee3ddf7cb' },
    { name: 'USDT', network: 'ERC-20', address: '0xd8c6ae8ce97f8cbfc4f92c82a6c9fd9ee3ddf7cb' }
  ],

  /**
   * What the popup says above the numbers. Two versions, because the honest
   * text differs: with a payment link there is a button to press, without one
   * the donor has to copy a number into their own banking app.
   */
  intro: {
    withPayment: 'Thank you for supporting the course — any amount helps.',
    cardsOnly: 'Thank you for supporting the course. Tap a number to copy it, then paste it into your banking app.'
  }
}
