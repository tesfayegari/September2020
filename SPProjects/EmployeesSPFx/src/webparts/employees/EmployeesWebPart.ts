import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface IEmployeesWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

export default class EmployeesWebPart extends BaseClientSideWebPart<IEmployeesWebPartProps> {

  public render(): void {
 
    this.domElement.innerHTML = `
    <h1>${this.properties.description}</h1>
    <p>Multi Line is ${this.properties.test}</p>
    <p>Checkbox value is ${this.properties.test1}</p>
    <p>Dropdown value is ${this.properties.test2}</p>
    <p>Toggle value is ${this.properties.test3}</p>
      `;
  }
  
  private _getItemsData(listName: string): Promise<any> {
    if(!listName) return;
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${listName}')/items`, SPHttpClient.configurations.v1)
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
                  label: 'Webpart Title'
                }),
                PropertyPaneTextField('test', {
                  label: 'Multi-line Text Field',
                  multiline: true
                }),
                PropertyPaneCheckbox('test1', {
                  text: 'Checkbox'
                }),
                PropertyPaneDropdown('test2', {
                  label: 'Dropdown',
                  options: [
                    { key: '1', text: 'Choice One' },
                    { key: '2', text: 'Choice Two' },
                    { key: '3', text: 'Choice Three' },
                    { key: '4', text: 'Choice Four' }
                  ]}),
                PropertyPaneToggle('test3', {
                  label: 'Toggle',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
