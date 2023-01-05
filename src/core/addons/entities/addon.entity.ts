import { Model } from 'objection';

export class Addon extends Model {
  static get tableName() {
    return 'addons';
  }
}

export class AddonCategory extends Model {
  static get tableName() {
    return 'addon_categories';
  }
}
