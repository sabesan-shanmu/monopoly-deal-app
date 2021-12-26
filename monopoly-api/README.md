# Monopoly Deal API


## Dev Dependencies
* Python 3.8.2
* Flask 2.0.1
* Redis 3.5.3
* Pyrebase 3.0.27
* Psycopg2 2.8.5


## Setup

Install the dependencies 

```sh
python3 -m venv monopoly_venv
```


```sh
.\monopoly_venv\Scripts\activate
```

```sh
pip install -r requirements.txt
```

Setup the database

```sh
flask db init
flask db migrate
flask db upgrade
```

Populate cards tables
```sh
python .\init_card_creation.py
```

Upload card images to firebase storage(Note:you must use your own account)
```sh
python .\upload_images.py
```

Run local instance
```sh
flask run
```
