import React, { PureComponent } from 'react';
import { Add } from './Add';
import { generateId } from '../utils/generateId';
import { generateList } from '../utils/initItemList';
import { TsComponent } from './TsComponent.tsx';
import { ItemList } from './ItemList';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: generateList(),
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
            <ItemList items={this.state.items} />
          </div>
        </div>
      </div>
    );
  }
}
