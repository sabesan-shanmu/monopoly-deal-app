import threading
from functools import wraps

"""
Serialize state-changing requests per game, so two requests for the same game (a double-click, or two
players answering an action at once) can't both read the same state and apply it twice.

This is an in-process lock, which is correct because the API runs a single gunicorn worker
(render.yaml: -w 1). Under the gevent worker, threading is monkey-patched, so a waiting request yields
to others instead of blocking the process. A database row lock is deliberately not used: psycopg2 is not
gevent-aware, so a request blocked on a row lock would freeze the only worker, including the request
holding the lock. If the API ever runs more than one worker, replace this with a shared lock
(e.g. a Redis lock or Postgres advisory lock taken through a gevent-aware driver).
"""

_game_locks = {}
_registry_lock = threading.Lock()


def _lock_for(gamePassCode):
    with _registry_lock:
        lock = _game_locks.get(gamePassCode)
        if lock is None:
            lock = threading.RLock()
            _game_locks[gamePassCode] = lock
        return lock


def serialize_game_writes(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        gamePassCode = kwargs.get("gamePassCode", None)
        if gamePassCode is None:
            return func(*args,**kwargs)
        with _lock_for(gamePassCode):
            return func(*args,**kwargs)
    return wrapper
