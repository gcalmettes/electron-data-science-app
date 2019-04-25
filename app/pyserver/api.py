import sys
from zeroMQServer import ServerAPI

# import the "endpoints" function here
import blueprints.plotting as plottingRoutes
import blueprints.data as dataRoutes

if __name__ == '__main__':
    
    port = 4242 # if nothing is supplied
    try:
        port = int(sys.argv[1])
    except:
        pass

    server = ServerAPI(port=port)

    # register all the "endpoints"
    server.registerServicesFrom(plottingRoutes)
    server.registerServicesFrom(dataRoutes)
    
    server.run()
    