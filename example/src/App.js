import React, { Component } from 'react'
import TagSlider from 'gatsby-tag-slider'

const tags = {
  react: {
    id: 'react',
    name: 'react',
    selected: false
  },
  network: {
    id: 'network',
    name: 'network',
    selected: false
  },
  es3: {
    id: 'es3',
    name: 'es3',
    selected: false
  },
  java: {
    id: 'java',
    name: 'java',
    selected: false
  },
  sprint: {
    id: 'sprint',
    name: 'sprint',
    selected: false
  },
  vue: {
    id: 'vue',
    name: 'vue',
    selected: false
  },
  js: {
    id: 'js',
    name: 'js',
    selected: false
  },
  es5: {
    id: 'es5',
    name: 'es5',
    selected: false
  },
  tdd: {
    id: 'tdd',
    name: 'tdd',
    selected: false
  }
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tags
    }
  }

  selectHandle = (id) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        tags: {
          ...prevState.tags,
          [id]: {
            ...prevState.tags[id],
            selected: !prevState.tags[id].selected
          }
        }
      }
    })
  }

  render() {
    return (
      <div className={'outerDiv'}>
        <TagSlider tags={this.state.tags} selectHandle={this.selectHandle} customClassPrefix={'snyung'} />
      </div>
    )
  }
}
