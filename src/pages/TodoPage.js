import React, {useEffect, useContext} from 'react'
import {useResource} from 'react-request-hook'
import {StateContext} from '../Contexts'
import {Link} from 'react-navi'
import Todo from '../Todo'

export default function TodoPage ({ id }) {

    const {state} = useContext(StateContext);

    const [todo, getTodo] = useResource(() => ({
        url: `/todo/${id}`,
        headers: {"Authorization": `${state.user.access_token}`},
        method: 'get'
    }))

    useEffect(getTodo, [id])

    return (
        <div>
            {(todo && todo.data)
                ? <Todo {...todo.data} />
                : 'Loading...'
            }
            <div><Link href="/">Return</Link></div>
        </div>
    )
}