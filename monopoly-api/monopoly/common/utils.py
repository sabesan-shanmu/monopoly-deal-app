from monopoly import ma 

def url_overwrite(endpoint,**kwargs):
    # Absolute link using the request's own scheme and host. Behind Render's TLS proxy that is https,
    # because create_app wraps the app in ProxyFix (trusts X-Forwarded-Proto/Host); locally it stays http.
    return ma.AbsoluteUrlFor(endpoint,**kwargs,_external=True)

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