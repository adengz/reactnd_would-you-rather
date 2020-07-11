import React from 'react';

function VoteBar(props) {
  // style meant to be used for correctly render the bar
  // not to be mixed with global css
  const style = {
    height: '100%',
    borderRadius: 'inherit',
    display: 'flex',
    alignItems: 'center'
  };

  const position = { optionOne: 'left', optionTwo: 'right'};

  const { options } = props;
  for (let o in options) {
    options[o].style = {
      ...style,
      width: `${options[o].ratio}%`,
      textAlign: position[o],
      float: position[o],
    };
    (o === 'optionTwo') && (options[o].style.justifyContent = 'flex-end');
  }

  return (
    <div className="vote-bar">
      {Object.entries(options).map(([k, v]) => (
        <div
          key={k}
          className={v.className.replace('option', 'bar')}
          style={v.style}
        >
           {v.ratio}% 
        </div>
      ))}
    </div>
  );
}

export default VoteBar;