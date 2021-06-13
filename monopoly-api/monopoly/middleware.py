

from uuid import uuid4

class Middleware():

    def __init__(self,app):
        self.app = app
        self.flask_header_name = "MD-REQ-ID"


    def __call__(self,environ,start_response):
        request_id_header = str(uuid4())
        environ[self.flask_header_name] = request_id_header

        def overwrite_start_response(status, response_headers):
            response_headers.append((self.flask_header_name, request_id_header))
            response_headers.append(('Access-Control-Allow-Credentials', 'true'))
            response_cookie_header =  [ i for i,item in enumerate(response_headers) if item[0] == "Set-Cookie"]
            
            #remove the existing cookie header and add the cookiebackwith SameSite=None
            if len(response_cookie_header) > 0:
                cookie_index = response_cookie_header[0]
                cookie_value = response_headers[cookie_index][1] 
                new_cookie = "{}; {}".format(cookie_value, b'SameSite=None'.decode('latin1'))
                response_headers.pop(cookie_index)
                response_headers.append(("Set-Cookie",new_cookie))
            
            return start_response(status, response_headers)

        return self.app(environ, overwrite_start_response)


