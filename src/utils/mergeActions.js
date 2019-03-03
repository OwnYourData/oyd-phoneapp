/**
 * helper function to merge actions
 */
import { Map } from 'immutable';

export default creators => (Map().merge(...creators).filter(value => typeof value === 'function').toObject());
