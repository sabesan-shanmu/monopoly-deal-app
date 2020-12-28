from werkzeug.exceptions import BadRequest
from marshmallow.exceptions import ValidationError

class ResourceNotFoundException(BadRequest):
    def __init__(self,message):
        self.message = self.description = message
        super(ResourceNotFoundException, self).__init__(message) 


class ResourceValidationException(ValidationError):
    def __init__(self,error):
        self.message = self.description = error.messages
        super(ValidationError, self).__init__() 

class FieldValidationException(BadRequest):
    def __init__(self,message):
        self.message = self.description = message
        super(FieldValidationException, self).__init__(message) 