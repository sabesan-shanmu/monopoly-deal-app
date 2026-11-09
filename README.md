# Monopoly Deal Game

## Deployment (Render + Neon + Upstash)

The repo deploys as a [Render Blueprint](render.yaml): the Flask API as a web service and the React UI as a static site. Card images are served by the UI from `monopoly-ui/public/cards`.

1. **Postgres:** create a free database at [neon.tech](https://neon.tech) and copy its connection string (`postgresql://...?sslmode=require`).
2. **Redis:** create a free database at [upstash.com](https://upstash.com) and copy its `rediss://` URL.
3. **Render:** go to New → Blueprint and pick this repo. When it prompts for values:
   - `DATABASE_URL`: the Neon URL
   - `REDIS_URL`: the Upstash URL
   - `MONOPOLY_UI_URL`: `https://monopoly-deal-ui.onrender.com`
   - `REACT_APP_API_BASE_URL`: `https://monopoly-deal-api.onrender.com`

   If Render gives the services different hostnames, update these two URLs, then redeploy the UI. Its env vars are baked in at build time.
4. **Seed the cards** (once, after the first API deploy). Migrations already run on every start. Run this from the API service's Shell tab:
   ```sh
   python init_card_creation.py
   ```
   On the free plan, where the Shell tab isn't available, run it from your machine with `DATABASE_URL` pointing at Neon.

Free Render web services sleep after ~15 minutes idle, so the first request can take ~50s.



## Notes
- Hotels/Houses can not be played as part of property set
- Just Say No can not be used as a counter to an existing Just Say No
- Moving cards between sets and rotating cards are not considered actions
- Full Sets must be broken when player doesn't have enough to pay.
- Property Wild Cards remain on the field even after the parent card is stolen. Player has the option to reassign it to a different set on the next turn.

## Demo
[https://www.youtube.com/watch?v=w2o8LgIvWEg](https://www.youtube.com/watch?v=j6m51ukj_Bw)

