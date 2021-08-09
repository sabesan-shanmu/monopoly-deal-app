from monopoly import ma

#TODO: this is temporary , will need to figure out why gunicron resolves https url as http
def url_overwrite(endpoint,**kwargs):

    return ma.AbsoluteUrlFor(endpoint,**kwargs,_scheme="https",_external=True)