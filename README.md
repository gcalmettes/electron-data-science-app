# ScienTiFiciK app

## A boilerplate app integrating the Python data science ecosystem into the electron framework.

### Stack:

- [Electron](https://electronjs.org)
- [React](https://reactjs.org) for interactive UI
- [Babel](https://babeljs.io) to enjoy modern javascript
- [Webpack](https://webpack.js.org) to manage/bundle assets and build
- Python 3.7 as API (can include any library that you want, Numpy, Scipy, Matplotlib, Scikit-Learn, etc ...)
- [ZeroRPC](https://www.zerorpc.io) to communicate between the electron renderer and Python API


### Install

Note: this first step requires Python 2 to compile zmq. The easiest is to have a virtual environment (e.g.: conda activate py2) and run the command under this environment.

```
// install the dependencies and rebuilt electron against node
npm run cinstall
```

Switch to a Python 3 environment:

```
pip install -r requirements.txt
```

### Develop:

```
npm run start
```

### Build the app:

 ```
 sh build-app.sh
 ```
 