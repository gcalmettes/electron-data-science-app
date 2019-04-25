from inspect import getmembers, isfunction
import zerorpc

class ServerAPI(object):
    def __init__(self, port=4242, address="127.0.0.1"):
        self.server = None
        self.port = port
        self.address = address

    def registerServicesFrom(self, module):
        """Register all the functions listed in a modules as self attribute"""
        functions = [m for m in getmembers(module) if isfunction(m[1])]
        for (fname, fn) in functions:
            setattr(self, fname, fn)

    def run(self, port=None):
        if not self.server:
            url = f"tcp://{self.address}:{port if port else self.port}"
            self.server = zerorpc.Server(self)
            self.server.bind(url)
            print(f'-- Server running on {url}')
            self.server.run()
        else:
            print(f"-- A server is already running.")
    