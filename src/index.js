import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const TagSlider = ({ tags, addTag }) => {
  // const { movePos, setMovePos } = setState({})
  const [moveFlag, setMoveFlag] = useState(false)
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
      sliderEl.current.scrollTo(sliderEl.current.scrollLeft + startPos - clientX, 0)
      setstartPos(clientX)
    }
  }

  const mouseUpHandle = (e) => {
    setMoveFlag(false)
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
          tags.map((tag) =>
            <div key={`tag-slider-${tag}`} className={`${styles.tagItem} ${styles.noselect}`}>
              <span className={styles.tagName}>{tag}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

TagSlider.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTag: PropTypes.func
}

export default TagSlider
