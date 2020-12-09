import * as React from 'react';

import { ICaroselProps } from './ICaroselProps';
import MyCustom, { AnotherComponent } from './MyCustom';


export default class Carosel extends React.Component<ICaroselProps, {}> {
  public render(): React.ReactElement<ICaroselProps> {
    return (
      <div>       
        <MyCustom></MyCustom>
        <AnotherComponent></AnotherComponent>
      </div>
    );
  }
}
