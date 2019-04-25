import zerorpc from "zerorpc"

const createClient = props => {
  const { address="127.0.0.1", port=4242 } = props || {}

  let client = new zerorpc.Client()

  client.connect(`tcp://${address}:${port}`)

  console.log(`A new client has been connected to tcp://${address}:${port}`)

  return client
}

export {createClient}


