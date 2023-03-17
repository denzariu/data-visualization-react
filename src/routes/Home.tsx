import React, { Component } from 'react'
import { getBigrams, getDate } from '../functions/bigrams';

type Props = {
    
}

type State = {
    text?: string;
}

export default class Home extends Component<Props, State> {

  render() {
    return (
      <>
        <div>Today's date: {getDate()}</div>
        <div>{"./faji ' hello"}</div>
        <div>{getBigrams("./faji ' hello")}</div>
      </>
    )
  }
}