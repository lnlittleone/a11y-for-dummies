import styled from '@emotion/styled'
import type {ReactNode} from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useClickOutside} from '@react-hookz/web'
import {DropdownItem} from "./DropdownItem";

type Option<T> = {
  value: T
  label: string | ReactNode
}

type DropdownProps = {
  options: Option<string>[]
  isDisabled?: boolean
  value: string | null | undefined
  placeholder?: ReactNode
  onChange: (values: string) => void
}

type ContentPosition = 'center' | 'left' | 'right'

export const Dropdown = ({
  options,
  isDisabled,
  value,
  placeholder,
  onChange
}: DropdownProps) => {

  const dropdownRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [openOptions, setOpenOptions] = useState<boolean>(false)
  const [currentFocus, setCurrentFocus] = useState(0)
  const currentOption = options.find((option) => option.value === value)

  const columnsCount = useMemo(() => {
    if (options.length > 20) {
      return 5
    }
    if (options.length > 15) {
      return 4
    }
    if (options.length > 10) {
      return 3
    }
    return options.length > 5 ? 2 : 1
  }, [options.length])

  const [positions, setPositions] = useState<ContentPosition>('center')

  useClickOutside(dropdownRef, () => {
    setOpenOptions(false)
  })

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Enter':
        case ' ': {
          e.preventDefault()
          setCurrentFocus(0)
          onChange(options[currentFocus].value)
          setOpenOptions(!openOptions)
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          setCurrentFocus(
            currentFocus === options.length - 1 ? 0 : currentFocus + 1,
          )
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          setCurrentFocus(
            currentFocus === 0 ? options.length - 1 : currentFocus - 1,
          )
          break
        }
        case 'Escape': {
          e.preventDefault()
          setCurrentFocus(0)
          setOpenOptions(!openOptions)
          break
        }
      }
    },
    [
      options.length,
      currentFocus,
      setCurrentFocus,
      openOptions,
      setOpenOptions,
      options,
      onChange,
    ],
  )

  const selectOptionOnClick = (option: string) => {
    onChange(option)
    setOpenOptions(!openOptions)
  }

  useEffect(() => {
    const set = () => {
      requestAnimationFrame(() => {
        if (!buttonRef.current) return
        const pos = buttonRef.current.getBoundingClientRect()

        const padding = (pos.width * (columnsCount - 1)) / 2
        if (pos.left < padding) {
          setPositions('left')
        } else if (window.innerWidth - pos.right < padding) {
          setPositions('right')
        } else {
          setPositions('center')
        }
      })
    }

    window.addEventListener('resize', set)
    set()

    return () => {
      window.removeEventListener('resize', set)
    }
  }, [])

  useEffect(() => {
    buttonRef.current?.addEventListener('keydown', handleKeyDown, false)
    return () => {
      buttonRef.current?.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [handleKeyDown])

  return (
    <DropDownContainer ref={buttonRef}>
      <DropdownButton
        disabled={isDisabled}
        onClick={() => setOpenOptions(!openOptions)}
        aria-pressed={openOptions}
        aria-expanded={openOptions}
        hasValue={options.some((option) => option.value === value)}
      >
        {currentOption?.label ?? placeholder}
      </DropdownButton>
      {openOptions && (
        <DropDownList
          columnsCount={columnsCount}
          ref={dropdownRef}
          position={positions}
        >
          {options.map((option, i) => (
            <DropdownItem
              key={i}
              setFocus={setCurrentFocus}
              index={i}
              focus={currentFocus === i}
              option={option.label}
              onClick={() => selectOptionOnClick(option.value)}
            />
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  )
}

export const DropDownContainer = styled.div`
  position: relative;
  display: flex;
`

const DropdownButton = styled.button<{ hasValue: boolean }>`
  min-width: 22rem;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  color: ${(props) =>
          props.hasValue ? '#03b6fc' : `#c8cecf`};
  border-style: solid;
  border-width: 0.1rem;
  border-color: ${(props) =>
          props.hasValue ? '#03b6fc' : `#c8cecf`};
  display: flex;
  justify-content: space-between;
  height: 3.6rem;
  align-items: center;
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: #FFF;
  text-transform: capitalize;

  &:focus {
    color: #18044a;
    border-color: #18044a;
  }

  &:active {
    color: #03b6fc;
    border-color: #03b6fc;
  }

  &:disabled {
    color: #c8cecf;
    background-color: transparent;
    cursor: initial;
  }
`

export const DropDownList = styled.ul<{
  columnsCount: number
  position: ContentPosition
}>`
  position: absolute;
  top: 3rem;
  right: ${({position}) => (position === 'right' ? 0 : 'auto')};
  left: ${({position}) =>
          position === 'left' ? 0 : position === 'center' ? '50%' : 'auto'};
  transform: ${({position}) =>
          position === 'center' ? 'translateX(-50%)' : 'none'};
  z-index: 1;
  background-color: #FFF;
  box-shadow: 0 0 0.6rem #e3e3e3;
  min-width: 32rem;
  max-height: 40rem;
  width: max-content;
  overflow: auto;
  padding: 2rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(${({columnsCount}) => columnsCount}, 1fr);
`