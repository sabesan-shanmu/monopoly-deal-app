from werkzeug.exceptions import BadRequest
from marshmallow import ValidationError

class ResourceNotFoundException(BadRequest):
    def __init__(self,message):
        self.message = self.description = message
        super(ResourceNotFoundException, self).__init__(message) 


class ResourceValidationException(ValidationError):
    def __init__(self,message):
        self.message = self.description = message
        super(ValidationError, self).__init__(message) 