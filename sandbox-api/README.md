# The practice backend

Twelve lessons send students to a small server to practise fetch: read a list
of users, POST one, upload a form with a photo. Those servers lived on Glitch,
which ended project hosting on **8 July 2025** and kept dashboards open only
until the end of that year. The code went with them.

This is a rebuild. Nothing was recovered — every route and every response here
is taken from the requests and the console output printed in the lessons, so a
student following the text sees what the text says they will see.

Five servers became one Worker, split by prefix:

| was | is |
|---|---|
| `garevna-rest-api.glitch.me` | `/rest-api` |
| `json-server-with-router.glitch.me` | `/rest-api` |
| `garevna-json-server.glitch.me` | `/json-server` |
| `garevna-form-data.glitch.me` | `/form-data` |

## Deploying it

```
cd sandbox-api
npm install
npx wrangler login
npm run deploy
```

Wrangler prints the address — `https://js-lessons-sandbox.<your-subdomain>.workers.dev`.
Then point the lessons at it:

```
cd ..
node tools/swap-api-host.js https://js-lessons-sandbox.<your-subdomain>.workers.dev
node tools/swap-api-host.js https://…  --write
npm run lessons
```

The free plan covers 100 000 requests a day, which a class will not come close
to, and a Worker does not sleep — the old backends did, and the first request
of a lesson used to hang.

## Storage

It works the moment it is deployed, with writes kept in memory. That is
per-isolate and short-lived: a student can POST a user and, occasionally, not
find it a minute later. For a class, add a namespace:

```
npx wrangler kv namespace create SANDBOX
```

and uncomment the `kv_namespaces` block in `wrangler.toml` with the id it
prints. Writes then become shared and durable.

Anything a student writes expires after a day, deliberately. This is a sandbox
a whole class writes into, and the one on Glitch slowly filled with test
records until the lesson's own data was hard to find. The records the lessons
print never expire.

## Checking it

```
npm test
```

25 checks, each one copied from a console output in a lesson. A failure means a
student would see something the lesson does not promise.

## What is not here

`garevna-chat.glitch.me` — hw-16 has it commented out, so there was nothing to
rebuild from.

`cdn.glitch.com` — five lessons load screenshots and animations from it. The
host no longer resolves at all, so those images are gone and need replacing
with files in `public/images/`.
