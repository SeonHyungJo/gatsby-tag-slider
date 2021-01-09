import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const useCustomClass = (prefix, styleList) => styleList.reduce((acc, name) => {
  name !== 'noselect' && (acc[name] = `${prefix}-name`)
  return acc
}, {})

const TagSlider = ({ tags, selectHandle, classPrefix }) => {
  const sliderEl = useRef(null)

  const [moveFlag, setMoveFlag] = useState(false)
  const [canClick, setCanClick] = useState(true)
  const [startPos, setstartPos] = useState(0)

  const styleClasses = !classPrefix ? styles : useCustomClass(classPrefix, Object.keys(styles))

  const mouseDownHandle = useCallback((e) => {
    const clientX = e.clientX || e.touches[0].clientX

    setMoveFlag(true)
    setstartPos(clientX)
  }, [startPos, moveFlag])

  const mouseMoveHandle = useCallback((e) => {
    if (moveFlag) {
      const clientX = e.clientX || e.touches[0].clientX
      const gap = startPos - clientX

      gap > 3 && setCanClick(false)
      sliderEl.current.scrollTo(sliderEl.current.scrollLeft + gap, 0)
      setstartPos(clientX)
    }
  }, [moveFlag])

  const mouseUpHandle = useCallback((e) => {
    setMoveFlag(false)
  }, [moveFlag])

  return (
    <section className={styleClasses.container} ref={sliderEl}>
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
    </section>
  )
}

TagSlider.propTypes = {
  tags: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool
  }),
  selectHandle: PropTypes.func,
  classPrefix: PropTypes.string
}

export default TagSlider
