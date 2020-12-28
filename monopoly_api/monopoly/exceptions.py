from werkzeug.exceptions import BadRequest

class BadResourceException(BadRequest):
    def __init__(self,message):
        self.message = self.description = message
        super(BadResourceException, self).__init__(message) 