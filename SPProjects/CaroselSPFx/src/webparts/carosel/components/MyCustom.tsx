import * as React from 'react';

// functional Component 
let MyCustom = () => <h1>This is awesome </h1>

// Class Component 
export class AnotherComponent extends React.Component<{}, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <h1>This is another Component</h1>
    );
  }
}


export default MyCustom;