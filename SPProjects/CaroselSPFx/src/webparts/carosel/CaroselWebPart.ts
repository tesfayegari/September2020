import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

import * as strings from 'CaroselWebPartStrings';
import Carosel from './components/Carosel';
import { ICaroselProps } from './components/ICaroselProps';

export interface ICaroselWebPartProps {
  description: string;
}

export default class CaroselWebPart extends BaseClientSideWebPart<ICaroselWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");

    const element: React.ReactElement<ICaroselProps> = React.createElement(
      Carosel,
      {
        description: this.properties.description
     
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
