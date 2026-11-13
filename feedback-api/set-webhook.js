/**
 * Points the bot at this Worker, once.
 *
 *   node set-webhook.js https://js-lessons-feedback.<subdomain>.workers.dev
 *   node set-webhook.js --info
 *   node set-webhook.js --delete
 *
 * Telegram will not push updates anywhere until this is run: a bot with no
 * webhook simply queues them.
 *
 * The token is read from .dev.vars - the same file `wrangler dev` reads, which
 * git ignores - so it is typed once, into one file, that never leaves the
 * machine. Nothing here prints it.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

function vars () {
  let text
  try {
    text = readFileSync(join(here, '.dev.vars'), 'utf8')
  } catch {
    console.error('Нет файла .dev.vars рядом с этим скриптом. Положи в него две строки:\n')
    console.error('  TELEGRAM_BOT_TOKEN=123456:ABC...')
    console.error('  TELEGRAM_WEBHOOK_SECRET=любая-длинная-строка\n')
    process.exit(1)
  }

  const found = {}
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/)
    if (match) found[match[1]] = match[2].replace(/^["']|["']$/g, '')
  }
  return found
}

const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_WEBHOOK_SECRET: secret } = vars()
if (!token) {
  console.error('В .dev.vars нет TELEGRAM_BOT_TOKEN')
  process.exit(1)
}

const api = (method, body) => fetch(`https://api.telegram.org/bot${token}/${method}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body || {})
}).then((response) => response.json())

const argument = process.argv[2]

if (argument === '--info') {
  const info = await api('getWebhookInfo')
  console.log(JSON.stringify(info.result, null, 2))
  process.exit(info.ok ? 0 : 1)
}

if (argument === '--delete') {
  const gone = await api('deleteWebhook')
  console.log(gone.ok ? 'вебхук снят' : gone.description)
  process.exit(gone.ok ? 0 : 1)
}

if (!argument || !argument.startsWith('https://')) {
  console.error('Укажи адрес воркера: node set-webhook.js https://js-lessons-feedback.<subdomain>.workers.dev')
  process.exit(1)
}

if (!secret) {
  console.error('В .dev.vars нет TELEGRAM_WEBHOOK_SECRET — без него вебхук приняло бы что угодно')
  process.exit(1)
}

const result = await api('setWebhook', {
  url: `${argument.replace(/\/+$/, '')}/telegram`,
  secret_token: secret,
  // callback_query is in the list because the "✍️ Ответить" button under
  // every question is one, and a type left out of this list is not delayed
  // or logged - Telegram drops it and says nothing. The button did nothing
  // at all for exactly that reason.
  allowed_updates: ['message', 'edited_message', 'channel_post', 'edited_channel_post', 'callback_query'],
  drop_pending_updates: true
})

if (!result.ok) {
  console.error('не вышло:', result.description)
  process.exit(1)
}

const info = await api('getWebhookInfo')
console.log('вебхук установлен:', info.result.url)
console.log('ожидает обновлений:', info.result.pending_update_count)
if (info.result.last_error_message) console.log('последняя ошибка:', info.result.last_error_message)
