import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
// require('./custom.css');

export interface IAccordionWebPartProps {
  description: string;
  listName: string;
}

export default class AccordionWebPart extends BaseClientSideWebPart<IAccordionWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
    // this.domElement.innerHTML = `
    // <div class="container-fluid mt-5">
    //   <!--h3>${this.context.pageContext.web.title}</h3-->
    //   <div class="card">      
    //     <div class="card-body">
    //       <div class="row">
    //         <div class="col-md-2 col-sm-12 text-right" >
    //           <img  src="https://www.mediacurrent.com/static/a95f6a08fdcaaac9a54accf2f2e11f34/f26d1/Daphney.Addotta.png" alt="" class="rounded-circle w-100">
    //         </div>
    //         <div class="col-md-10 col-sm-12" >
    //           <h2>Meet team member, Daphney Addotta</h2>
    //           <p style="font-size: 1.5em;">
    //             Daphney utilizes her expertise in recruiting technical resources, communication, and human resources to help her excel in her role as Recruitment and Culture Coordinator. In this unique role at Mediacurrent,...
    //           </p>
    //           <a href="#" class="btn btn-primary">Learn More ...</a>
    //         </div>
    //       </div>          
    //     </div>      
    //   </div>
    // </div>
    //   `;

    // this._getListData()
    // .then(response => console.log('Data from SharePoint is ', response),
    //     error => console.error('Oops error occured ', error));
    this._getItemsData('EmployeeSpotlight')
      .then(response => {
        console.log('Data from SharePoint List is ', response);
        let items = response.value;
        //render html with your response data
        // let item = items.length > 0 ? items[0] : null;
        if (items.length > 0) {
          this.domElement.innerHTML = `
            <div class="container-fluid mt-5">              
              <div class="card">      
                <div class="card-body">
                    ${this._getEmployeeHtml(items)}      
                </div>      
              </div>
            </div>
              `;
        }else {
          this.domElement.innerHTML = '<h3>Your list doesnt have any item</h3>'
        }

      },
        error => {
          console.error('Oops error occured ', error);
          this.domElement.innerHTML = `<h3 style="color:red;">Oops error occured Error: ${error.message}</h3>`
        });

  }

  private _getEmployeeHtml(items) {
    let html = '';    
    for(let item of items){
      html += `
        <div class="row">
          <div class="col-md-3 col-sm-12 text-right mt-5" >
            <img  src="${item.ImageUrl}" alt="" class="rounded-circle w-100">
          </div>
          <div class="col-md-9 col-sm-12" >
            <h2>Meet team member, ${item.Title}</h2>
            <p style="font-size: 1.5em;">
              ${item.Biography},...
            </p>
            <a href="${item.ProfileUrl}" target="_blank" class="btn btn-primary">Learn More ...</a>
            <hr>
          </div>
        </div>  
          `;
    }
    
    return html;
  }

  private _getListData(): Promise<any> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getItemsData(listName: string): Promise<any> {
    if (!listName) return;
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${listName}')/items?$filter=Active ne false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Change your webpart Properties'
          },
          groups: [
            {
              groupName: 'General Setting',
              groupFields: [
                // PropertyPaneTextField('description', {
                //   label: 'Webpart Title'
                // }),
                // PropertyPaneTextField('listName', {
                //   label: 'List Name'
                // })
              ]
            }
          ]
        }
      ]
    };
  }
}
