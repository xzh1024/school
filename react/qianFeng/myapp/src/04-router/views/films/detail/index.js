import React from 'react'

export default function Detail(props) {
  console.log(props)
  return (
    <div>Detail-{props.match.params.id}</div>
    // <div>Detail-{props.location.query.id}</div>
    // <div>Detail-{props.location.state.id}</div>
  )
}
