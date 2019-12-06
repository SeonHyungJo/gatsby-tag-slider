import React, { Component } from 'react'
import TagSlider from 'gatsby-tag-slider'

const tags = ["react", "network", "es3", "react2", "network2", "es32", "react3", "network3", "es33"]

export default class App extends Component {
  render () {
    return (
      <div>
        <TagSlider tags = {tags}  />
      </div>
    )
  }
}
