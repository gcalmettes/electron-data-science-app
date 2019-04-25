import cp from 'child_process'

// global variable the server will be store in
let pythonAPI

const startPythonAPI = ({scriptPath, port, useBuild}) => {
  stopPythonAPI()
  pythonAPI = callPythonServer({ scriptPath, port, useBuild }) 
}

const stopPythonAPI = () => {
  if (pythonAPI) pythonAPI.kill()
  pythonAPI = null
}


const callPythonServer = props => {
  const { scriptPath, port=4242, useBuild = false } = props || {}
  let pythonProcess

  if (useBuild) {
    pythonProcess = cp.execFile(scriptPath, [port],
      (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        console.log(stdout);
      })
  } else {
    pythonProcess = cp.spawn('python', [scriptPath, port], {
      "stdio": 'inherit'//['ignore', process.stdout, process.stderr]
    })
  }
  return pythonProcess
}

export { startPythonAPI }
export { stopPythonAPI }
