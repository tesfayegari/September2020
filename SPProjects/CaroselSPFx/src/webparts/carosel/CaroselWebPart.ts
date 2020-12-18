import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import * as strings from 'CaroselWebPartStrings';
import Carosel from './components/Carosel';
import { ICaroselProps } from './components/ICaroselProps';

export interface ICaroselWebPartProps {
  description: string;
}

export default class CaroselWebPart extends BaseClientSideWebPart<ICaroselWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");


    this._getItemsDataByName('Carosoul')
      .then(response => {
        console.log('Data is ', response);
        let items = response.value; //all sharepoint list items from Carosoul list

        const element: React.ReactElement<ICaroselProps> = React.createElement(
          Carosel,
          {
            description: this.properties.description,
            carouselItems: items
          }
        );

        ReactDom.render(element, this.domElement);

      },
        error => {
          console.error('Oops error occured', error);
        });

  }

  private _getItemsDataByName(listName: string): Promise<any> {
    if (!listName) return;
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${listName}')/items?$filter=Active ne false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getItemsDataByGUID(listGuid: string): Promise<any> {
    if (!listGuid) return;
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists(guid'${listGuid}')/items?$filter=Active ne false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
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
