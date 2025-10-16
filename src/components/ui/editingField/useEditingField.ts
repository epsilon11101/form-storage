import { type ChangeEventHandler, type KeyboardEvent, useState } from "react"


type editedTextValueHookType = {
  initialValue: string
  onEnter?: (value: string) => void

}

export const useEditingField = ({ initialValue, onEnter }: editedTextValueHookType) => {


  const [value, setValue] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false)


  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
    event.stopPropagation()
  }

  const onKeyEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter?.(value)
      setIsEditing(false)
    }
    else if (event.key === "Escape") {
      onCancelHandler()
    }
    event.stopPropagation()
  }

  const onCancelHandler = () => {
    setIsEditing(false)
    setValue(initialValue)
  }

  return {
    value,
    isEditing,
    setIsEditing,
    onChangeHandler,
    onKeyEnterHandler,
    onCancelHandler
  }

}
