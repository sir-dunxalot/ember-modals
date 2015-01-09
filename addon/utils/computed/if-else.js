import Em from 'ember';
import defaultFor from '../default-for';

/**
@method Utils.computed.if
@param {String} dependentKey The name of the Ember property to observe
@param {String} ifTrue The value to return if the dependentKey is present
@param {String} ifFalse The value to return if the dependentKey is not present
@return {Boolean} One of two strings depending on whether the dependentKey property is present
*/

export default function(dependentKey, ifTrue, ifFalse) {
  return function() {
    return this.get(dependentKey) ? ifTrue : ifFalse;
  }.property(dependentKey);
}
