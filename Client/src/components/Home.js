import React from 'react'
import Notes from './Notes.js';

export default function Home(props) {
  const {showalert}=props
  return (
    <>
  <Notes showalert={showalert}/>
  </>
  )
}
