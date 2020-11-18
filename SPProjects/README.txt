SharePoint REST API

Endpoints for a SP site url = https://test.sharepoint.com/sites/demo


Entry 
url/_api/
Read Site Collection information 
Example : https://yourtenant.sharepoint.com/sites/sep2020classic/_api/site

Read Root Web information
Example : https://yourtenant.sharepoint.com/sites/sep2020classic/_api/web

Read All SharePoint Lists under Site Url /_api/web/lists
Example : https://yourtenant.sharepoint.com/sites/sep2020classic/_api/web/lists

Select Specific Property of A list example, Title, ItemCount, Hidden 
We use OData /_api/web/lists?$select=property1,property2,property3,.... as a query string
Example : https://yourtenant.sharepoint.com/sites/sep2020classic/_api/web/lists?$select=Title,ItemCount,Hidden

Filter Specific List with property Example Hidden === false
We use OData $filter=property1 operator value 
Example /_api/web/lists?$filter=Hidden eq false
Example : https://yourtenant.sharepoint.com/sites/sep2020classic/_api/web/lists?$filter=Hidden eq false

How do we use filter and select OData 
Example : https://yourtenant.sharepoint.com/sites/sep2020classic/_api/web/lists?$filter=Hidden eq false&$select=Title,ItemCount,Hidden

How to read One Specific list by its title 
Example siteUrl/_api/web/lists/getbytitle('YourListTitle')

exaple to read list with title AccordionDemo in tgari site collection 
https://yourtenant.sharepoint.com/sites/sep2020classic/_api/web/lists/getbytitle('AccordionDemo')

To read SharePoint list items in AccordionDemo list above 
https://yourtenant.sharepoint.com/sites/sep2020classic/_api/web/lists/getbytitle('AccordionDemo')/items