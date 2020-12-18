import * as React from 'react';
import Carousel from 'react-bootstrap/esm/Carousel';


import { ICaroselProps } from './ICaroselProps';



export default class Carosel extends React.Component<ICaroselProps, {}> {

  public render(): React.ReactElement<ICaroselProps> {
    console.log('Items from Parent WebPart is ', this.props.carouselItems);
    let cItems = this.props.carouselItems.map(item => {
      return (
        <Carousel.Item key={item.Id}>
          <img
            className="d-block w-100"
            src={item.ImageUrl}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{item.Title}</h3>
            <p>{item.Description}</p>
           {item.LinkUrl && <a href={item.LinkUrl} style={{cursor:'pointer'}} className="btn btn-dark">{item.LinkTitle0}</a>}
          </Carousel.Caption>
        </Carousel.Item>
      )
    });

    console.log(cItems);

    return (
      <div>
        <Carousel interval={2000}>
          {cItems}
        </Carousel>
      </div>
    );
  }

  // private _getItemJsx(item: any) {
  //   return (
  //     <Carousel.Item key={item.Id}>
  //       <img
  //         className="d-block w-100"
  //         src={item.ImageUrl}
  //         alt="First slide"
  //       />
  //       <Carousel.Caption>
  //         <h3>{item.Title}</h3>
  //         <p>{item.Description}</p>
  //       </Carousel.Caption>
  //     </Carousel.Item>
  //   );
  // }
}
