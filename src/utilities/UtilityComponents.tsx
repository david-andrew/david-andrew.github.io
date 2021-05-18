import React from 'react'

//place this after any element that needs to be clearfixed
export const ClearFixAfter = (): JSX.Element => {
    return <div style={{ clear: 'both', display: 'table' }}></div>
}
