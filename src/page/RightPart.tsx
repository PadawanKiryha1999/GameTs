import React from "react";

import "./RightPart.css";
export const RightPart: React.FC = () => {
  return <div className="right-part"> right part</div>;
};
// import React, { useState, useEffect } from 'react';

// export const RightPart: React.FC = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `Вы нажали ${count} раз`;
//   });

//   return (
//     <div>
//       <p>Вы нажали {count} раз</p>
//       <button onClick={() => setCount(count + 1)}>
//         Нажми на меня
//       </button>
//     </div>
//   );
// }