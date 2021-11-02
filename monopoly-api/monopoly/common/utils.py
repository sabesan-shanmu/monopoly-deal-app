from monopoly import ma 

#TODO: this is temporary , will need to figure out why gunicron resolves https as http
def url_overwrite(endpoint,**kwargs):

    return ma.AbsoluteUrlFor(endpoint,**kwargs,_scheme="http",_external=True)