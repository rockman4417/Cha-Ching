import React, {useState} from 'react'
import Dialogue1 from './Dialogue1'
import Dialogue2 from './Dialogue2'
import Dialogue3 from './Dialogue3'
import Dialogue4 from './Dialogue4'
import Dialogue5 from './Dialogue5'
import Dialogue6 from './Dialogue6'

export default function DialogueWrapper({ uid, open, setOpen }) {
    



    return (
        <div>
            {console.log('starting tutorial!')}
            <Dialogue1 open={open} setOpen={setOpen} uid={uid} />
            <Dialogue2 open={open} setOpen={setOpen}/>
            <Dialogue3 open={open} setOpen={setOpen}/>
            <Dialogue4 open={open} setOpen={setOpen}/>
            <Dialogue5 open={open} setOpen={setOpen}/>
            <Dialogue6 open={open} setOpen={setOpen} uid={uid} />
        </div>
    )
}
