from rest_framework.views import exception_handler


def drf_exception_handler(exc, context):
    """Wrap DRF exceptions in a predictable error envelope."""

    response = exception_handler(exc, context)
    if response is None:
        return None

    response.data = {
        "error": {
            "code": "request_failed",
            "details": response.data,
        }
    }
    return response
