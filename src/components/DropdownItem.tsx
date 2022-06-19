import type {ReactNode} from 'react'
import {useCallback, useEffect, useRef} from 'react'
import styled from '@emotion/styled'

type DropdownItemProps = {
  option: string | ReactNode
  focus: boolean
  index: number
  setFocus: (index: number) => void
  onClick: () => void
}

export const DropdownItem = ({
  option,
  index,
  setFocus,
  focus,
  onClick,
}: DropdownItemProps) => {
  const ref = useRef<HTMLLIElement | null>(null)

  useEffect(() => {

    if (focus) {
      ref?.current?.focus()
    }
  }, [focus])

  const handleSelect = useCallback(() => {
    setFocus(index)
  }, [index, setFocus])

  return (
    <ListItem
      tabIndex={focus ? 0 : -1}
      role="listItem"
      ref={ref}
      onClick={onClick}
      onKeyPress={handleSelect}
      onChange={handleSelect}
    >
      {option}
    </ListItem>
  )
}

const ListItem = styled.li`
  border-radius: 0.2rem;
  background-color: lightgray;
  color: black;
  padding: 1.7rem 2rem;
  font-size: 1.4rem;
  list-style-type: none;
  outline: none;
  cursor: pointer;
  text-transform: capitalize;

  &:hover,
  &:focus {
    background-color: lightgreen;
    color: green;
  }
`