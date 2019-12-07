import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

/**
 * Add User custom class name
 * @returns { container : 'custom-conainer'}
 */
const useCustomClass = (prefix, styleList) => {
  const customClasses = styleList.reduce((acc, name) => {
    name !== 'noselect' && (acc[name] = `${prefix}-name`)
    return acc
  }, {})
  return customClasses
}

const TagSlider = ({ tags, selectHandle, addTag, classPrefix }) => {
  const [moveFlag, setMoveFlag] = useState(false)
  const [canClick, setCanClick] = useState(true)
  const [startPos, setstartPos] = useState(0)
  const sliderEl = useRef(null)
  const styleClasses = !classPrefix ? styles : useCustomClass(classPrefix, Object.keys(styles))

  const mouseDownHandle = (e) => {
    const clientX = e.clientX || e.touches[0].clientX

    setMoveFlag(true)
    setstartPos(clientX)
  }

  const mouseMoveHandle = (e) => {
    if (moveFlag) {
      const clientX = e.clientX || e.touches[0].clientX
      const gap = startPos - clientX

      gap > 3 && setCanClick(false)
      sliderEl.current.scrollTo(sliderEl.current.scrollLeft + gap, 0)
      setstartPos(clientX)
    }
  }

  const mouseUpHandle = (e) => {
    setMoveFlag(false)
  }

  return (
    <div className={styleClasses.container} ref={sliderEl}>
      <div
        className={styleClasses.items}
        onMouseDown={mouseDownHandle}
        onMouseMove={mouseMoveHandle}
        onMouseUp={mouseUpHandle}
        onMouseLeave={mouseUpHandle}
        onTouchStart={mouseDownHandle}
        onTouchMove={mouseMoveHandle}
        onTouchEnd={mouseUpHandle}
      >
        {
          Object.values(tags).map(({ id, name, selected }) =>
            <div
              key={`tag-slider-${id}`}
              className={`${styleClasses.item} ${selected ? styleClasses.seleted : ''} ${styles.noselect}`}
              onClick={() => canClick ? selectHandle(id) : setCanClick(true)}
            >
              <span className={styleClasses.name}>{name}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

TagSlider.propTypes = {
  tags: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool
  }),
  selectHandle: PropTypes.func,
  addTag: PropTypes.func,
  classPrefix: PropTypes.string
}

export default TagSlider
