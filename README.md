# Monopoly Deal Game

## Sites

- Application: https://monopoly-deal-ui.onrender.com/
- API: https://monopoly-deal-api-9dfl.onrender.com/documentation/

Hosted on Render's free tier, so the first request after the services have been idle can take ~50s.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the app, API, database and realtime updates fit together.

## Deployment (Render + Neon + Upstash)

The repo deploys as a [Render Blueprint](render.yaml): the Flask API as a web service and the React UI as a static site. Card images are served by the UI from `monopoly-ui/public/cards`.

1. **Postgres:** create a free database at [neon.tech](https://neon.tech) and copy its connection string (`postgresql://...?sslmode=require`).
2. **Redis:** create a free database at [upstash.com](https://upstash.com) and copy its `rediss://` URL.
3. **Render:** go to New → Blueprint and pick this repo. When it prompts for values:
   - `DATABASE_URL`: the Neon URL
   - `REDIS_URL`: the Upstash URL
   - `MONOPOLY_UI_URL`: `https://monopoly-deal-ui.onrender.com`
   - `REACT_APP_API_BASE_URL`: `https://monopoly-deal-api-9dfl.onrender.com`

   Render may add a suffix to a hostname when the name is taken (the API got `-9dfl`). Check each service's real URL, set these two values to match (no trailing slash), then redeploy the UI with **Clear build cache & deploy**. Its env vars are baked in at build time.
4. **Seed the cards** (once, after the first API deploy). Migrations already run on every start. Run this from the API service's Shell tab:
   ```sh
   python init_card_creation.py
   ```
   On the free plan, where the Shell tab isn't available, run it from your machine against Neon instead. Use Python 3.9 and skip gevent, which doesn't install on Apple Silicon. Set `FLASK_ENV=development`: Flask 2.0 defaults to production mode, which requires `REDIS_URL`.
   ```sh
   cd monopoly-api
   /usr/bin/python3 -m venv .venv
   grep -vE '^(gevent|gevent-websocket|greenlet|zope)' requirements.txt > .venv/req-seed.txt && .venv/bin/pip install -r .venv/req-seed.txt
   read -s "DATABASE_URL?Paste Neon URL: " && export DATABASE_URL
   FLASK_ENV=development .venv/bin/python init_card_creation.py
   ```

Free Render web services sleep after ~15 minutes idle, so the first request can take ~50s.



## Notes
- Hotels/Houses can not be played as part of property set
- Just Say No can not be used as a counter to an existing Just Say No
- Moving cards between sets and rotating cards are not considered actions
- Full Sets must be broken when player doesn't have enough to pay.
- Property Wild Cards remain on the field even after the parent card is stolen. Player has the option to reassign it to a different set on the next turn.

## Demo
[https://www.youtube.com/watch?v=w2o8LgIvWEg](https://www.youtube.com/watch?v=j6m51ukj_Bw)

