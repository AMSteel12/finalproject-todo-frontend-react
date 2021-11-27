import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-navi';

export default function User({id, username}) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link href={`/users/${id}`}>USER ID: {username}</Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}