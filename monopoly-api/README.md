# Monopoly Deal API


## Dev Dependencies
* Python 3.9
* Flask 2.0.1
* Postgres
* Redis (server-side sessions)


## Setup

Install the dependencies

```sh
python3.9 -m venv monopoly_venv
source monopoly_venv/bin/activate
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and fill in the database/Redis URLs and secrets.

Create the schema (migrations are committed under `migrations/`)

```sh
flask db upgrade
```

Populate the cards tables. Card images are served by the UI from `monopoly-ui/public/cards`, and this script stores their paths.

```sh
python init_card_creation.py
```

Run local instance

```sh
flask run
```

After changing `monopoly/models.py`, create a new migration with `flask db migrate -m "describe change"` and commit it.

Note: `gevent==21.1.2` has no Apple Silicon wheel. On an M-series Mac, `flask run` works without it; production (Linux) installs it from a wheel.

## Tests

The API tests use SQLite and an in-memory Redis, so no services are needed:

```sh
pip install -r requirements-dev.txt
python -m pytest tests -q
```

UI tests: `cd monopoly-ui && npm test -- --watchAll=false`. GitHub Actions runs both, plus the UI build, on every push and pull request (`.github/workflows/ci.yml`).
