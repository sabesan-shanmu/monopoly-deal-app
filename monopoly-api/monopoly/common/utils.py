from monopoly import ma 

#TODO: this is temporary , will need to figure out why gunicron resolves https url as http
def url_overwrite(endpoint,**kwargs):

    return ma.AbsoluteUrlFor(endpoint,**kwargs,_scheme="https",_external=True)

def get_colour_name(colourId):
    colours = {
        0:"Any",
        1:"Green",
        2:"Brown",
        3:"DarkBlue",
        4:"LightBlue",
        5:"Orange",
        6:"Pink",
        7:"Black",
        8:"Red",
        9:"Yellow",
        10:"Neutral"
    };
    return colours[colourId];