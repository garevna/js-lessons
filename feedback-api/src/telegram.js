/**
 * The Telegram side: posting a question into the private channel, and reading
 * what comes back.
 *
 * The bot token never appears here. It is a Worker secret (wrangler secret put
 * TELEGRAM_BOT_TOKEN), so it exists in Cloudflare and nowhere in this
 * repository - not in wrangler.toml, not in .dev.vars, which git ignores.
 */

const API = 'https://api.telegram.org/bot'

/** Telegram's HTML mode is strict about these three and forgiving about the rest. */
export const escape = (text) => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

/**
 * One question, as it appears in the channel.
 *
 * The header is what makes answering possible months later: which lesson, in
 * which language, from which thread. The thread id is printed because a reply
 * is tied to a post, and a post can be forwarded, quoted or lost - the id in
 * the text is the copy that survives.
 */
export function questionText ({ thread, name, page, lang, text, first }) {
  const who = name ? escape(name) : 'без имени'
  const head = [
    `<b>${escape(page || 'сайт')}</b> · ${escape(lang || '?')}`,
    `${who} · тред <code>${escape(thread)}</code>${first ? ' · новый' : ''}`
  ].join('\n')
  return `${head}\n\n${escape(text)}`
}

/**
 * Posts to the channel and returns the message id Telegram assigned.
 *
 * That id is the hinge of the whole thing: an answer is a reply to this
 * message, and the reply carries the id it answers.
 */
export async function post (env, text) {
  const response = await fetch(`${API}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      // A channel of questions does not need a preview of every link in them.
      link_preview_options: { is_disabled: true }
    })
  })

  const body = await response.json()
  if (!body.ok) {
    // Thrown rather than swallowed: a question that did not reach the channel
    // is a question nobody will ever answer, and the reader should be told.
    throw new Error(`telegram sendMessage: ${body.description || response.status}`)
  }
  return body.result.message_id
}

/**
 * An update as it arrives on the webhook, reduced to what matters: which post
 * is being answered, and with what.
 *
 * A channel admin writing in the channel produces channel_post; the same bot
 * in a group produces message. Both are accepted, because a private channel
 * can be turned into a group later and nothing here should care.
 */
export function readUpdate (update) {
  const post = update.channel_post || update.message || update.edited_channel_post || update.edited_message
  if (!post) return null

  const replyTo = post.reply_to_message && post.reply_to_message.message_id
  const text = post.text || post.caption
  if (!replyTo || !text) return null

  return { replyTo, text, messageId: post.message_id }
}
