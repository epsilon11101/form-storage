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
    if (event.key === "Enter" || event.key === "Escape") {
      setIsEditing(false)
      onEnter?.(value)
    }
    event.stopPropagation()
  }

  return {
    value,
    isEditing,
    setIsEditing,
    onChangeHandler,
    onKeyEnterHandler
  }

}
