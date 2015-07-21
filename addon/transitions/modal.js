import { animate, stop } from 'liquid-fire';

export default function (oldView, insertNewView) {

  stop(oldView);

  return insertNewView.then(function(newView){
    return animate(newView, { opacity: [1, 0]});
  });
}
