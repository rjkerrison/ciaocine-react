import React from 'react'
import Button from './FilterButton'
import Filter from './Filter'
import { getLabelValue } from './helpers'

const SliderOption = ({ option, className, updateSlider, lower, upper }) => {
  const { label, value } = getLabelValue(option)
  const isSelected = value === lower || value === upper
  const isInside = (!lower || value > lower) && (!upper || value < upper)

  const classes = [className, isInside ? 'inside' : '']

  return (
    <Button
      key={value}
      isActive={isSelected}
      onClick={() => updateSlider(value)}
      classes={classes}
      label={label}
    />
  )
}

const Slider = ({ classes, options, values, name, updateFilter, ...props }) => {
  const [lower, upper] = name.map((n) => Number(values[n]))

  const updateSlider = (option) => {
    if (!lower) {
      updateFilter(name[0], option)
      return
    }
    if (lower === option) {
      updateFilter(name[0], null)
      return
    }
    if (upper === option) {
      updateFilter(name[1], null)
      return
    }
    updateFilter(option < lower ? name[0] : name[1], option)
  }

  return (
    <Filter classes={classes}>
      {options.map((option) => (
        <SliderOption
          {...props}
          key={getLabelValue(option).value}
          option={option}
          updateSlider={updateSlider}
          lower={lower}
          upper={upper}
        />
      ))}
    </Filter>
  )
}

export default Slider
