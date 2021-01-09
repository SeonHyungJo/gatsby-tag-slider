import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const TagSlider = ({ tags, selectHandle, customClassPrefix = '' }) => {
  const sliderEl = useRef(null)

  const [moveFlag, setMoveFlag] = useState(false)
  const [canClick, setCanClick] = useState(true)
  const [startPos, setstartPos] = useState(0)

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
    <section className={customClassPrefix ? customClassPrefix + '-container' : styles.container} ref={sliderEl}>
      <div
        className={customClassPrefix ? customClassPrefix + '-items' : styles.items}
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
            <button
              key={`tag-slider-${id}`}
              className={`
                ${customClassPrefix ? customClassPrefix + '-item' : styles.item}
                ${customClassPrefix ? selected ? customClassPrefix + '-selected' : '' : selected ? styles.selected : ''}
                ${styles.noselect}
              `}
              onClick={() => canClick ? selectHandle(id) : setCanClick(true)}
            >
              <span className={customClassPrefix ? customClassPrefix + '-name' : styles.name}>{name}</span>
            </button>
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
  customClassPrefix: PropTypes.string
}

export default TagSlider
