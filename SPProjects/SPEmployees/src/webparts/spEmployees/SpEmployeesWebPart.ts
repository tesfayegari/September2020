import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";


export interface ISpEmployeesWebPartProps {
  description: string;
  list: string;// | string[]; // Stores the list ID(s)
  nomItems: number;
}

export default class SpEmployeesWebPart extends BaseClientSideWebPart<ISpEmployeesWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
        <h3>Under Construction </h3>
        <p>Description value is ${this.properties.description}</p>
        <p>List value is ${this.properties.list}</p>
          `;
    let max = this.properties.nomItems ? this.properties.nomItems : 5;
    this.properties.list &&
      this._getItemsDataByGUID(this.properties.list, max)
        .then(response => {
          console.log('data is ', response);
        },
          error => { console.error('Oops error occured', error); })
  }

  private _getItemsDataByName(listName: string, max: number = 5): Promise<any> {
    if (!listName) return;
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${listName}')/items?$top=${max}`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getItemsDataByGUID(listGuid: string, max: number = 5): Promise<any> {
    if (!listGuid) return;
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists(guid'${listGuid}')/items?$top=${max}`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Employee Settings'
          },
          groups: [
            {
              groupName: 'General Settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Webpart Title',
                  description: 'Make sure your list has Title, Url, ImageUrl, columns'
                }),
                PropertyFieldListPicker('list', {
                  label: 'Select a list',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  // multiSelect: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                }),
                PropertyPaneSlider('nomItems', {
                  label: 'Number of Items to Display',
                  min: 1,
                  max: 100,
                  value: 5
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
