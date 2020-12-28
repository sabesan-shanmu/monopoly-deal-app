from werkzeug.exceptions import BadRequest

class ResourceNotFoundException(BadRequest):
    def __init__(self,message):
        self.message = self.description = message
        super(ResourceNotFoundException, self).__init__(message) 