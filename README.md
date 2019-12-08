# gatsby-tag-slider

> Tag Slider for React

[![NPM](https://img.shields.io/npm/v/gatsby-tag-slider.svg)](https://www.npmjs.com/package/gatsby-tag-slider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save gatsby-tag-slider
```

## Usage

### Setting

- tags : Tag Slider Data [Go](#Data)
- selectHandle : Handle Select Event

### Data

```js
const tags = {
  'react': {
    id: 'react',
    name: 'react',
    selected: false
  },
  'network': {
    id: 'network',
    name: 'network',
    selected: false
  },
  'es3': {
    id: 'es3',
    name: 'es3',
    selected: false
  },
  'java': {
    id: 'java',
    name: 'java',
    selected: false
  },
  'sprint': {
    id: 'sprint',
    name: 'sprint',
    selected: false
  },
  'vue': {
    id: 'vue',
    name: 'vue',
    selected: false
  },
  'js': {
    id: 'js',
    name: 'js',
    selected: false
  },
  'es5': {
    id: 'es5',
    name: 'es5',
    selected: false
  },
  'tdd': {
    id: 'tdd',
    name: 'tdd',
    selected: false
  }
}
```


## JSX

```jsx
import React, { Component } from 'react'
import TagSlider from 'gatsby-tag-slider'

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
        'tags': {
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
        <TagSlider tags={this.state.tags} selectHandle={this.selectHandle}/>
      </div>
    )
  }
}

```

## Demo

![image](https://user-images.githubusercontent.com/24274424/70385536-3ddde400-19d2-11ea-9e06-4b3105e6f4f7.png)
[Click me](https://seonhyungjo.github.io/gatsby-tag-slider/)

## Sliding

### Sliding Way

1. Click & Move
2. Scrolling

![tag-slider](https://user-images.githubusercontent.com/24274424/70385741-60243180-19d3-11ea-9b9c-e224f64d334d.gif)

## License

MIT © [seonhyungjo](https://github.com/seonhyungjo)
