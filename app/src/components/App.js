import React from 'react';
import ReactDOM from "react-dom";
import { Grommet, Box, Button, ResponsiveContext, TextInput, Heading } from 'grommet';
import { Test, LineChart, BarChart } from 'grommet-icons';

import { theme } from './theme'
import { AppBarTitle } from './AppBar'
import { DashboardLayout } from './ResponsiveGrid'

import { createClient } from './../../modules/web-client.js'


const client = createClient()


const scaleXML = (buffer, newWidth=500) => {
  const XML = buffer.toString()
  const [, x, y, width, height] = XML.match(/viewBox="([\d|\.]+) ([\d|\.]+) ([\d|\.]+) ([\d|\.]+)"/)
  const ratio = width/height
  const newHeight = newWidth/ratio
  // const newXML = XML.replace(/viewBox="[\d|\.]+ [\d|\.]+ [\d|\.]+ [\d|\.]+"/, `viewbox="${x} ${y} ${newWidth} ${newHeight}"`)
  let newXML = XML.replace(/width="[\d|\.]+pt"/, `width="${newWidth}"`)
  newXML = newXML.replace(/height="[\d|\.]+pt"/, `height="${newHeight}"`)
  return newXML
}

const App = () => {

  const [element, setElement] = React.useState(null)
  const [nPoints, setNPoints] = React.useState(10)
  const [figType, setfigType] = React.useState("png")

  const getPNGimg = props => {
    const {n=nPoints} = props
    if (figType !== 'png') setfigType('png')
    client.invoke("getFigPNG", n, (error, response) => {
      if (error) console.error(error)
      setElement(<img src={response} width={500}/>)
      }
    )
  }

  const getSVGimg = props => {
    const {n=nPoints} = props
    if (figType !== 'svg') setfigType('svg')
    client.invoke("getFigSVG", n, (error, response) => {
      if (error) console.error(error)

      const xml = scaleXML(response, 500)
      const divWithSVG = <div dangerouslySetInnerHTML={{__html: xml}}/>
      setElement(divWithSVG)
      }
    )
  }

  return (
    <Grommet theme={theme} full>
      <AppBarTitle title="ScienTiFiciK" icon={<Test/>}/>
      <DashboardLayout>
        <Box gridArea="console" background="light-4">
          <ResponsiveContext.Consumer>
            {size => (
              <Box direction={size == ("medium" || "middle") ? "column" : "row" } 
                   align="center" gap="xsmall" pad="xsmall" 
                   alignSelf={size == ("medium" || "middle") ? "center" : "start" }>
                <Box direction="row" align="center" gap="xsmall" pad="xsmall">
                  <Heading level='4' margin='none'>nPoints:</Heading>
                  <TextInput
                    max={30}
                    type="number"
                    placeholder="number of points"
                    value={nPoints}
                    size="small"
                    onChange={event => {
                      setNPoints(event.target.value)
                      if (figType === 'png') getPNGimg({n: event.target.value})
                      if (figType === 'svg') getSVGimg({n: event.target.value})
                    }}
                  />
                </Box>
                <Button
                  color="dark-1"
                  primary
                  icon={<LineChart color="accent-1" />}
                  label="PNG"
                  onClick={getPNGimg}
                />
                <Button
                  color="dark-1"
                  primary
                  icon={<BarChart color="accent-1" />}
                  label="SVG"
                  onClick={getSVGimg}
                />
              </Box>
            )}
          </ResponsiveContext.Consumer>  
        </Box>
        <Box gridArea="main" background="light-2">
          <Box height="small" width="small">
            {element && element }
          </Box>
        </Box>
      </DashboardLayout>
    </Grommet>
  )
}


export default App