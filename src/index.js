import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const TagSlider = ({ tags, selectHandle, addTag }) => {
  const [moveFlag, setMoveFlag] = useState(false)
  const [canClick, setCanClick] = useState(true)
  const [startPos, setstartPos] = useState(0)
  const sliderEl = useRef(null)

  const mouseDownHandle = (e) => {
    const clientX = e.clientX || e.touches[0].clientX

    setMoveFlag(true)
    setstartPos(clientX)
  }

  const mouseMoveHandle = (e) => {
    if (moveFlag) {
      const clientX = e.clientX || e.touches[0].clientX
      const gap = startPos - clientX

      gap < 2 && setCanClick(false)
      sliderEl.current.scrollTo(sliderEl.current.scrollLeft + gap, 0)
      setstartPos(clientX)
    }
  }

  const mouseUpHandle = (e) => {
    setMoveFlag(false)
    e.preventDefault()
  }

  return (
    <div className={styles.tagContainer} ref={sliderEl}>
      <div
        className={styles.tagItems}
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
              className={`${styles.tagItem} ${selected ? styles.tagSeleted : ''} ${styles.noselect}`}
              onClick={() => canClick ? selectHandle(id) : setCanClick(true)}
            >
              <span className={styles.tagName}>{name}</span>
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
  addTag: PropTypes.func
}

export default TagSlider
