import React, { useState } from 'react';
import "../../css /Header.css"
import OrderGrid from '../Pages/OrderGrid';

const SegmentedButton = ({options}) => {
  const [selected, setSelected] = useState(options[0]);

  const handleClick = (option) => {
    setSelected(option);
    
  };

  return (
   <div className='segment-screen'>
         <div className="segmented-button">
            {options.map((option, index) => (
                <button
                     key={index}
                        className={`segment ${selected === option ? 'selected' : ''}`}
                        onClick={() => handleClick(option)}
                     >
                    {option}

                </button>
            ))}
      </div>

        <div className='ActiveOrder'>
            {selected === "Active Order" ? <OrderGrid /> :""}
        </div>


    
    </div>
  );
};

export default SegmentedButton;
