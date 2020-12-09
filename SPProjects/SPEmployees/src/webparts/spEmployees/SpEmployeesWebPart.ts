import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { SPComponentLoader } from "@microsoft/sp-loader";


export interface ISpEmployeesWebPartProps {
  description: string;
  list: string;// | string[]; // Stores the list ID(s)
  numItems: number;
  image: string;
  detail: string;
  name: string;
}

export default class SpEmployeesWebPart extends BaseClientSideWebPart<ISpEmployeesWebPartProps> {

  defaultImage = 'https://www.w3schools.com/bootstrap4/img_avatar3.png';
  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
    
    let max = this.properties.numItems ? this.properties.numItems : 5;
    this.properties.list ?
      this._getItemsDataByGUID(this.properties.list, max)
        .then(response => {
          console.log('data is ', response);
          let items = response.value;

          let myHtml = `<div class ="container">
                          <h2>Items from Selected List are: </h2>
                          `;

          for(let item of items){
            let image = item[this.properties.image];// ? item[this.properties.image] : this.defaultImage;
            myHtml += `           
            <div class="card" style="width:400px">
              ${image ? `<img class="card-img-top" src="${image}" alt="Card image" style="width:100%">` :''}
              <div class="card-body">
                <h4 class="card-title">${item[this.properties.name]}</h4>
                <p class="card-text">${item[this.properties.detail]}</p>
                <a href="#" class="btn btn-primary">See Profile</a>
              </div>
            </div>
                `;
          }

          this.domElement.innerHTML = myHtml + '</div>';

        },
          error => { console.error('Oops error occured', error); }) :
           this.domElement.innerHTML = '<h2 style="color:red">Please Configure Your webpart</h2>';
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
                PropertyPaneSlider('numItems', {
                  label: 'Number of Items to Display',
                  min: 1,
                  max: 100,
                  value: 5
                })
              ]
            },
            {
              groupName: 'Column Mapping',
              groupFields: [
                PropertyPaneTextField('image', {
                  label: 'Image Field',
                  description: 'Make sure your List has the Column'
                }),
                PropertyPaneTextField('detail', {
                  label: 'Detail Field',
                  description: 'Make sure your List has the Column'
                }),
                PropertyPaneTextField('name', {
                  label: 'Name Field',
                  description: 'Make sure your List has the Column'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
