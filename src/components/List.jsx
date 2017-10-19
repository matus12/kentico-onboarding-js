import React, { PureComponent } from 'react';

import { TsComponent } from './TsComponent.tsx';
import { ItemList } from './ItemList';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      values: ['Make a coffee', 'Master ReactJS', 'Learn ReduxJS', 'Help making Kentico Cloud awesome!'],
    };
  }

  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ItemList values={this.state.values} />
          </div>
        </div>
      </div>
    );
  }
}
