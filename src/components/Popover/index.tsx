import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  forwardRef,
  useImperativeHandle,
  PropsWithChildren,
  useLayoutEffect,
  CSSProperties,
} from 'react'
import type {PopoverProps} from './interface'
import scopedClass from '../../utils/scopedClass'
import classNames from 'classnames'
import Transition from '../Transition'
import {off, on} from '../../utils/event'

const sc = scopedClass('Kyong-popover')

export type TooltipHandle = {
  updatePopupPosition: () => void
}

function Popover(props: PropsWithChildren<PopoverProps>, ref: any) {
  const {
    children,
    className,
    style = {},
    type = 'hover',
    position = 'bottom',
    content,
    noBorder,
    width = 200,
    defaultShow = false,
    closeDeps,
    onVisibleChange,
  } = props
  const [showDialog, setShowDialog] = useState<boolean>(defaultShow || false) // 是否显示
  const [showBtnSize, setShowBtnSize] = useState({
    width: 0,
    height: 0,
  })
  const showBtnRef = useRef<HTMLInputElement | null>(null)
  const dialogRef = useRef<HTMLInputElement | null>(null)
  const classnames = classNames('Kyong-popover', className)

  useLayoutEffect(() => {
    setShowBtnSize({
      width: showBtnRef.current?.offsetWidth || 0,
      height: showBtnRef.current?.offsetHeight || 0,
    })
    if (type === 'click') {
      on(window, 'click', resetVisible)()
    }

    return () => {
      if (type === 'click') {
        off(window, 'click', resetVisible)()
      }
    }
  }, [])

  const resetVisible = () => {
    setShowDialog(false)
  }

  useImperativeHandle(ref, () => ({
    setShowDialog,
  }))

  const getPosition = () => {
    const popoverContentMargin = 5
    const {width, height} = showBtnSize
    // const dialogHeight = dialogRef.current?.offsetWidth || 0;
    const style = {} as CSSProperties
    switch (position) {
      case 'bottom':
        style.top = `${height + popoverContentMargin}px`
        break
      case 'top':
        style.bottom = `${height + popoverContentMargin}px`
        break
      case 'right':
        style.left = `${width + popoverContentMargin}px`
        style.top = `${Number(height) / 2}px`
        break
      case 'left':
        style.right = `${width + popoverContentMargin}px`
        style.top = `${Number(height) / 2}px`
        break
    }
    if (width) {
      style.width = width
    }
    if (noBorder) {
      style.border = 'none'
    }
    return style
  }

  const hoverOpenDialog = () => {
    // 移入打开dialog
    if (type === 'hover' && showDialog === false) {
      setShowDialog(true)
    }
  }

  const hoverCloseDialog = () => {
    // 移开关闭dialog
    if (type === 'hover' && showDialog === true) {
      setShowDialog(false)
    }
  }

  const handleDialog = (e: any) => {
    // 点击打开dialog
    e.stopPropagation()
    if (type === 'click') {
      setShowDialog(!showDialog)
    }
  }

  return (
    <div
      className={classnames}
      style={style}
      onMouseEnter={() => hoverOpenDialog()}
      onMouseLeave={() => hoverCloseDialog()}
    >
      <Transition in={showDialog} animation="zoom-in-top" timeout={200}>
        <div className={sc('dialog')} style={{...getPosition()}} ref={dialogRef}>
          {content}
        </div>
      </Transition>
      <div onClick={handleDialog} ref={showBtnRef}>
        {children}
      </div>
    </div>
  )
}

const PopoverComponent = forwardRef<TooltipHandle, PropsWithChildren<PopoverProps>>(Popover)

PopoverComponent.displayName = 'PopoverComponent'
export default PopoverComponent
