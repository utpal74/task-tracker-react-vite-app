import { useState } from "react"

export const useInputs = (initialState) => {
    const [value, setValue] = useState(initialState);

    return [
        {
            value,
            onChange: e => setValue(e.target.value)
        },
        () => setValue(initialState)
    ]
}
