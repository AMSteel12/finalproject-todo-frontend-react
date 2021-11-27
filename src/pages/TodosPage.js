import React, {useEffect, useState} from 'react';
import {useResource} from 'react-request-hook';
import {Link} from 'react-navi';
import Todo from '../Todo';

export default function TodoPage({id}) {

  const [todo, getTodo] = useResource(() => ({
    url: `/todos/${id}`,
    method: 'get',
  }));

  useEffect(getTodo, [id]);

  return (
    <div>
      <div>
        <Link href="/">Return</Link>
      </div>
      {todo && todo.data ? <Todo {...todo.data} /> : 'Getting data..'}
    </div>
  );
}
